# DEVGANGA AMRIT — Liquid Glass Edition

A responsive React + TypeScript + Vite website for DEVGANGA AMRIT, inspired by the sacred confluence at Devprayag, Uttarakhand.

## Design direction

This edition follows the approved Liquid Glass mockup: a full-bleed Devprayag hero, centred brand wordmark and message, floating translucent navigation, three glass highlight tiles, deep teal/river-toned sections, and a cinematic product showcase with a layered glass information panel. The Founder Page retains the same dark, glass-forward visual language.

The Liquid Glass treatment is implemented with CSS gradients, translucent materials, backdrop blur, optical edge highlights, shadows, and responsive layout rules. It is an Apple-inspired visual treatment, not Apple's proprietary rendering system.

## Product visual note

The existing bottle artwork is a **concept visual**, not proof of a confirmed commercial product. The site keeps the “NOT FOR DRINKING” disclaimer and does not claim that availability or pricing is confirmed. The repository does not contain a true bottle 3D model (`.glb`/`.gltf`); the product presentation uses the existing artwork with CSS perspective/tilt effects rather than claiming to render a genuine 3D mesh.

## Run locally

```bash
npm ci
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

## Deployment

`vite.config.ts` sets the production base path to `/devganga-amrit-website/`. The Founder Page is available at `/devganga-amrit-website/founder/` on the configured GitHub Pages project path. The existing GitHub Actions workflow builds the site and deploys the generated `dist/` folder to GitHub Pages.

No commit, push, or deployment was performed as part of this local redesign.
