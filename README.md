# Himal Estates — Nepal's Property & Business Marketplace

> **Tagline:** Nepal's Property & Business Marketplace  
> **Nepali:** नेपालको सम्पत्ति र व्यापार बजार  
> **Client Persona:** Real-estate middleman facilitating rentals, sales, land, shops, hotels & businesses across Nepal.

---

## 🏔 Project Overview

**Himal Estates** is a production-quality, responsive web application engineered to demonstrate why a dedicated digital marketplace beats chaotic social media (Facebook groups & TikTok) alone.

It empowers the property broker with:
1. **Permanent 24/7 Searchable Catalog:** No more buried listings after 48 hours. Filter by authentic Nepali units (Ropani, Aana, BHK, monthly rent brackets).
2. **Interactive Map Exploration:** Built on OpenStreetMap with Leaflet, highlighting property locations across Kathmandu Valley and Pokhara.
3. **High-Conversion Middleman Tools:**
   - Interactive **Call Simulator** (ringing & connected timer) + mobile `tel:` deep link.
   - 1-Tap **WhatsApp Integration** generating pre-formatted property inquiry messages.
   - Simulated **Live Chat Widget** with typing indicators and automated context-aware replies.
4. **Mobile-Friendly Middleman Admin Portal (`/admin`):**
   - **Dashboard KPIs:** Active listings, monthly deal volume, total commission earned.
   - **Listings Manager:** Real-time status updates (Active, Sold, Rented, Hidden), Featured & Hot Deal toggles.
   - **Approval Queue:** Review owner-submitted listings from the public wizard and publish them live with 1 click.
   - **Leads & CRM Pipeline:** Track buyer inquiries through stages (New → Contacted → Site-Visited → Negotiating → Deal Done) with private broker notes.
   - **Commission Tracker:** Record transactions, calculate 2% broker fees, and export records directly to `.csv`.
   - **"Share to Social" Asset Generator:** Generate branded 4:5 social media cards and pre-written captions with hashtags ready to paste into TikTok and Facebook.

---

## 🚀 Quick Start Guide

### 1. Requirements
- Node.js 18.18+ or Node.js 20+
- npm or pnpm

### 2. Installation
```bash
cd himal-estates-demo
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```
Compiles with Next.js Turbopack into optimized static and server-streamed pages (0 TypeScript or lint errors).

---

## 🔑 Demo Credentials

To access the Middleman Admin Control Center:
- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email:** `admin@himalestates.com`
- **Password:** `demo2024`
- *(A convenient "1-Click Sign In As Admin" button is available on the login page for rapid client demonstrations).*

---

## 🎨 Single-Source Brand Configuration

All branding, phone numbers, WhatsApp links, social accounts, and domain names are centralized in **`src/config/brand.ts`**:
```typescript
export const brand = {
  name: 'Himal Estates',
  tagline: "Nepal's Property & Business Marketplace",
  taglineNepali: 'नेपालको सम्पत्ति र व्यापार बजार',
  phone: '+977-9801234567',
  whatsapp: '9779801234567',
  email: 'himalestates@gmail.com',
  address: 'Kathmandu, Nepal',
  facebook: 'https://facebook.com/himalestates',
  tiktok: 'https://tiktok.com/@himalestates',
  instagram: 'https://instagram.com/himalestates',
  adminEmail: 'admin@himalestates.com',
  adminPassword: 'demo2024',
  domain: 'himalestates.com.np',
  year: 2024,
};
```
*Changing any property in this file updates the entire site (Navbar, Footer, SEO metadata, Social Share generator, WhatsApp links) in seconds.*

---

## 🌐 Complete Route Map

| Route | Purpose | Key Features |
|---|---|---|
| `/` | Homepage | Multi-tab Hero Search, Trust metrics, Category grid, Featured, Hot deals, Comparison matrix, CTA |
| `/listings` | Catalog Browse | Search, Filters (Type, Category, Budget, Bedrooms), Sort, Grid vs Split Map view |
| `/listings/[slug]` | Listing Detail | HD Photo Gallery + Lightbox, Specs, Facilities, Leaflet Map, Sticky Call & WhatsApp bar, Inquiry form |
| `/list-property` | Owner Submission Wizard | 4-step form with simulated drag-and-drop photo upload; dispatches to Admin Queue |
| `/saved` | Saved Favorites | LocalStorage-backed bookmark collection with 1-click clear |
| `/admin` | Middleman Admin Portal | Dashboard KPIs, Listings Manager, Approval Queue, Leads CRM, Commissions, "Share to Social" |
| `/about` | About Us | Story, 3 core pillars, headquarters details |
| `/contact` | Contact Page | Direct phone/WhatsApp links, interactive inquiry form |
| `/terms` & `/privacy` | Legal policies | Middleman fee terms (2%), verification policy, confidentiality |

---

## ☁️ Deployment to Vercel

1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com/new), click **"Add New Project"** and select the repository.
3. Set **Framework Preset** to `Next.js`.
4. Ensure the root directory is set to `himal-estates-demo` if deploying from a monorepo.
5. Click **"Deploy"**. The site will build and deploy with full edge static prerendering!

---

## 📁 Architecture & Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5 (Strict Mode, 0 `any` types)
- **Styling:** Tailwind CSS (Custom Himalayan palette + Glassmorphism tokens)
- **Icons:** Lucide React (Consistent SVG iconography, zero emoji icons)
- **Maps:** Leaflet & OpenStreetMap (Dynamic client-side load, custom price markers)
- **State & Storage:** Service layer (`src/lib/storage.ts`) with `localStorage` persistence and JSON seed data
- **i18n:** Bilingual context (`src/context/LanguageContext.tsx`) with English & authentic Devanagari Nepali
- **Currency:** Custom `formatNPR` helper with South Asian groupings (Lakhs & Crores)
