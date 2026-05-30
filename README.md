# Tab Time Tracker — Marketing Website

A full Next.js 14 marketing site for the Tab Time Tracker Chrome extension. Built with:

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (scroll animations)
- **Google AdSense** (4 ad slots, fully configured)

## Sections

1. **Hero** — animated mock popup, floating badges, parallax mouse effect
2. **Features** — 8 feature cards with hover lift and glow effects
3. **How It Works** — 4-step interactive stepper with animated progress ring
4. **Stats** — animated count-up numbers, heatmap demo, productivity bars
5. **Testimonials** — dual auto-scrolling marquee rows
6. **FAQ** — accordion with smooth open/close animation
7. **Install CTA** — final conversion section with trust badges

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## AdSense Setup

1. Get approved at https://adsense.google.com
2. Replace `ca-pub-XXXXXXXXXXXXXXXX` in:
   - `app/layout.tsx` (the script src URL)
   - `components/AdSlot.tsx` (data-ad-client)
   - `public/ads.txt`
3. Replace the `slot` prop values in `app/page.tsx` with your actual ad unit IDs
4. AdSense slots are placed:
   - Below hero (horizontal leaderboard)
   - Mid-page after features (rectangle 300×250)
   - Between stats and testimonials (horizontal)
   - Above the install CTA (rectangle)

## AdSense Eligibility Tips

This site is designed to meet AdSense requirements:
- ✅ Original content about a real product
- ✅ Clear navigation and site structure
- ✅ Privacy policy link in footer (add a real /privacy page)
- ✅ robots.txt and ads.txt in /public
- ✅ No copyrighted material
- ✅ Mobile-responsive layout
- ✅ Fast load times (Next.js SSR + minimal JS)

> **Add a /privacy page** before applying — AdSense requires a privacy policy.

## Production Build

```bash
npm run build
npm start
```

## Deployment

Deploy to Vercel (recommended):

```bash
npx vercel
```

Or any platform supporting Node.js.
