// pages/api/contact-resend.ts (alternative)
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, preferredLanguage, opportunityType } = req.body;

    // Send email to yourself
    await resend.emails.send({
      from: 'Portfolio <noreply@badrribzat.dev>',
      to: 'badrribzat@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `...your HTML template...`,
      reply_to: email,
    });

    // Send auto-reply
    await resend.emails.send({
      from: 'Badr Ribzat <noreply@badrribzat.dev>',
      to: email,
      subject: 'Thank you for reaching out!',
      html: `...auto-reply template...`,
    });

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
