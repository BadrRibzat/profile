# International Portfolio Profile

A modern, multi-language portfolio platform with document generation capabilities, designed to create professional portfolios that adapt to different cultural and professional standards across multiple countries.

## 🌟 Features

### 🌍 Internationalization
- **7+ Languages Supported**: English, Spanish, French, German, Arabic, Chinese, Japanese
- **Real-time Language Switching**: Instant UI translation with browser language detection
- **Cultural Adaptation**: Content and layouts adapted for different regions

### 📄 Document Generation
- **Multiple Formats**: PDF, Word, and HTML export
- **5 Professional Templates**: Modern, Classic, Minimalist, Academic, Creative
- **Country-Specific Standards**: Adapted to local professional documentation requirements

### 🎨 Modern Design
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Professional UI**: Clean, modern interface with smooth animations
- **Accessibility**: Built with web accessibility standards in mind

### 🛠️ Technical Features
- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **PDF Generation**: Client-side PDF creation with jsPDF
- **Document Export**: HTML and DOC format support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BadrRibzat/profile.git
cd profile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 🌐 Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Complete |
| Spanish | `es` | ✅ Complete |
| French | `fr` | ✅ Complete |
| German | `de` | ✅ Complete |
| Arabic | `ar` | ✅ Complete |
| Chinese | `zh` | ✅ Complete |
| Japanese | `ja` | ✅ Complete |

## 📋 Document Templates

### Available Templates
- **Modern**: Contemporary design with clean lines
- **Classic**: Traditional professional layout
- **Minimalist**: Simple, focused design
- **Academic**: Scholarly format for academic positions
- **Creative**: Artistic layout for creative industries

### Supported Formats
- **PDF**: High-quality, print-ready documents
- **DOC**: Microsoft Word compatible format
- **HTML**: Web-optimized portfolio pages

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Navigation.tsx     # Navigation with language switcher
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── Experience.tsx    # Experience section
│   ├── Education.tsx     # Education section
│   ├── Skills.tsx        # Skills section
│   ├── Projects.tsx      # Projects section
│   ├── DownloadSection.tsx # Document generation
│   └── Contact.tsx       # Contact form
├── i18n/                 # Internationalization
│   ├── i18n.ts           # i18n configuration
│   └── locales/          # Translation files
│       ├── en.json       # English translations
│       ├── es.json       # Spanish translations
│       ├── fr.json       # French translations
│       ├── de.json       # German translations
│       ├── ar.json       # Arabic translations
│       ├── zh.json       # Chinese translations
│       └── ja.json       # Japanese translations
└── lib/                  # Utility functions
```

## 🎯 Usage

### Changing Languages
Click the language selector in the navigation bar to switch between supported languages. The interface will update instantly.

### Generating Documents
1. Navigate to the "Download" section
2. Choose your preferred format (PDF, DOC, HTML)
3. Select the target language
4. Pick a template style
5. Click "Generate Document"

### Customizing Content
Edit the translation files in `src/i18n/locales/` to customize the portfolio content for each language.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **react-i18next** for internationalization support
- **jsPDF** for client-side PDF generation

## 📞 Contact

**Badr Ribzat**
- Email: contact@badrribzat.com
- LinkedIn: [linkedin.com/in/badrribzat](https://linkedin.com/in/badrribzat)
- Portfolio: [International Portfolio Profile](http://localhost:3000)

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.