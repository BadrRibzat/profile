import { NextApiRequest, NextApiResponse } from 'next';

// Mock PDF generation - In a real implementation, you would use libraries like:
// - puppeteer for HTML to PDF conversion
// - @react-pdf/renderer for React-based PDF generation
// - jsPDF for client-side PDF generation

const resumeData = {
  en: {
    name: 'Badr Ribzat',
    title: 'International Software Developer',
    email: 'badr.ribzat@example.com',
    phone: '+1 (555) 123-4567',
    location: 'International',
    summary: 'Professional developer with international experience, specializing in creating innovative solutions for global markets.',
    experience: [
      {
        company: 'International Tech Solutions',
        position: 'Senior Full Stack Developer',
        duration: '2022 - Present',
        description: 'Leading development of international applications with multi-language support and global deployment.'
      },
      {
        company: 'Global Software Inc.',
        position: 'Frontend Developer',
        duration: '2020 - 2022',
        description: 'Developed responsive web applications for diverse international markets with focus on localization.'
      }
    ],
    education: [
      {
        institution: 'International University of Technology',
        degree: 'Master of Science in Computer Science',
        year: '2019'
      }
    ],
    skills: ['JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'Python']
  },
  es: {
    name: 'Badr Ribzat',
    title: 'Desarrollador de Software Internacional',
    email: 'badr.ribzat@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Internacional',
    summary: 'Desarrollador profesional con experiencia internacional, especializado en crear soluciones innovadoras para mercados globales.',
    experience: [
      {
        company: 'Soluciones Tecnológicas Internacionales',
        position: 'Desarrollador Full Stack Senior',
        duration: '2022 - Presente',
        description: 'Liderando el desarrollo de aplicaciones internacionales con soporte multiidioma y despliegue global.'
      }
    ],
    education: [
      {
        institution: 'Universidad Internacional de Tecnología',
        degree: 'Maestría en Ciencias de la Computación',
        year: '2019'
      }
    ],
    skills: ['JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'Python']
  }
  // Add more languages as needed
};

const generateHTMLTemplate = (data: any, template: string, language: string) => {
  const isRTL = language === 'ar';
  
  return `
    <!DOCTYPE html>
    <html dir="${isRTL ? 'rtl' : 'ltr'}" lang="${language}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.name} - Resume</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 20px;
          ${isRTL ? 'direction: rtl; text-align: right;' : ''}
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #3b82f6;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          font-size: 2.5em;
          margin: 0;
          color: #1f2937;
        }
        .header p {
          font-size: 1.2em;
          color: #6b7280;
          margin: 5px 0;
        }
        .section {
          margin-bottom: 30px;
        }
        .section h2 {
          color: #3b82f6;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 5px;
        }
        .experience-item, .education-item {
          margin-bottom: 20px;
          padding-left: ${isRTL ? '0' : '20px'};
          padding-right: ${isRTL ? '20px' : '0'};
          border-left: ${isRTL ? 'none' : '3px solid #e5e7eb'};
          border-right: ${isRTL ? '3px solid #e5e7eb' : 'none'};
        }
        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .skill-tag {
          background: #eff6ff;
          color: #1d4ed8;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.9em;
        }
        @media print {
          body { margin: 0; padding: 15px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${data.name}</h1>
        <p>${data.title}</p>
        <p>${data.email} | ${data.phone} | ${data.location}</p>
      </div>

      <div class="section">
        <h2>Professional Summary</h2>
        <p>${data.summary}</p>
      </div>

      <div class="section">
        <h2>Experience</h2>
        ${data.experience.map((exp: any) => `
          <div class="experience-item">
            <h3>${exp.position}</h3>
            <p><strong>${exp.company}</strong> | ${exp.duration}</p>
            <p>${exp.description}</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>Education</h2>
        ${data.education.map((edu: any) => `
          <div class="education-item">
            <h3>${edu.degree}</h3>
            <p><strong>${edu.institution}</strong> | ${edu.year}</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>Skills</h2>
        <div class="skills">
          ${data.skills.map((skill: string) => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
      </div>
    </body>
    </html>
  `;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { template, language } = req.body;

  try {
    // Get data for the specified language, fallback to English
    const data = resumeData[language as keyof typeof resumeData] || resumeData.en;
    
    // Generate HTML template
    const htmlContent = generateHTMLTemplate(data, template, language);

    // In a real implementation, you would convert HTML to PDF here
    // For now, we'll return the HTML content as a simple PDF simulation
    const pdfBuffer = Buffer.from(htmlContent, 'utf-8');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="resume_${template}_${language}.pdf"`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Error generating PDF' });
  }
}