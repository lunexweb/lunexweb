# Lunexweb - Premium Web Development Services

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lunexweb/lunexweb)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> Professional website for Lunexweb - Premium web development services for law firms, consulting agencies, and luxury brands in South Africa.

## 🚀 Live Demo
**🌐 [View Live Site](https://lunexweb.vercel.app)** | **💼 [Portfolio](https://lunexweb.vercel.app/portfolio)** | **📝 [Blog](https://lunexweb.vercel.app/blog)**

## ✨ Features

### 🎨 **Modern Frontend**
- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** for responsive, utility-first styling
- **Framer Motion** for smooth animations and transitions
- **Radix UI** components for accessible, high-quality UI elements

### 🗄️ **Backend & Database**
- **Supabase** integration for real-time database and authentication
- **Real-time analytics** tracking and dashboard
- **Project management** system with Kanban boards
- **Blog management** with rich text editing

### 📱 **User Experience**
- **Fully responsive** design for all devices
- **SEO optimized** with meta tags and structured data
- **Fast loading** with Vite build optimization
- **Accessibility** compliant with WCAG guidelines

### 🏢 **Business Features**
- **Location-based landing pages** for South African cities
- **Lead management** system with CRM integration
- **Email automation** with service-specific sequences
- **Analytics dashboard** with real-time metrics

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS |
| **UI Components** | Radix UI, shadcn/ui, Lucide React |
| **Animation** | Framer Motion |
| **Backend** | Supabase, PostgreSQL |
| **Build Tool** | Vite |
| **Deployment** | Vercel |
| **Analytics** | Custom analytics + Google Analytics |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([install with nvm](https://github.com/nvm-sh/nvm))
- npm or yarn
- Supabase account (for backend features)

### Installation

```bash
# Clone the repository
git clone https://github.com/lunexweb/lunexweb.git
cd lunexweb

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

### Environment Variables

Create a `.env.local` file with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── data/               # Static data and constants
└── assets/             # Images and static assets

database/               # Database schemas and migrations
docs/                   # Documentation
email-templates/        # Email automation templates
```

## 🎯 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌍 Location Pages

Our website includes dedicated landing pages for major South African cities:

- **Cape Town** - `/cape-town`
- **Johannesburg** - `/johannesburg`
- **Durban** - `/durban`
- **Pretoria** - `/pretoria`
- **Sandton** - `/sandton`
- And more...

## 📊 Analytics & Monitoring

- **Real-time analytics** dashboard
- **Lead tracking** and conversion metrics
- **Performance monitoring** with Core Web Vitals
- **SEO analytics** with search console integration

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lunexweb/lunexweb)

1. Fork this repository
2. Connect your Vercel account
3. Deploy with one click

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Lunexweb** - Premium Web Development Services
- **Website**: [lunexweb.com](https://lunexweb.com)
- **Email**: info@lunexweb.com
- **Phone**: +27 78 999 2503
- **Location**: South Africa

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Supabase](https://supabase.com/) for backend infrastructure
- [Vercel](https://vercel.com/) for deployment platform
- [Tailwind CSS](https://tailwindcss.com/) for styling framework

---

**⭐ If you found this project helpful, please give it a star!**