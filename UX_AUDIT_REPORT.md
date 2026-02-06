# GharSetu - Comprehensive UX Audit Report
**Date:** February 5, 2026
**Auditor:** Claude Sonnet 4.5
**Scope:** Daily user experience issues

---

## ✅ FIXED (Deployed)

1. **ContactForm missing email/phone fields** - CRITICAL BUG - How would you contact users back? ✓ FIXED

---

## 🔴 CRITICAL - Must Fix Before Real Launch

### Navigation & Routing
2. **Navigation links broken on separate pages** - Nav uses `#team`, `#contact` etc. Only works on homepage. Clicking nav on `/catalogue` page tries to go to `/catalogue#team` (doesn't exist)
3. **No navigation bar on `/catalogue`, `/consultation`, `/properties`** - Only have back button, can't navigate to other sections
4. **Logo doesn't navigate home from separate pages** - Uses `#home` hash, won't work from other pages
5. **Footer links same issue** - `#team` won't work from separate pages

### Data & Contact
6. **Fake phone number in footer** - "+91 12345 67890" - obvious placeholder
7. **Fake team emails** - arjun@gharsetu.com, naina@gharsetu.com probably don't exist
8. **Properties "View Details" link goes nowhere** - Links to `/?property={id}` but no handler exists

---

## 🟠 HIGH PRIORITY - User Frustration

### Forms
9. **Consultation date/time is textarea** - Says "Preferred Date & Time" but is free text field, should be date picker
10. **ContactForm investment range not required** - Can submit without selecting, breaks sorting/filtering
11. **Form redirects with window.location.href** - Should use Next.js router.push() for SPA behavior

### Interactions
12. **PropertyGallery autoplay can't be paused** - Autoplays every 5s with no pause button, annoying when reading
13. **No cursor:pointer on clickable cards** - Property cards, team cards clickable but cursor doesn't change
14. **Map markers no cursor indication** - Says "Click on markers" but cursor doesn't change to pointer
15. **Dropdown click-outside on mobile** - CustomDropdown overlay might have z-index issues

### Content
16. **Testimonials feel fake** - "Family Office Principal, Mumbai" - no actual name/photo
17. **"By appointment only" repeated 8+ times** - Becomes meaningless, loses luxury appeal

---

## 🟡 MEDIUM PRIORITY - Polish & Performance

### Accessibility
18. **No keyboard navigation** - Can't tab through property cards/buttons
19. **No focus states** - Nothing shows keyboard focus
20. **No skip to content link** - Keyboard users can't skip nav
21. **Color contrast too low** - `text-luxury-off-white/30` fails WCAG

### Loading & Performance
22. **No image loading states** - All property images load without skeleton, causes layout shift
23. **No error boundaries on forms** - If API fails, form just breaks
24. **Particle background not optimized** - Might lag on mobile
25. **All images from Unsplash** - Should use licensed/own photos

### UX Patterns
26. **No empty states** - Team/testimonials arrays empty = blank section
27. **No "clear filters" on properties page** - Have to reset each filter manually
28. **No "scroll to top" button** - Long homepage, have to scroll all way up
29. **No WhatsApp button on mobile** - Common for luxury real estate in India

---

## 🟢 LOW PRIORITY - Nice to Have

### Design System
30. **Inconsistent button styles** - Some `rounded-full`, some `rounded-xl`
31. **Inconsistent padding** - Some sections `py-32`, others `py-24`, no clear system
32. **Magic numbers everywhere** - Hardcoded `blur-[120px]`, no design tokens
33. **Swiper !important classes** - `!w-[90%]` bad practice, use proper specificity

### SEO & Metadata
34. **No unique meta descriptions** - All pages same/missing meta
35. **No structured data** - No JSON-LD for rich snippets
36. **Alt text not descriptive** - Just property title, should describe image
37. **No favicon** - Uses default browser icon
38. **Sitemap not linked** - sitemap.xml exists but no link in footer/robots

### Features
39. **No social media links** - LinkedIn/Instagram expected for luxury brand
40. **No print styles** - Will look broken if user tries to print
41. **No 404 custom messaging** - Generic "not found"
42. **No loading.tsx on route transitions** - Blank screen during page loads

---

## Summary

- **Total Issues Found:** 42
- **Critical:** 7 (blocking real users)
- **High:** 11 (causing frustration)
- **Medium:** 12 (polish & professionalism)
- **Low:** 12 (nice to have)

**Priority:** Fix Critical & High (18 issues) before promoting to real users on LinkedIn.

---

## Recommended Fix Order

### Phase 1 (Next 24 hours):
1. Add Navigation to all pages
2. Fix hash link navigation
3. Remove fake contact info
4. Add cursor pointers everywhere
5. Fix Properties "View Details" links

### Phase 2 (This week):
6. Add proper date picker
7. Add autoplay pause button
8. Keyboard navigation + focus states
9. Image loading states
10. Error boundaries

### Phase 3 (Before real promotion):
11-18. Everything else from High priority

---

**Next Steps:** Want me to fix all Critical & High issues now? Or pick specific ones?
