# Product Requirements Document — Himal Estates

**Version:** 1.0  
**Date:** November 2024  
**Author:** Himal Estates Product Team  
**Status:** Approved for Phase 1 Implementation

---

## 1. Executive Summary

Himal Estates is a **Nepal-first digital property and business marketplace** that solves a critical gap in the Nepali real-estate market: listings scattered across Facebook groups, TikTok posts, and word-of-mouth referrals — with no central, searchable, trustworthy platform.

The platform serves as both a **public marketplace** (buyers, tenants, investors find properties) and a **back-office CRM** (admin/agent manages leads, tracks deals, earns commissions).

---

## 2. Problem Statement

### Current Pain Points

| Stakeholder | Pain |
|-------------|------|
| **Property Owner** | Posts on Facebook, gets lost in feed within days. No way to filter serious buyers from time-wasters. |
| **Buyer/Tenant** | Sees listings without verified prices, authentic photos, or property details. Contacts random agents. |
| **Agent/Broker** | Manages leads on WhatsApp, loses track of conversations. No commission record. No pipeline visibility. |
| **Business Seller** | No dedicated Nepal platform for businesses-for-sale. Uses Facebook Marketplace which feels informal. |

### Market Opportunity

- Nepal has **~750,000 property transactions/year** (estimated, Land Revenue Department)
- Kathmandu Valley alone has **1.2M+ rental households**
- **70%+ of Nepalis** discover properties via social media — but social media has no search, no filters, no trust signals
- Existing platforms (Hamrobazar, Gharbazar) are outdated, ad-heavy, and lack mobile-first UX

---

## 3. Goals

### Primary Goals

1. **For the Client (Admin/Agent):** Provide a professional digital presence that elevates credibility beyond Facebook/TikTok posts
2. **For Buyers/Tenants:** A fast, filterable, trustworthy way to discover verified listings in Nepal
3. **For Business:** Capture and qualify leads, track commission pipeline, close deals

### Business Goals

| Goal | Metric | Target (3 months post-launch) |
|------|--------|-------------------------------|
| Listings live | Count | 50+ active listings |
| Organic leads | Inquiries/month | 100+ |
| WhatsApp conversions | % of inquiries → WhatsApp | 60%+ |
| Deal closure | Deals/month via platform | 5+ |
| Google indexing | Listings indexed | 80%+ |
| Return visitors | Sessions from non-social | 30%+ |

---

## 4. Target Users

### 4.1 Buyer (Kharidar / खरिदार)

**Profile:** Urban professional or diaspora Nepali looking to buy residential or commercial property.

**Goals:**
- Browse verified listings with real photos
- Filter by location (ward/municipality), price range, type
- Compare options side by side
- Contact agent easily via WhatsApp

**Key frustrations:** Fake prices, outdated listings, no search functionality on social media.

---

### 4.2 Tenant (Bhardari / भाडामा बस्ने)

**Profile:** Student, young professional, or family looking to rent in Kathmandu Valley, Pokhara, Chitwan, or other metros.

**Goals:**
- Search by neighborhood (Baneshwor, Lalitpur, Bhaktapur, etc.)
- Filter by rooms, price, amenities
- Book a viewing via WhatsApp or inquiry form
- Trust that the listing is current

**Key frustrations:** Listings that are already rented but still posted. Hidden fees. Agents not responding.

---

### 4.3 Property Owner / Business Seller (Dhani / धनी)

**Profile:** Landlord, landowner, or business owner wanting to sell or rent out their property or business.

**Goals:**
- List property with photos and details
- Receive qualified leads
- Understand progress (views, inquiries)

**Key frustrations:** No analytics on social media posts. Can't distinguish serious from casual inquiries.

---

### 4.4 Admin / Middleman Agent (Dalal / दलाल)

**Profile:** The Himal Estates operator — acts as broker, manages all listings, qualifies leads, closes deals, tracks commission.

**Goals:**
- Full CRUD over all listings
- See all inquiries with contact info
- Update lead status (New → Contacted → Site Visit → Deal → Closed)
- Record commission earned per deal
- Chat with serious leads in-platform

**This user is the primary client** — the platform's value is in empowering this role.

---

## 5. User Stories

### Public (Buyer/Tenant)

