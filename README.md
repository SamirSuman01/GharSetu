# GharSetu - Luxury Real Estate Advisory Platform

> A premium real estate advisory platform showcasing India's most distinguished residences with Netflix-style UI and immersive experiences.

![GharSetu](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/gharsetu)

## ✨ Features

- **Premium Netflix-Style UI** - Smooth animations with Framer Motion & GSAP
- **Interactive 3D Viewers** - Property visualization with Three.js
- **Advanced Property Search** - Filter by city, type, and price range
- **Secure Forms** - Rate limiting, CSRF protection, input sanitization
- **Responsive Design** - Mobile-first, optimized for all devices
- **Production Ready** - Error boundaries, API routes, database integration

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Fluid animations
- **GSAP** - Advanced scroll effects
- **Three.js** - 3D graphics
- **Swiper.js** - Touch carousels

## 📦 Project Structure

```
src/
├── app/
│   ├── api/contact/       # Form submission API
│   ├── catalogue/         # Private catalogue page
│   ├── consultation/      # Consultation booking
│   ├── properties/        # Property listing
│   └── layout.tsx
├── components/
│   ├── Hero.tsx
│   ├── FeaturedProperties.tsx
│   ├── PropertyGallery.tsx
│   ├── Navigation.tsx
│   ├── ErrorBoundary.tsx
│   └── Providers.tsx
├── lib/
│   ├── properties.ts      # Property data
│   └── csrf.ts            # Security utilities
└── providers/
    └── SmoothScrollProvider.tsx
```

## 🔒 Security

- ✅ Rate limiting (5 requests/minute)
- ✅ Input sanitization (XSS protection)
- ✅ CSRF token protection
- ✅ Error boundaries
- ✅ Secure form validation

## 🌐 Environment Variables

Copy `.env.example` to `.env.local`:

```env
# Optional - Database (Supabase)
SUPABASE_URL=your-url
SUPABASE_ANON_KEY=your-key

# Optional - Email notifications
EMAIL_SERVICE_API_KEY=your-api-key

# Optional - Admin access
ADMIN_API_KEY=your-secure-key
```

**Note:** App works without environment variables in demo mode.

## 📡 API Routes

### `POST /api/contact`

Submit inquiries, catalogue requests, or consultation bookings.

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "formType": "catalogue"
}
```

### `GET /api/contact`

Retrieve submissions (requires `x-api-key` header).

## 🎨 Customization

### Colors
Edit `tailwind.config.ts`:
```js
colors: {
  luxury: {
    gold: '#C9A962',
    charcoal: '#1A1A1A',
  }
}
```

### Properties
Update data in `src/lib/properties.ts`

## 🚢 Deployment

### Vercel (One-Click)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment
```bash
npm run build
# Deploy .next folder to your hosting
```

## 📱 Pages

- `/` - Homepage with all sections
- `/properties` - Property listing with filters
- `/catalogue` - Request private catalogue
- `/consultation` - Book consultation
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## 🎯 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- All images optimized via Next.js

## 📄 License

All rights reserved © 2025 GharSetu

## 🙏 Credits

Built with modern web technologies and premium design principles.

**Images:** [Unsplash](https://unsplash.com)

---

**Demo Note:** This is a portfolio project. Forms submit successfully but data is stored in memory by default. Configure environment variables for production database integration.

