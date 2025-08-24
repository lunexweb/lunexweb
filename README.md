# Lunexweb - Web Development & Digital Marketing

A modern, minimalist website for Lunexweb, a web development and digital marketing agency. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🎨 Design Features

- **Minimalist Black & White Theme**: Clean, elegant design with modern aesthetics
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Page transitions and scroll-based reveals using Framer Motion
- **Performance Optimized**: Fast loading with optimized images and code splitting
- **SEO Friendly**: Semantic HTML, proper meta tags, and structured data

## 🚀 Features

### Pages
- **Home**: Hero section with call-to-action and horizontal scroll showcase
- **Services**: Detailed service offerings with interactive cards
- **About**: Company story, team, and values
- **Contact**: Contact form with validation and contact information

### Components
- **Header**: Responsive navigation with mobile menu
- **Footer**: Contact info and social links
- **Hero**: Animated hero section with CTA
- **HorizontalScroll**: Side-scrolling project showcase
- **ServiceCard**: Interactive service cards with hover effects
- **ContactForm**: Form with Zod validation and API integration

### Technical Features
- **Next.js 14 App Router**: Latest Next.js features and optimizations
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Framer Motion**: Smooth animations and page transitions
- **Lenis**: Smooth scrolling
- **Zod**: Form validation
- **React Hook Form**: Form handling
- **Lucide React**: Beautiful SVG icons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lunexweb.git
   cd lunexweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Project Structure

```
lunexweb/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── services/          # Services page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── robots.txt         # SEO
│   ├── sitemap.xml        # SEO
│   └── manifest.json      # PWA manifest
├── components/            # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HorizontalScroll.tsx
│   ├── ServiceCard.tsx
│   ├── ContactForm.tsx
│   └── SmoothScrollProvider.tsx
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

### Customization

#### Branding
- Update company name, contact information, and social links in components
- Replace placeholder images with your own
- Customize colors in `tailwind.config.js`

#### Content
- Edit page content in respective page files
- Update service offerings in `app/services/page.tsx`
- Modify team information in `app/about/page.tsx`

#### Styling
- Customize design tokens in `tailwind.config.js`
- Modify global styles in `app/globals.css`
- Update component styles as needed

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and deploy
   - Your site will be live at `https://your-project.vercel.app`

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js build command
- **Railway**: Connect your GitHub repository
- **DigitalOcean App Platform**: Deploy with Next.js preset

### Environment Variables

Create a `.env.local` file for local development:

```env
# Add any environment variables here
NEXT_PUBLIC_SITE_URL=https://lunexweb.com
```

## 📱 Performance

The website is optimized for performance with:

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting by Next.js
- **Minification**: Production builds are minified
- **Tree Shaking**: Unused CSS and JavaScript are removed
- **Caching**: Static assets are cached for optimal performance

## 🔧 Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:

- Custom color palette (black & white theme)
- Custom typography scales
- Custom spacing and animations
- Responsive breakpoints

### SEO

SEO is configured with:

- Meta tags for all pages
- Open Graph tags for social sharing
- Twitter Card support
- Structured data (JSON-LD)
- Sitemap and robots.txt

### Accessibility

The website follows accessibility best practices:

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus states for interactive elements
- Reduced motion support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions:

- Email: enquiry@lunexweb.com
- Website: https://lunexweb.com

## 🙏 Acknowledgments

- Modern minimalist design principles
- Icons from [Lucide React](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Smooth scrolling with [Lenis](https://github.com/studio-freight/lenis) 