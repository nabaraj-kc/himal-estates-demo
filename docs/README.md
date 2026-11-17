# Himal Estates — Nepal's Property & Business Marketplace

> **Tagline:** Nepal's Property & Business Marketplace  
> **Domain:** himalestates.com.np  
> **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion

---

## What Is This?

Himal Estates is a full-featured, **Nepal-first** real-estate and business listing platform. It allows property owners, landlords, business sellers, and tenants to connect through a modern web portal — with WhatsApp-first lead capture, Nepali Rupee pricing, bilingual (English/Nepali) content, and an admin panel for the middleman (agent/broker) to manage leads, track commissions, and close deals.

This repository contains the **demo build** (Phase 1–7) used for client presentation and investor proof-of-concept.

---

## Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18.17 |
| npm | ≥ 9 |
| Git | any |

### Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/himalestates/himal-estates-demo.git
cd himal-estates-demo

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** No `.env` file is required for the demo — all data uses the mock service layer with `localStorage` persistence.

### Other Commands

```bash
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint check
npm run type-check # TypeScript strict check
```

---

## Demo Guide

### Admin Login

| Field | Value |
|-------|-------|
| URL | `/admin/login` |
| Email | `admin@himalestates.com` |
| Password | `demo2024` |

### Key Pages to Show

| Page | URL | What to highlight |
|------|-----|-------------------|
| Home | `/` | Hero search, featured listings, category tiles |
| Listings | `/listings` | Filter by type, location, price; sort; map toggle |
| Listing Detail | `/listings/[slug]` | Gallery, WhatsApp CTA, inquiry form, related |
| Admin Dashboard | `/admin` | Leads, listings, deals, revenue summary |
| Admin Listings | `/admin/listings` | CRUD, feature toggle, hot-deal badge |
| Admin Leads | `/admin/leads` | Inquiry pipeline, status updates |
| Admin Deals | `/admin/deals` | Commission tracking, deal closure |
| Admin Messages | `/admin/messages` | In-platform chat with inquirers |

### Demo Flow (5 minutes)

See [`demo-script.md`](demo-script.md) for the full scripted walkthrough.

---

## Project Structure

```
himal-estates-demo/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public-facing routes
│   │   │   ├── page.tsx       # Home
│   │   │   ├── listings/      # Browse & detail
│   │   │   ├── categories/    # Category pages
│   │   │   └── about/         # About Himal Estates
│   │   ├── (admin)/admin/     # Protected admin panel
│   │   └── api/               # Mock API route handlers
│   ├── components/
│   │   ├── ui/                # shadcn base components
│   │   ├── layout/            # Navbar, Footer, MobileNav
│   │   ├── listing/           # Cards, Gallery, FilterBar
│   │   ├── admin/             # Admin table, forms, stats
│   │   ├── chat/              # WhatsApp widget, inquiry modal
│   │   └── brand/             # Logo, tagline components
│   ├── lib/                   # formatNPR, cn, utils
│   ├── data/                  # Mock JSON data
│   ├── config/                # brand.ts (single source of truth)
│   ├── i18n/                  # en.json, ne.json
│   ├── hooks/                 # useListings, useAdmin, etc.
│   └── types/                 # TypeScript interfaces
├── public/
│   ├── images/                # Listing images, hero background
│   └── icons/                 # SVGs
├── docs/                      # This folder — project documentation
└── AGENTS.md                  # Coding rules for all agents
```

---

## Vercel Deployment

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/himalestates/himal-estates-demo)

### Manual Deploy Steps

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy (from project root)
vercel

# 4. For production
vercel --prod
```

**Vercel Settings:**
- Framework: Next.js (auto-detected)
- Build Command: `npm run build`
- Output Directory: `.next`
- Node.js Version: 18.x

No environment variables are required for the demo build.

> For a live production build connecting to Supabase, see `implementation-plan.md` → "Phase 7: Backend Migration".

---

## Contact & Brand

| Channel | Detail |
|---------|--------|
| WhatsApp | +977-9801234567 |
| Email | himalestates@gmail.com |
| Facebook | [facebook.com/himalestates](https://facebook.com/himalestates) |
| TikTok | [tiktok.com/@himalestates](https://tiktok.com/@himalestates) |

---

## Documentation Index

| File | Purpose |
|------|---------|
| [`PRD.md`](PRD.md) | Product requirements, user stories, success criteria |
| [`design-system.md`](design-system.md) | Colors, typography, spacing, component specs |
| [`implementation-plan.md`](implementation-plan.md) | Architecture, routing map, component tree |
| [`phases.md`](phases.md) | Development phases and progress tracking |
| [`rules.md`](rules.md) | Coding standards and conventions |
| [`data-model.md`](data-model.md) | TypeScript interfaces and data schema |
| [`decisions.md`](decisions.md) | Design decision log |
| [`test-plan.md`](test-plan.md) | Test cases for all major flows |
| [`demo-script.md`](demo-script.md) | 5-minute client presentation script |
| [`CHANGELOG.md`](CHANGELOG.md) | Version history |

---

*Built with ❤️ for Nepal's growing digital real-estate market.*
