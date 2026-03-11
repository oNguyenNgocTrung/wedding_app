# Trung & Bich - Wedding App

A wedding invitation website for Trung & Bich (April 09, 2018). Built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## Features

- Hero section with parallax scrolling
- Countdown timer to the wedding date
- About the couple section
- Event schedule with Google Maps links
- RSVP form with API endpoint
- Filterable photo gallery with lightbox
- Background music player (SoundCloud)
- Fully responsive design
- Vietnamese language

## Getting Started

### Prerequisites

- Node.js 18.17+

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option 1: One-Click Deploy

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Done. Your site is live.

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 3: GitHub Integration (Auto-Deploy)

1. Connect your GitHub repo at [vercel.com/new](https://vercel.com/new)
2. Every push to `master` auto-deploys to production
3. Pull requests get preview deployments automatically

### Build Settings (auto-detected)

| Setting | Value |
|---|---|
| Framework | Next.js |
| Build Command | `next build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

No environment variables are required for the static site. The RSVP API route (`/api/rsvp`) runs as a serverless function on Vercel automatically.

## Project Structure

```
app/
├── layout.tsx          # Root layout with fonts
├── page.tsx            # Home page composing all sections
├── globals.css         # Tailwind + custom styles
└── api/rsvp/route.ts   # RSVP form API endpoint
components/
├── Header.tsx          # Sticky navigation
├── HeroSlider.tsx      # Full-screen hero with parallax
├── CoupleIntro.tsx     # Couple photos + countdown
├── CountdownTimer.tsx  # Live countdown component
├── AboutUs.tsx         # About each person
├── WhenWhere.tsx       # 4 event cards with maps
├── RsvpForm.tsx        # RSVP form with toast feedback
├── Gallery.tsx         # Filterable photo grid + lightbox
├── ThankYou.tsx        # Thank you parallax section
├── MusicPlayer.tsx     # SoundCloud background music
└── ScrollToTop.tsx     # Scroll-to-top button
public/images/          # Wedding photos & gallery
```
