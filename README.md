# devganga-amrit-website
Official website of DevGanga Amrit — a premium spiritual heritage brand inspired by Devprayag, Uttarakhand.

## Cinematic redesign notes

- Hero, product stage and sections are built with plain CSS 3D (perspective, layered shadows, parallax) – **no new dependencies**.
- `src/effects.ts` – scroll reveal, pointer parallax, card tilt, active-nav tracking (all `prefers-reduced-motion` aware, fine-pointer only where relevant).
- `src/GoldDust.tsx` – lightweight canvas gold-dust / droplet particles (paused off-screen, throttled on mobile).
- `public/images/` gained optimized copies (`product-bottle*.webp`, `logo-512.png`, `logo-128.png`, `devprayag-aerial.webp`). The original `logo.png`, `product-bottle.png` and poster are untouched.
- Run: `npm install` then `npm run dev` (or `npm run build`).
