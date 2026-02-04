# Quick Setup Guide

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lenis (smooth scroll)
- GSAP (animations)
- Framer Motion
- Swiper
- Three.js
- And more...

### 2. Run Development Server

```bash
npm run dev
```

### 3. Open your browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Project Architecture

```
GharSetu/
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← Root layout, fonts
│   │   ├── page.tsx             ← Main page (assembles all sections)
│   │   └── globals.css          ← Tailwind + custom styles
│   │
│   ├── components/              ← All UI components
│   │   ├── Navigation.tsx       ← Sticky nav with glassmorphism
│   │   ├── Hero.tsx             ← Video background hero
│   │   ├── FeaturedProperties.tsx  ← Property cards with parallax
│   │   ├── PropertyGallery.tsx  ← Swiper 3D gallery
│   │   ├── MapExplorer.tsx      ← Mapbox neighborhood explorer
│   │   ├── House3DViewer.tsx    ← Three.js 3D house
│   │   ├── TeamSection.tsx      ← Agent profiles
│   │   ├── Testimonials.tsx     ← Client reviews slider
│   │   ├── ContactForm.tsx      ← Contact form
│   │   └── Footer.tsx           ← Site footer
│   │
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx  ← Lenis integration
│   │
│   └── lib/
│       └── utils.ts             ← Helper functions
│
├── public/                       ← Static assets (add yours here)
├── tailwind.config.ts            ← Tailwind customization
├── tsconfig.json                 ← TypeScript config
├── next.config.js                ← Next.js config
└── package.json                  ← Dependencies
```

## Key Technologies

### Animation Stack

**Lenis** - Smooth scrolling
- Location: [src/providers/SmoothScrollProvider.tsx](src/providers/SmoothScrollProvider.tsx)
- Configuration: duration, easing, wheel multiplier

**GSAP + ScrollTrigger** - Scroll animations
- Used in: Hero, FeaturedProperties
- Parallax effects, reveal animations

**Framer Motion** - UI transitions
- Used in: All components
- Hover effects, entrance animations

**Swiper** - Touch sliders
- Used in: PropertyGallery, Testimonials
- Coverflow effect, autoplay

### Rendering & Interactivity

**Three.js + R3F** - 3D graphics
- Location: [src/components/House3DViewer.tsx](src/components/House3DViewer.tsx)
- Interactive 3D house model

**Decorative Map Visualization** - Location Explorer
- Location: [src/components/MapExplorer.tsx](src/components/MapExplorer.tsx)
- Pure CSS/SVG decorative map with animated markers
- No API keys required

## Customization Guide

### Change Colors

Edit [tailwind.config.ts](tailwind.config.ts):

```typescript
colors: {
  luxury: {
    gold: '#C9A962',           // Your brand color
    'gold-light': '#E5D4A1',
    charcoal: '#1A1A1A',       // Dark background
    'off-white': '#F5F5F3',    // Text color
  },
}
```

### Update Property Data

Edit property arrays in:
1. [src/components/FeaturedProperties.tsx](src/components/FeaturedProperties.tsx) - Lines 22-72
2. [src/components/MapExplorer.tsx](src/components/MapExplorer.tsx) - Lines 23-55

### Adjust Scroll Smoothness

Edit [src/providers/SmoothScrollProvider.tsx](src/providers/SmoothScrollProvider.tsx):

```typescript
const lenis = new Lenis({
  duration: 1.2,        // Lower = faster, Higher = slower
  wheelMultiplier: 1,   // Scroll sensitivity
})
```

### Change Fonts

Edit [src/app/layout.tsx](src/app/layout.tsx):

```typescript
import { YourFont } from 'next/font/google'

const yourFont = YourFont({
  subsets: ['latin'],
  variable: '--font-your-font',
})
```

## Component Overview

### Navigation ([Navigation.tsx](src/components/Navigation.tsx))
- Sticky header with blur effect
- Mobile hamburger menu
- Smooth scroll to sections

### Hero ([Hero.tsx](src/components/Hero.tsx))
- Fullscreen video background
- GSAP parallax on scroll
- Animated text reveals
- Scroll indicator

### Featured Properties ([FeaturedProperties.tsx](src/components/FeaturedProperties.tsx))
- Responsive grid layout
- Parallax image animations
- Hover effects
- Property cards with details

### Property Gallery ([PropertyGallery.tsx](src/components/PropertyGallery.tsx))
- Swiper coverflow effect
- Autoplay slider
- Touch/swipe enabled
- Image info overlays

### Map Explorer ([MapExplorer.tsx](src/components/MapExplorer.tsx))
- Mapbox GL integration
- Custom animated markers
- Property popups
- Dark theme styling

### 3D Viewer ([House3DViewer.tsx](src/components/House3DViewer.tsx))
- Three.js 3D house model
- Orbit controls (rotate, zoom, pan)
- Lighting and shadows
- Responsive canvas

### Team Section ([TeamSection.tsx](src/components/TeamSection.tsx))
- Agent profile cards
- Contact information
- Lottie animation placeholders
- Hover effects

### Testimonials ([Testimonials.tsx](src/components/Testimonials.tsx))
- Swiper fade effect
- Auto-rotating slides
- Star ratings
- Client photos

### Contact Form ([ContactForm.tsx](src/components/ContactForm.tsx))
- Animated form fields
- Property type selector
- Budget range dropdown
- Form validation ready

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to Vercel dashboard.

## Performance Tips

1. **Optimize Images**: Use WebP format, compress before upload
2. **Reduce Animations**: On lower-end devices
3. **Lazy Load**: Components below the fold
4. **Code Splitting**: Dynamic imports for heavy components
5. **Lighthouse**: Run performance audits

## Common Issues

**Animations laggy:**
- Reduce animation duration
- Lower scroll multiplier
- Test on different browsers

**3D viewer not loading:**
- Ensure WebGL is enabled in browser
- Check browser supports Three.js
- Verify no console errors

## Next Steps

1. Add your own property data
2. Replace placeholder images
3. Connect contact form to backend
4. Add Google Analytics
5. Set up SEO metadata
6. Configure domain and hosting

## Support

Questions? Check [README.md](README.md) for detailed documentation.

---

**Happy Building! 🏡**
