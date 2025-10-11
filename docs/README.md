# Lunexweb - Premium Web Development Services

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lunexweb/lunexweb)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> Professional website for **Lunexweb** - Premium web development services for law firms, consulting agencies, and luxury brands in South Africa and internationally.

## 🚀 Live Demo

[**View Live Site**](https://lunexweb.vercel.app) | [**Portfolio**](https://lunexweb.vercel.app/portfolio) | [**Services**](https://lunexweb.vercel.app/services)

## ✨ Features

- 🎨 **Modern Architecture**: React 18 + TypeScript + Vite for lightning-fast development
- 📱 **Fully Responsive**: Mobile-first design with Tailwind CSS
- 🗄️ **Real-time Database**: Supabase integration for dynamic content
- 📊 **Analytics Dashboard**: Comprehensive business intelligence and lead tracking
- 📝 **CMS System**: Built-in blog and portfolio management
- 🏢 **Location Targeting**: SEO-optimized pages for South African cities
- 📈 **Project Management**: Client project tracking and revenue analytics
- 🔒 **Secure**: Protected dashboard with authentication
- ⚡ **Performance**: Optimized for speed with lazy loading and code splitting
- 🎯 **SEO Ready**: Meta tags, structured data, and sitemap generation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe development for better maintainability
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives

### Backend & Database
- **Supabase** - Open source Firebase alternative
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Secure data access policies

### Deployment & Tools
- **Vercel** - Serverless deployment platform
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Install with nvm](https://github.com/nvm-sh/nvm))
- npm or yarn
- Supabase account (for database)

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
│   └── ...             # Feature-specific components
├── pages/              # Route components
│   └── locations/      # City-specific landing pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and services
├── data/               # Static data and configurations
└── assets/             # Images and static assets

database/               # Database schemas and migrations
docs/                   # Documentation
public/                 # Static public assets
```

## 🗄️ Database Setup

1. Create a new Supabase project
2. Run the setup scripts in the `database/` directory
3. Configure Row Level Security policies
4. Set up environment variables

```bash
# Run database setup
npm run setup:db
```

## 📊 Analytics & Tracking

The application includes comprehensive analytics:
- **Google Analytics 4** integration
- **Custom event tracking** for user interactions
- **Lead scoring** and conversion tracking
- **Revenue analytics** and reporting

## 🎨 Customization

### Styling
- Modify `tailwind.config.ts` for design tokens
- Update `src/index.css` for global styles
- Component styles use Tailwind utility classes

### Content
- Edit `src/data/locations.ts` for location data
- Update email templates in `email-templates/`
- Modify SEO data in individual page components

## 🚀 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lunexweb/lunexweb)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
# Deploy the 'dist' folder to your hosting provider
```

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for Google's ranking factors
- **Bundle Size**: Optimized with tree shaking and code splitting
- **Image Optimization**: WebP format with lazy loading

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run setup:db     # Setup database
```

### Code Quality
- **ESLint** configuration for consistent code style
- **TypeScript** for type safety
- **Prettier** for code formatting (recommended)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About Lunexweb

**Lunexweb** specializes in premium web development services for:

- **Law Firms** - Professional websites with case management integration
- **Consulting Agencies** - Business-focused designs with lead generation
- **Luxury Brands** - High-end e-commerce and brand experiences
- **Professional Services** - Custom solutions for South African businesses

### Services
- 🎨 Custom Web Design & Development
- 📱 Mobile-First Responsive Design
- 🔍 SEO Optimization & Digital Marketing
- 🗄️ Database Design & Integration
- 📊 Analytics & Business Intelligence
- 🚀 Performance Optimization

## 📞 Contact

- **Website**: [lunexweb.com](https://lunexweb.com)
- **Email**: info@lunexweb.com
- **Phone**: +27 78 999 2503
- **GitHub**: [@lunexweb](https://github.com/lunexweb)

---

<div align="center">
  <strong>Built with ❤️ in South Africa</strong>
  <br>
  <em>Premium web development services for professionals</em>
</div>