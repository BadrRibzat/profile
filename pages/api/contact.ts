// pages/api/contact.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { TransactionalEmailsApi, SendSmtpEmail } from 'sib-api-v3-sdk';

// Initialize Brevo client
const defaultClient = require('sib-api-v3-sdk').ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalEmailsApi = new TransactionalEmailsApi();

// Simple rate limiting implementation
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  
  const requests = rateLimitMap.get(ip).filter((timestamp: number) => timestamp > windowStart);
  requests.push(now);
  rateLimitMap.set(ip, requests);
  
  return requests.length <= RATE_LIMIT_MAX_REQUESTS;
};

const getClientIP = (req: NextApiRequest): string => {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    (req.headers['x-real-ip'] as string) ||
    req.socket.remoteAddress ||
    'unknown'
  );
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Apply rate limiting
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ 
      message: 'Too many contact form submissions. Please try again in 15 minutes.' 
    });
  }

  try {
    const { name, email, subject, message, preferredLanguage, opportunityType } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, email, subject, message' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate message length
    if (message.length < 10) {
      return res.status(400).json({ message: 'Message must be at least 10 characters long' });
    }

    if (message.length > 2000) {
      return res.status(400).json({ message: 'Message must be less than 2000 characters' });
    }

    // Create email content for notification to you
    const sendSmtpEmail = new SendSmtpEmail({
      sender: {
        name: 'Portfolio Contact Form',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@badrribzat.dev',
      },
      to: [{
        name: 'Badr Ribzat',
        email: process.env.BREVO_RECEIVER_EMAIL || 'badrribzat@gmail.com',
      }],
      subject: `Portfolio Contact: ${subject}`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #667eea; }
                .message { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Contact Form Submission</h1>
                    <p>From your portfolio website</p>
                </div>
                <div class="content">
                    <div class="field">
                        <span class="label">Name:</span> ${name}
                    </div>
                    <div class="field">
                        <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                    </div>
                    <div class="field">
                        <span class="label">Subject:</span> ${subject}
                    </div>
                    ${opportunityType ? `<div class="field"><span class="label">Opportunity Type:</span> ${opportunityType}</div>` : ''}
                    <div class="field">
                        <span class="label">Preferred Language:</span> ${preferredLanguage}
                    </div>
                    <div class="field">
                        <span class="label">Message:</span>
                        <div class="message">${message.replace(/\n/g, '<br>')}</div>
                    </div>
                    <div class="field">
                        <span class="label">Received:</span> ${new Date().toLocaleString()}
                    </div>
                    <div class="field">
                        <span class="label">IP Address:</span> ${clientIP}
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
      textContent: `
        New Contact Form Submission
        ===========================
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        ${opportunityType ? `Opportunity Type: ${opportunityType}` : ''}
        Preferred Language: ${preferredLanguage}
        IP Address: ${clientIP}
        
        Message:
        ${message}
        
        Received: ${new Date().toLocaleString()}
      `,
      replyTo: {
        email: email,
        name: name,
      },
    });

    // Send notification email to you
    const result = await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);

    // Send auto-reply to the visitor
    const autoReplyEmail = new SendSmtpEmail({
      sender: {
        name: 'Badr Ribzat',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@badrribzat.dev',
      },
      to: [{
        name: name,
        email: email,
      }],
      subject: 'Thank you for reaching out!',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
                .signature { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Thank You for Contacting Me!</h1>
                </div>
                <div class="content">
                    <p>Hello ${name},</p>
                    
                    <p>Thank you for reaching out through my portfolio website. I have received your message and will get back to you within 24-48 hours.</p>
                    
                    <p><strong>Here's a summary of your inquiry:</strong></p>
                    <ul>
                        <li><strong>Subject:</strong> ${subject}</li>
                        ${opportunityType ? `<li><strong>Opportunity Type:</strong> ${opportunityType}</li>` : ''}
                        <li><strong>Preferred Language:</strong> ${preferredLanguage}</li>
                    </ul>
                    
                    <p>In the meantime, feel free to:</p>
                    <ul>
                        <li>Check out my <a href="https://badrribzat.dev/projects">projects portfolio</a></li>
                        <li>Download my <a href="https://badrribzat.dev/resume/en">latest resume</a></li>
                        <li>Explore my <a href="https://badrribzat.dev/skills">technical skills</a></li>
                    </ul>
                    
                    <div class="signature">
                        <p>Best regards,<br>
                        <strong>Badr Ribzat</strong><br>
                        Full-Stack Software Engineer</p>
                        
                        <p>
                            📧 badrribzat@gmail.com<br>
                            📱 +212 627-764176<br>
                            🌐 <a href="https://badrribzat.dev">badrribzat.dev</a>
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
    });

    // Send auto-reply (don't block on errors for this)
    try {
      await transactionalEmailsApi.sendTransacEmail(autoReplyEmail);
    } catch (autoReplyError) {
      console.error('Auto-reply email failed:', autoReplyError);
      // Continue even if auto-reply fails
    }

    return res.status(200).json({ 
      message: 'Message sent successfully!',
      messageId: result.messageId 
    });

  } catch (error: any) {
    console.error('Contact form error:', error);
    
    // More specific error handling
    if (error?.response?.body) {
      return res.status(500).json({ 
        message: 'Failed to send message. Please try again later.',
        error: 'Email service error'
      });
    }

    return res.status(500).json({ 
      message: 'Internal server error. Please try again later.' 
    });
  }
}
