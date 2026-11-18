# Development Phases — Himal Estates

**Project:** Himal Estates Demo (Nepal's Property & Business Marketplace)  
**Total Phases:** 7  
**Current Status:** Phase 1 — In Progress 🔄

---

## Progress Overview

```
Phase 1: Project Setup & Foundation     🔄 IN PROGRESS
Phase 2: Homepage & Public UI           ⏳ Pending
Phase 3: Listings Browse & Filter       ⏳ Pending
Phase 4: Listing Detail & Inquiry       ⏳ Pending
Phase 5: Admin Panel — Listings CRUD   ⏳ Pending
Phase 6: Admin Leads, Deals & Chat      ⏳ Pending
Phase 7: Polish, SEO & Deploy           ⏳ Pending
```

---

## Phase 1 — Project Setup & Foundation 🔄

**Goal:** Zero-to-running Next.js project with design system, types, mock data, and documentation.  
**Estimated time:** 1 day

### Tasks

- [x] Create Next.js 14 App Router project with TypeScript, Tailwind, ESLint
- [x] Install all dependencies (framer-motion, lucide-react, next-intl, zod, react-hook-form, recharts, leaflet)
- [x] Initialize shadcn/ui with custom theme
- [x] Add shadcn components (Button, Card, Dialog, Sheet, Tabs, Select, Input, Textarea, Badge, Separator, Skeleton, Avatar, DropdownMenu, Command, Popover)
- [ ] Create full folder structure (`src/app`, `src/components`, `src/services`, `src/data`, etc.)
- [ ] Create `src/config/brand.ts` — single source of truth for all brand data
- [ ] Configure `tailwind.config.ts` with design tokens (colors, fonts, shadows, radius)
- [ ] Create `src/types/index.ts` — all TypeScript interfaces
- [ ] Create `src/lib/utils.ts` — `formatNPR`, `formatDate`, `cn`
- [ ] Create `src/i18n/en.json` and `src/i18n/ne.json` — translations
- [ ] Seed mock data: 20+ listings, categories, sample leads, sample deals
- [ ] Create `AGENTS.md` at project root (coding rules)
- [ ] Create all 11 `docs/` files
- [ ] Git commit: `"chore: Phase 1 — project scaffolding and workspace setup"`
- [ ] `npm run build` passes without errors

### Acceptance Criteria

- `npm run dev` starts with no console errors
- `npm run build` succeeds
- All TypeScript strict checks pass (`npm run type-check`)
- `src/config/brand.ts` exports `brand` object with all contact details
- `formatNPR(1200000)` returns `"NPR 12,00,000"`
- 20+ listings present in `src/data/listings.json`

---

## Phase 2 — Homepage & Public UI ⏳

**Goal:** A polished, complete homepage that showcases the brand, featured listings, and search entry point.  
**Estimated time:** 1–2 days

### Tasks

- [ ] Public layout: `Navbar` (desktop + mobile drawer), `Footer`
- [ ] `HeroSection`: Full-width hero with Kathmandu skyline, headline, tagline in Nepali + English, `HeroSearch` bar
- [ ] `HeroSearch`: Type select (Residential/Commercial/Land/Vehicle/Business), location typeahead, price range
- [ ] `CategoryGrid`: 8 category tiles with icons, listing counts, hover states
- [ ] `FeaturedListings`: Horizontal scroll on mobile, 3-col grid on desktop — 6 ListingCards
- [ ] `HotDeals`: Accent-colored section with 3 hot-deal listings
- [ ] `WhyChooseUs`: 4 trust-signal cards (Verified Listings, WhatsApp Response, Nepal-first, Admin-managed)
- [ ] `CTABanner`: Full-width WhatsApp CTA with terracotta background
- [ ] `Footer`: Brand info, links, social media icons, contact
- [ ] Language toggle (EN / नेपाली) in Navbar
- [ ] WhatsApp float button (bottom-right, all pages)
- [ ] Responsive: mobile-first, tested at 375px, 768px, 1280px

### Acceptance Criteria

- Lighthouse mobile score ≥ 85
- All interactive elements reachable by keyboard
- Nepali text renders correctly in Noto Sans Devanagari
- WhatsApp float button opens wa.me link correctly
- Language toggle switches visible UI strings

---

## Phase 3 — Listings Browse & Filter ⏳

**Goal:** A powerful, fast listings browse page with real filters, sorting, and URL-synced state.  
**Estimated time:** 1–2 days

### Tasks

- [ ] `/listings` page with `ListingGrid` (responsive: 1→2→3→4 col)
- [ ] `ListingFilters` sidebar: Type, Location (district/municipality), Price range (slider), Rooms, Area unit (Aana/Ropani/Sqft), Status (Sale/Rent/Business)
- [ ] Mobile filters: Sheet drawer triggered by filter button
- [ ] `ListingSort`: Newest, Price (Low→High), Price (High→Low), Area, Featured first
- [ ] URL search params sync: filters survive browser back/forward
- [ ] `ListingCard` with all states: loading skeleton, featured ring, hot-deal badge, hover animation
- [ ] Pagination or infinite scroll (load more button)
- [ ] Empty state: "No listings found" with reset filters CTA
- [ ] Category page `/categories/[category]` reuses ListingGrid with pre-applied filter
- [ ] Active filter chips above grid (removable)
- [ ] Result count: "Showing 24 of 48 listings in Kathmandu"

### Acceptance Criteria

- Filtering by type + location + price returns correct subset
- URL updates on filter change (`?type=residential&location=kathmandu`)
- Mobile filter sheet opens/closes smoothly
- Skeleton loaders show during data fetch
- Empty state renders correctly when filters yield 0 results

---

## Phase 4 — Listing Detail & Inquiry ⏳

**Goal:** Rich listing detail page with gallery, full description, WhatsApp CTA, inquiry form, and related listings.  
**Estimated time:** 1–2 days

### Tasks

- [ ] `/listings/[slug]` page with `generateMetadata` for SEO
- [ ] `ListingGallery`: Full-width hero image + thumbnail strip + lightbox/modal on click
- [ ] Listing header: title (EN + NE), price (formatted NPR), type badge, status badge
- [ ] Listing meta: Location (ward, municipality, district), Area in multiple units, Floor, Facing, Furnishing
- [ ] Listing description: Full text, facilities list (parking, water, solar, lift, etc.)
- [ ] Location section: Static map pin (Leaflet, lazy-loaded)
- [ ] `InquiryForm`: Name, phone (Nepal format validation: 98XXXXXXXX), message, Zod-validated
- [ ] `WhatsAppButton`: Opens pre-filled wa.me link with listing title
- [ ] Related listings: 3 cards, same category or location
- [ ] Breadcrumb: Home > Listings > [Category] > [Title]
- [ ] Social share buttons (Facebook, WhatsApp, copy link)
- [ ] Schema.org JSON-LD for SEO (RealEstateListing)
- [ ] `generateStaticParams` for static generation of all listing slugs

### Acceptance Criteria

- Gallery lightbox works on mobile and desktop
- Inquiry form rejects invalid Nepal phone format (must be 10 digits, start with 97/98)
- WhatsApp button pre-fills message: "म यो सम्पत्तिमा रुचि राख्छु: [title] — [URL]"
- Schema.org JSON-LD present in page source
- OG image for social sharing uses listing's first photo

---

## Phase 5 — Admin Panel: Listings CRUD ⏳

**Goal:** A fully functional admin panel where the agent can manage all listings.  
**Estimated time:** 1–2 days

### Tasks

- [ ] `/admin/login` page with `AdminLoginForm` (email + password)
- [ ] `middleware.ts`: Protect all `/admin/*` routes
- [ ] Admin layout: `AdminSidebar` (collapsible) + `AdminTopBar` (user info, logout)
- [ ] `/admin` dashboard: Stats cards (Total listings, Total leads, Total deals, Commission this month)
- [ ] `RecentLeads` table (last 5 inquiries with status badges)
- [ ] `RecentActivity` feed
- [ ] `/admin/listings` page: `ListingTable` with search, type filter, status filter
- [ ] Listing table columns: Thumbnail, Title, Type, Location, Price, Status (Active/Rented/Sold), Featured toggle, Hot Deal toggle, Actions (Edit/Delete)
- [ ] `/admin/listings/new`: `ListingForm` — all fields with validation
- [ ] `/admin/listings/[id]/edit`: Pre-filled edit form
- [ ] Image upload UI (mock — stores base64 or URL in mock data)
- [ ] Featured and Hot Deal toggle (saves to localStorage immediately)
- [ ] Delete with confirmation dialog
- [ ] Success/error toast notifications

### Acceptance Criteria

- Login with `admin@himalestates.com` / `demo2024` redirects to `/admin`
- Visiting `/admin` without login redirects to `/admin/login`
- Create listing → appears in `/listings` public page
- Featured toggle immediately reflects on homepage featured section
- Delete with confirmation removes listing from public view

---

## Phase 6 — Admin Leads, Deals & Chat ⏳

**Goal:** Complete CRM capability — lead tracking, deal closure, commission recording, and in-platform messaging.  
**Estimated time:** 1–2 days

### Tasks

- [ ] `/admin/leads` page: `LeadPipeline` Kanban board
  - Columns: New → Contacted → Site Visit → Negotiation → Deal → Lost
  - Drag-and-drop status update (or click-to-move)
  - Lead card: inquirer name, phone, listing title, timestamp, days in stage
  - Quick actions: Mark contacted, Schedule visit, Open WhatsApp
- [ ] Lead detail panel: Full inquiry message, listing details, status history
- [ ] `/admin/deals` page: `DealTable` + `CommissionSummary`
  - Record new deal: listing, buyer name, sale price, commission %, commission amount
  - Deal table: columns for all above + date + status
  - `CommissionSummary` cards: Total earned, This month, Pending deals, Average commission
  - Export deals to CSV
- [ ] `/admin/messages` page: In-platform chat
  - `ConversationList`: All inquirers with unread count badge
  - `MessageThread`: Chat history with timestamps
  - `MessageComposer`: Text input, send button, emoji picker
- [ ] `/admin/settings` page: Brand settings display (contact info, social links), change admin password

### Acceptance Criteria

- Lead status changes persist after page refresh
- Deal form calculates commission automatically when price + % entered
- Commission summary cards update when new deal added
- Messages persist in localStorage per conversation
- CSV export downloads a valid file

---

## Phase 7 — Polish, SEO & Deploy ⏳

**Goal:** Production-ready build, fully optimized, deployed on Vercel with real Nepali domain.  
**Estimated time:** 1–2 days

### Tasks

- [ ] Lighthouse audit ≥ 90 all categories (Performance, A11y, Best Practices, SEO)
- [ ] `sitemap.ts`: Auto-generated sitemap with all listing URLs
- [ ] `robots.txt`: Configured correctly
- [ ] All images: WebP format, proper alt text, Next Image with size hints
- [ ] Skip-to-content link for keyboard users
- [ ] All form error messages in both English and Nepali
- [ ] `loading.tsx` files for all major routes (Suspense)
- [ ] `error.tsx` files with graceful error UI
- [ ] Meta tags: OG, Twitter Card, canonical URLs
- [ ] Google Analytics 4 integration (via `next/script`)
- [ ] Vercel deploy with custom domain `himalestates.com.np`
- [ ] Environment variables moved out of code (Supabase-ready `.env.example`)
- [ ] Final git tag: `v1.0.0-demo`
- [ ] Demo presentation run-through

### Acceptance Criteria

- Vercel deploy URL works publicly
- Lighthouse mobile ≥ 90 all categories
- Sitemap accessible at `/sitemap.xml`
- Google Search Console submission complete
- Admin panel functional on deployed URL
- All links work (no 404s)

---

## Phase Dependency Graph

```
Phase 1 (Foundation)
    ↓
Phase 2 (Homepage)
    ↓
Phase 3 (Listings Browse)
    ↓
Phase 4 (Listing Detail) ←──────────────┐
    │                                    │
Phase 5 (Admin Listings) ───────────────┤
    ↓                                    │
Phase 6 (Admin CRM) ────────────────────┘
    ↓
Phase 7 (Polish & Deploy)
```

---

*Phases are sequential. Mark tasks complete with `[x]` as work is done. Update status emoji at top.*
