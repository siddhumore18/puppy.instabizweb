# TeddyPups U.A.E. — Storybook Web Application

A React + Vite + Tailwind CSS v4 implementation of the **TeddyPups U.A.E.** website (`https://puppy.instabizweb.com/`), featuring custom SVG mascot animations, scroll-driven storytelling sections, interactive puppy galleries, and multi-page navigation.

## Tech Stack

- **React 19** + **React Router v7** (`react-router-dom`)
- **Vite 6** (`@vitejs/plugin-react`)
- **Tailwind CSS v4** (`@tailwindcss/vite` + `@theme` custom design tokens)
- **Custom Fonts**: `Fraunces` (display), `Figtree` (body/UI), `Shantell Sans` (handwritten accents)

## Features & Animations

- **Scroll-Driven Mascot (`PupDirector` & `PupBuddy`)**: Animated SVG puppy mascot (`Teddy`) that walks smoothly between section waypoints (`[data-pup-stop]`), flips direction with scroll, drops fading pawprints, and rests snugly inside the woven basket in the footer.
- **Cursor Paw Footprint Trail (`CursorPawTrail`)**: Custom paw cursors (`paw.svg` / `paw-press.svg`) paired with a `<canvas>` overlay that leaves fading pawprints along the mouse cursor path and on click.
- **Hero Lineup Shuffle (`HeroSection`)**: 6 arched puppy seats above a scalloped stitched-quilt border that periodically duck, shuffle through the available puppy pool, pop back up, and display floating handwritten name tags.
- **Meet the Pups (`MeetThePupsSection`)**: Pinned horizontal scrolling wooden floor shelf (`1:1` GPU `translate3d` sync) with 15 arched wooden doors that swing open (`rotateY`) on scroll and hover, plus Teddy running along the floor line like a scrollbar.
- **Two Ways & Puppy Journey**: Animated Korea-to-Dubai flight arc with a puppy porthole (`TwoWaysSection`), interactive WhatsApp phone conversation with typing indicator & inline `.mp4` video (`JourneySection`), and stamped Puppy Passport book (`PassportSection`).
- **Multi-Page Routes**:
  - `/` — Full storybook homepage
  - `/puppies` — Available puppies catalog with origin & breed filters + Gone Home strip
  - `/puppies/:slug` — Storybook puppy detail page with photo/video gallery, fullscreen lightbox, collar tag card, checklist, and enquiry form
  - `/happy-families` — 64-photo Polaroid memory wall with interactive lightbox viewer
  - `/how-it-works` — Interactive `In Dubai` / `Imported` journey switcher, puppy promise, and delivery details
  - `/faq` — Sunset corkboard FAQ with live search and pinned sticky-note accordions
  - `/contact` — Downtown Dubai showroom info and postcard contact form
  - `/gone-home` — Rehomed puppies gallery

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```text
├── public/                 # Local fonts (.woff2), cursors (.svg), brand logo, puppy photos & videos
├── src/
│   ├── components/
│   │   ├── home/           # 8 homepage story sections
│   │   ├── CursorPawTrail.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── MobileBottomBar.jsx
│   │   ├── PawIcon.jsx
│   │   ├── PhotoLightbox.jsx
│   │   ├── PupBuddy.jsx
│   │   └── PupDirector.jsx
│   ├── data/               # Structured puppies, happy families photos, and FAQs data
│   ├── pages/              # Route pages (/puppies, /puppies/:slug, /happy-families, /how-it-works, /faq, /contact, /gone-home)
│   ├── styles/             # Font declarations & storybook animations
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
