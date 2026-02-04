# GharSetu - Luxury Real Estate Website

A premium, award-winning luxury real estate website featuring cinematic animations, smooth scrolling, and immersive user experience. Built with modern web technologies and best practices.

![GharSetu](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070)

## Features

### Premium UI/UX
- **Lenis Smooth Scrolling** - Buttery smooth scroll experience
- **GSAP Animations** - Advanced scroll-triggered parallax and reveal animations
- **Framer Motion** - Fluid UI transitions and micro-interactions
- **Glassmorphism UI** - Modern glass-effect navigation and cards

### Interactive Components
- **Hero Section** - Fullscreen video background with animated text reveals
- **Property Grid** - Parallax-enabled property cards with hover effects
- **Swiper Gallery** - 3D coverflow gallery with autoplay
- **Location Explorer** - Beautiful CSS/SVG map with animated property markers
- **Three.js 3D Viewer** - Interactive 3D house model visualization
- **Team Section** - Agent profiles with Lottie-ready animations
- **Testimonials Slider** - Fade-effect testimonial carousel
- **Contact Form** - Animated form with validation-ready structure

### Technical Stack

**Framework & Core:**
- Next.js 14 (App Router)
- TypeScript
- React 18

**Styling:**
- Tailwind CSS
- Custom CSS with luxury color palette
- Responsive design (mobile-first)

**Animation Libraries:**
- @studio-freight/lenis - Smooth scrolling
- GSAP + ScrollTrigger - Scroll animations
- Framer Motion - UI animations
- Swiper.js - Touch sliders

**3D & Visualization:**
- Three.js + React Three Fiber - 3D graphics
- @react-three/drei - 3D helpers
- Custom SVG animations - Decorative maps

**Additional:**
- @lottiefiles/react-lottie-player - Lottie animations
- clsx + tailwind-merge - Utility classes

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone or download the project:**

```bash
cd GharSetu
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
GharSetu/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with fonts
│   │   ├── page.tsx             # Main homepage
│   │   └── globals.css          # Global styles & Tailwind
│   ├── components/
│   │   ├── Navigation.tsx       # Sticky glassmorphism navbar
│   │   ├── Hero.tsx             # Video hero section
│   │   ├── FeaturedProperties.tsx  # Property grid
│   │   ├── PropertyGallery.tsx  # Swiper gallery
│   │   ├── MapExplorer.tsx      # Decorative map explorer
│   │   ├── House3DViewer.tsx    # Three.js 3D viewer
│   │   ├── TeamSection.tsx      # Team members
│   │   ├── Testimonials.tsx     # Client testimonials
│   │   ├── ContactForm.tsx      # Contact form
│   │   └── Footer.tsx           # Site footer
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx  # Lenis setup
│   └── lib/
│       └── utils.ts             # Utility functions
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript config
├── next.config.js               # Next.js config
└── package.json                 # Dependencies

```

## Key Animation Triggers

### GSAP ScrollTrigger Animations

Animations are triggered at specific scroll positions:

- **Hero Section** ([Hero.tsx:33-54](src/components/Hero.tsx#L33-L54))
  - Video parallax and scale on scroll
  - Overlay fade on scroll

- **Featured Properties** ([FeaturedProperties.tsx:73-103](src/components/FeaturedProperties.tsx#L73-L103))
  - Title reveal from bottom
  - Card stagger animations
  - Image parallax on scroll

### Framer Motion Animations

- **Navigation** ([Navigation.tsx:48-52](src/components/Navigation.tsx#L48-L52))
  - Nav items fade in with stagger
  - Mobile menu slide in

- **Property Cards** ([FeaturedProperties.tsx:180-186](src/components/FeaturedProperties.tsx#L180-L186))
  - Hover scale effects
  - Entrance animations

## Customization

### Colors

Edit the luxury color palette in [tailwind.config.ts](tailwind.config.ts#L11-L22):

```typescript
colors: {
  luxury: {
    gold: '#C9A962',        // Primary gold
    'gold-light': '#E5D4A1', // Light gold
    charcoal: '#1A1A1A',    // Dark background
    'off-white': '#F5F5F3', // Text color
  },
}
```

### Typography

Fonts are configured in [src/app/layout.tsx](src/app/layout.tsx#L8-L20):

```typescript
const inter = Inter({ ... })          // Body text
const playfair = Playfair_Display({ ... })  // Display headings
```

### Properties Data

Update property listings in component files:
- [FeaturedProperties.tsx](src/components/FeaturedProperties.tsx#L22-L72)
- [MapExplorer.tsx](src/components/MapExplorer.tsx#L23-L55)

### Lenis Smooth Scroll Settings

Adjust smoothness in [SmoothScrollProvider.tsx](src/providers/SmoothScrollProvider.tsx#L19-L28):

```typescript
const lenis = new Lenis({
  duration: 1.2,           // Scroll duration
  easing: (t) => ...,      // Easing function
  smoothWheel: true,
  wheelMultiplier: 1,
})
```

## Performance Optimization

### Images
- All images use Next.js `<Image>` component for automatic optimization
- Lazy loading enabled by default
- WebP format with fallbacks

### Code Splitting
- Dynamic imports for heavy components
- React Suspense boundaries for 3D components

### Animation Performance
- CSS transforms for smooth 60fps animations
- `will-change` properties where needed
- Reduced motion media query support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note:** Some features like 3D viewer require WebGL support.

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Other Platforms

```bash
npm run build
npm start
```

The build output will be in `.next` directory.

## Environment Variables

Optional environment variables (none required for basic functionality):

```env
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## Troubleshooting

### Smooth scroll not working
- Check if Lenis is properly initialized
- Verify no CSS `overflow: hidden` conflicts
- Test on different browsers

### 3D viewer performance
- Reduce polygon count in 3D models
- Enable hardware acceleration in browser
- Test on devices with WebGL support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Credits

**Design Inspiration:**
- Awwwards winning real estate websites
- Luxury brand websites

**Libraries:**
- [Lenis](https://github.com/studio-freight/lenis) - Smooth scrolling
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Framer Motion](https://www.framer.com/motion/) - React animations
- [Swiper](https://swiperjs.com/) - Touch slider
- [Three.js](https://threejs.org/) - 3D library

**Images:**
- [Unsplash](https://unsplash.com/) - Stock photos

## Contact

For questions or support, reach out at: info@gharsetu.com

---

**Built with by GharSetu Team**

Enjoy building your luxury real estate platform!