| ID | As a... | I want to... | So that... |
|----|---------|--------------|------------|
| US-01 | Buyer | Search listings by type (land, house, flat, commercial) and location | I find relevant options fast |
| US-02 | Buyer | See a listing with real photos, price in NPR, map location, and room count | I can evaluate before contacting |
| US-03 | Buyer | Filter by price range (NPR 50 lakh–2 crore), area in Aana/Ropani/Sqft | I narrow down to affordable options |
| US-04 | Tenant | Filter by monthly rent, number of bedrooms, and allowed for family/bachelor | I find a compatible home |
| US-05 | Buyer | Submit an inquiry form with name, phone, and message | I make a formal inquiry |
| US-06 | Buyer | Tap a WhatsApp button and start a conversation immediately | I can get quick replies |
| US-07 | Visitor | Browse categories: Residential, Commercial, Land, Vehicles, Business | I know what types are available |
| US-08 | Visitor | See featured/hot-deal listings on the homepage | I discover promoted options |
| US-09 | Visitor | View listing details in Nepali (title, location) | I understand in my language |
| US-10 | Visitor | Share a listing link on Facebook or WhatsApp | I share with family/colleagues |

### Admin

| ID | As an... | I want to... | So that... |
|----|----------|--------------|------------|
| US-11 | Admin | Log in securely and see a dashboard summary | I have full visibility |
| US-12 | Admin | Create, edit, delete, and feature listings | I control the marketplace content |
| US-13 | Admin | Upload multiple photos per listing | Listings look professional |
| US-14 | Admin | See all inquiries with caller details and timestamp | I never miss a lead |
| US-15 | Admin | Update inquiry status (New/Contacted/Visit Scheduled/Deal/Lost) | I track the sales pipeline |
| US-16 | Admin | Record a closed deal with commission amount | I track earnings |
| US-17 | Admin | See total commission earned, pending deals, and top-performing listings | I measure business health |
| US-18 | Admin | Message an inquirer within the platform | I maintain conversation history |
| US-19 | Admin | Mark a listing as "Hot Deal" or "Featured" | I promote priority listings |
| US-20 | Admin | Export leads to CSV | I back up my data |

---

## 6. Features by Phase

| Phase | Feature Set |
|-------|------------|
| Phase 1 | Project scaffolding, design system, mock data, brand config |
| Phase 2 | Homepage with hero search, category tiles, featured listings |
| Phase 3 | Listings browse page with filters, sort, pagination |
| Phase 4 | Listing detail page with gallery, WhatsApp CTA, inquiry form |
| Phase 5 | Admin panel: login, dashboard, listings CRUD |
| Phase 6 | Admin leads pipeline, deals tracker, commission summary |
| Phase 7 | In-platform messaging, Supabase migration, SEO, deploy |

---

## 7. Non-Functional Requirements

### Performance
- **LCP** (Largest Contentful Paint): < 2.5s on 4G mobile
- **INP**: < 200ms
- **Image optimization**: WebP format, Next.js `<Image>` with blur placeholder
- **Bundle size**: < 200KB initial JS (gzipped)

### Accessibility
- **WCAG 2.1 AA** compliance
- All interactive elements keyboard-navigable
- Minimum 4.5:1 contrast ratio for text
- ARIA labels on icon-only buttons

### Localization
- **English** (primary interface)
- **Nepali / नेपाली** (listing titles, locations, UI text via next-intl)
- Currency: **NPR** (Nepali Rupee, format: रू १,२०,०००)
- Measurement: **Aana, Ropani, Dhur** (land); **Sqft, Sqm** (built-up)

### SEO
- Next.js App Router `generateMetadata` per listing
- OG tags (title, description, image) for social sharing
- Semantic HTML (h1 per page, article, section, nav)
- Sitemap and robots.txt

### Security (Demo)
- Admin route middleware: redirect to `/admin/login` if no session
- No real auth in demo — session stored in localStorage
- All form inputs sanitized via Zod

---

## 8. Success Criteria

### Phase 1 Complete When:
- [ ] Next.js project builds without errors
- [ ] All TypeScript interfaces defined
- [ ] Design system tokens applied via Tailwind
- [ ] Brand config exported from `src/config/brand.ts`
- [ ] Mock data layer ready (20+ listings, categories)
- [ ] All docs/ files created

### MVP (Phases 1–6) Complete When:
- [ ] Public can browse and filter 20+ listings
- [ ] Inquiry form submits and admin sees it
- [ ] Admin can CRUD listings
- [ ] Admin can track lead pipeline
- [ ] Admin can record and view commission
- [ ] Vercel deploy works and URL is shareable

### Product-Market Fit Signals:
- Client uses admin panel daily without training
- 3+ organic inquiries in first week
- Client upgrades from demo to live backend within 60 days

---

## 9. Out of Scope (Phase 1–7 Demo)

- Payment processing (escrow, online deposits)
- User registration for buyers/sellers (admin-only accounts)
- Real-time notifications (push/email)
- 3D property tours
- Mortgage/loan calculator integration with Nepali banks
- Mobile app (iOS/Android) — web is mobile-responsive

---

*Document Owner: Himal Estates Admin · Last updated: November 2024*
