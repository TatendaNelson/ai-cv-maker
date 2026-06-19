# AI CV Maker

 **Create job-winning CVs tailored to any job description** using AI-powered analysis and optimization.

![AI CV Maker](https://img.shields.io/badge/AI%20Powered-CV%20Optimization-blue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)

##  Features

- AI Job Analysis- Paste any job description, and our AI extracts keywords, required skills, seniority level, and industry
- Match Score- Get an instant overall match score plus breakdowns for skills, experience, keywords, and education
- Smart Suggestions - Receive AI-powered optimization suggestions prioritized by importance (High/Medium/Low)
- Multiple Templates - Choose from 4 professional templates: Modern, Classic, Minimal, and Creative
- Live Preview- See your CV update in real-time as you edit
- Export Options- Download as PDF, export as JSON, or copy plain text for ATS systems
- Auto-Tailoring - AI automatically reorders your experience and skills by relevance to the job
- Local Storage - All your data is saved locally in your browser

##  How It Works

1. **Build Your Profile** - Enter your personal info, work experience, education, skills, projects, and certifications
2. **Paste Job Description** - Copy and paste any job posting into the analyzer
3. **AI Optimizes** - The AI extracts requirements, calculates match scores, and suggests improvements
4. **Preview & Export** - Choose a template, preview your CV, and export as PDF

##  Tech Stack

- **React 18** + **TypeScript** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management with local storage persistence
- **html2canvas** + **jsPDF** - PDF generation
- **Lucide React** - Icons
- **Framer Motion** - Animations

##  Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/TatendaNelson/ai-cv-maker.git
cd ai-cv-maker

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

##  Project Structure

```
ai-cv-maker/
├── src/
│   ├── ai/
│   │   └── aiEngine.ts          # AI analysis & optimization engine
│   ├── components/
│   │   ├── Header.tsx           # Navigation header
│   │   ├── ProfileBuilder.tsx   # Profile input forms
│   │   ├── JobAnalyzer.tsx      # Job description analysis UI
│   │   ├── CVPreview.tsx        # Template preview & export
│   │   └── ExportPage.tsx       # Export options page
│   ├── templates/
│   │   ├── TemplateModern.tsx   # Modern sidebar template
│   │   ├── TemplateClassic.tsx  # Traditional ATS template
│   │   ├── TemplateMinimal.tsx  # Clean minimal template
│   │   └── TemplateCreative.tsx # Bold creative template
│   ├── store/
│   │   └── cvStore.ts           # Zustand state management
│   ├── types.ts                 # TypeScript interfaces
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── index.html
├── tailwind.config.js
├── package.json
└── README.md
```

##  AI Engine Features

The built-in AI engine analyzes job descriptions to:

- **Extract 200+ technical skills** from a comprehensive keyword database
- **Identify seniority level** (Entry, Mid, Senior, Executive)
- **Detect industry** (FinTech, Healthcare, SaaS, etc.)
- **Calculate match scores** across 5 dimensions: Overall, Skills, Experience, Keywords, Education
- **Generate actionable suggestions** like:
  - Missing skills to add
  - Summary optimization tips
  - Experience reordering by relevance
  - Keyword highlighting recommendations

##  Templates

| Template | Style | Best For |
|----------|-------|----------|
| **Modern** | Two-column with sidebar | Tech, creative roles |
| **Classic** | Traditional centered | Conservative industries, ATS |
| **Minimal** | Clean with border accents | Design, marketing roles |
| **Creative** | Bold color header | Startups, creative agencies |

##  Privacy

All data is stored **locally in your browser** using localStorage. No data is sent to any server or third-party service. Your CV information stays completely private.

##  Deployment

The app is built as a static site and can be deployed to:

- **GitHub Pages**
- **Vercel**
- **Netlify**
- **Any static hosting**

```bash
npm run build
# Deploy the dist/ folder
```

##  Credits

Built by [Tatenda Nelson Matare](https://github.com/TatendaNelson)

##  License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Get hired faster with AI-optimized CVs! 🚀**
