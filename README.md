# 🚀 SparkResume

**Build Beautiful, Professional CVs in Minutes**

SparkResume is a modern, feature-rich CV builder that lets you create, customize, and download professional resumes with beautiful pre-designed templates. Built with Next.js, Supabase, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-33C3F0?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)

---

## ✨ Features

### 📋 **13 Professional Templates**
- Classic, Modern, Corporate, Two-Column, Minimalist
- Functional, Creative Designer, Executive Summary, Tech-Focused
- Software Engineer, Healthcare, Creative Portfolio, Finance Corporate

### 🎨 **Customization**
- Real-time preview
- Multiple layout options
- Professional color schemes
- Responsive design

### 💾 **Data Management**
- Secure authentication with Supabase
- Save multiple CVs
- Automatic cloud backup
- Access from anywhere

### 📥 **Export Options**
- Download as PDF
- Export as document (coming soon)
- Print-ready formats

### 🔒 **Security**
- Row-Level Security (RLS) on all data
- Encrypted authentication
- Privacy-first approach
- No data tracking

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15.1.0, TypeScript, React 19 |
| **Styling** | TailwindCSS 3, DaisyUI |
| **Backend** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth with JWT |
| **Build Tool** | Turbopack (next dev) |
| **Deployment** | Vercel |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/DAGAOscar/sparkresume.git
cd sparkresume
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. **Setup database**
- Go to [Supabase Dashboard](https://supabase.com/dashboard)
- Open SQL Editor
- Copy contents of `database.sql`
- Execute the query

5. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

---

## 📁 Project Structure

```
sparkresume/
├── app/
│   ├── components/          # React components (forms, templates, etc.)
│   │   ├── A4TemplatePreview.tsx
│   │   ├── CVModels.tsx
│   │   ├── CVPreview.tsx
│   │   ├── EducationForm.tsx
│   │   ├── ExperienceForm.tsx
│   │   ├── LanguageForm.tsx
│   │   ├── PersonalDetailsForm.tsx
│   │   ├── SkillForm.tsx
│   │   ├── TemplateGallery.tsx
│   │   └── TextTemplatePreview.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts       # Authentication hook
│   │   └── useCVs.ts        # CV management hook
│   ├── lib/                 # Utilities and services
│   │   ├── supabase.ts      # Supabase client
│   │   └── cvService.ts     # Database operations
│   ├── (pages)/             # App routes
│   │   ├── page.tsx         # Home page
│   │   ├── signup/          # Sign-up page
│   │   ├── login/           # Login page
│   │   ├── templates/       # CV templates gallery
│   │   ├── builder/         # CV builder
│   │   ├── dashboard/       # User dashboard
│   │   └── settings/        # User settings
│   └── layout.tsx           # Root layout
├── public/                  # Static assets
├── database.sql             # PostgreSQL schema
├── package.json             # Dependencies
├── tailwind.config.ts       # TailwindCSS config
└── tsconfig.json            # TypeScript config
```

---

## 🗄️ Database Schema

### Tables
- **profiles** - User account information (linked to auth.users)
- **cvs** - User's saved CVs (metadata & references)
- **cv_data** - CV content (experiences, education, skills, languages, certifications, etc.)
- **templates_used** - Track which templates users prefer

### Security Features
- **Row-Level Security (RLS)** enabled on all tables
- Users can only access their own data
- Automatic policies enforce user isolation
- Auto-trigger creates profile on signup

### Indexes
Performance optimized with indexes on:
- `cvs.user_id`
- `cv_data.cv_id`
- `templates_used.user_id`
- `templates_used.last_used`

---

## 🔑 Key Components

### Authentication (`useAuth` Hook)
Centralized authentication state management:
```typescript
const { isLoggedIn, user, loading, logout } = useAuth();
```

**Features:**
- JWT session subscription
- Auto-logout on unsubscribe
- Loading state management
- Integrated in all protected pages

### CV Management (`useCVs` Hook)
Manage user's CV collection:
```typescript
const { cvs, loading, error } = useCVs();
const { cvData, saveCVData } = useCVData(cvId);
```

**Features:**
- Fetch user's CVs
- Create/update/delete operations
- Automatic Supabase integration
- Error handling

### Database Service (`cvService.ts`)
Low-level database operations:
- `getUserCVs()` - Fetch all user CVs
- `createCV()` - Create new CV
- `updateCV()` - Update CV metadata
- `deleteCV()` - Delete CV
- `getCVData()` - Fetch CV content
- `saveCVData()` - Save CV data
- `trackTemplateUsage()` - Track template preferences

---

## 🔐 Protected Routes

These routes require user authentication:

| Route | Purpose |
|-------|---------|
| `/templates` | Browse and select templates |
| `/builder` | Edit CV content |
| `/dashboard` | Access saved CVs |
| `/settings` | User preferences |

Unauthenticated users are redirected to `/login`.

---

## 📥 CV Export

### PDF Download
- Click "Download PDF" in builder
- CV is rendered to PDF with proper formatting
- All styles and layouts preserved
- Print-optimized

### Coming Soon
- DOCX export
- Google Docs export
- Plain text export

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub**
```bash
git push origin main
```

2. **Create Vercel account** at https://vercel.com

3. **Create new project**
   - Connect GitHub repository
   - Select `DAGAOscar/sparkresume`

4. **Add environment variables**
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

5. **Deploy**
   - Vercel automatically builds and deploys
   - Your app is live at `https://sparkresume-XXXXX.vercel.app`

### Add Custom Domain
1. Go to Vercel Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Domain is live within minutes

For detailed instructions, see [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md).

---

## 📚 Documentation

- **[Database Setup Guide](SETUP_DATABASE_EMAIL.md)** - Configure database and email
- **[Supabase Instructions](INSTRUCTIONS_SUPABASE.md)** - Detailed Supabase setup
- **[Deployment Guide](DEPLOY_VERCEL.md)** - Deploy to Vercel step-by-step
- **[Templates Guide](TEMPLATES_GUIDE.md)** - CV template documentation

---

## 🛣️ Roadmap

### ✅ Completed
- ✅ Authentication system with Supabase
- ✅ 13 professional CV templates
- ✅ CV data persistence to database
- ✅ Real-time preview
- ✅ PDF export functionality
- ✅ Responsive design
- ✅ Row-Level Security (RLS)
- ✅ Production deployment on Vercel

### 🚧 In Progress
- 🔄 Email verification workflow
- 🔄 Password reset functionality
- 🔄 Template customization UI

### 📋 Planned
- 📌 LinkedIn profile import
- 📌 Resume sharing (public links)
- 📌 Collaboration features
- 📌 Mobile app
- 📌 Export to DOCX/Google Docs
- 📌 Interview tips & guidance
- 📌 Multiple language support
- 📌 Analytics dashboard

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Steps to contribute:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linter
npm run lint
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 💬 Support & Feedback

Have questions? Found a bug? Have a great idea?

- **GitHub Issues** - Report bugs or request features
- **GitHub Discussions** - General questions and ideas
- **Email** - oscar@sparkresume.dev (coming soon)

---

## 📊 Performance

SparkResume is optimized for performance:

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Score | 90+ | ✅ Achieved |
| First Contentful Paint | < 2s | ✅ < 1.5s |
| Largest Contentful Paint | < 3s | ✅ < 2.5s |
| Cumulative Layout Shift | < 0.1 | ✅ < 0.05 |
| Time to Interactive | < 4s | ✅ < 3s |

---

## 🎓 Learning Resources

This project is great for learning:
- **Next.js 15** with App Router
- **TypeScript** for type-safe React
- **Supabase** backend setup & RLS
- **TailwindCSS** for modern styling
- **PDF generation** in React
- **Authentication flows**
- **Database design** with PostgreSQL

---

## 🙏 Credits & Acknowledgments

- **[Next.js](https://nextjs.org/)** - React framework
- **[Supabase](https://supabase.com/)** - Backend & PostgreSQL
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS
- **[DaisyUI](https://daisyui.com/)** - React UI components
- **[React PDF](https://react-pdf.org/)** - PDF generation
- All amazing contributors & community feedback

---

## 📄 Changelog

### Version 1.0.0 - Initial Release
- Authentication system
- 13 professional templates
- CV builder with real-time preview
- PDF export
- Dashboard for managing CVs
- Production deployment on Vercel

---

**Made with ❤️ by Oscar DAGA**

⭐ If you find this project useful, please consider giving it a star!

[Live Demo](https://sparkresume.vercel.app) • [GitHub](https://github.com/DAGAOscar/sparkresume) • [Twitter](https://twitter.com/oscardaga)


