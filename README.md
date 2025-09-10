# Internationalized Portfolio

A modern, multilingual portfolio website with support for 7+ languages and multiple document formats.

## Features

- 🌍 **Internationalization (i18n)**: Support for 7 languages (English, Spanish, French, German, Arabic, Japanese, Portuguese)
- 📄 **Multiple Resume Templates**: 6 different resume/CV formats for various countries and industries
- 🔄 **RTL Support**: Proper right-to-left text rendering for Arabic
- 📱 **Responsive Design**: Mobile-friendly layout using Tailwind CSS
- 🎨 **Modern UI**: Clean, professional design
- 📊 **PDF Generation**: Export resumes in PDF format for each language
- 🎯 **ATS Friendly**: Resume formats optimized for Applicant Tracking Systems

## Supported Languages

- English (EN) - International standard
- Español (ES) - Spanish/Latin American markets
- Français (FR) - French/Francophone markets  
- Deutsch (DE) - German/Austrian/Swiss markets
- العربية (AR) - Middle Eastern markets (RTL support)
- 日本語 (JA) - Japanese market
- Português (PT) - Brazilian/Portuguese markets

## Resume Templates

1. **Modern International** - Clean, modern design for tech companies
2. **Traditional/Conservative** - Classic format for traditional industries
3. **Creative** - Artistic design for creative industries
4. **European CV** - Standard European CV format
5. **American Resume** - US-style resume format
6. **Asian Format** - Format for Asian countries

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-i18next, react-i18next
- **PDF Generation**: Custom API with HTML templates
- **Deployment Ready**: Vercel/Netlify compatible

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Language Switching

The application automatically detects the browser language and supports URL-based language switching:
- English: /
- Spanish: /es  
- French: /fr
- German: /de
- Arabic: /ar
- Japanese: /ja
- Portuguese: /pt

## Screenshot


*The portfolio automatically adapts to different languages with proper formatting and cultural considerations.*
