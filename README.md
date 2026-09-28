# BEC Creative Spectrum — Clubs & Auditions

A static site with no database, no backend and no admin portal.

- **Home**: intro video, hero, Instagram + WhatsApp channel links
- **Clubs**: every club with its banner, logo, short description and a *View Audition Details* button
- **Audition page** (`#/clubs/<club-id>`): dates, the audition process, and an *I'm Ready to Give Audition* button that opens the Google Form

## Edit content
- Links (Google Form, Instagram, WhatsApp): `src/data/links.js`
- Club text / audition details: `src/data/clubs.json`
- Club images: `public/clubs/`

## Run / build
```
npm install
npm run dev      # http://localhost:3000
npm run build    # outputs dist/
```

## Deploy on Vercel
Import the folder. Framework preset: **Vite**, build command `npm run build`, output `dist`.
The site uses hash routes (`#/clubs`), so it needs no rewrite rules.
