# Implementation Plan — Himal Estates

**Version:** 1.0  
**Stack:** Next.js 14 App Router · TypeScript 5 · Tailwind CSS · shadcn/ui · Framer Motion · next-intl  
**Data Layer:** Mock service (localStorage) → Supabase-ready interfaces

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER                                   │
│  ┌────────────────────┐    ┌────────────────────────────────┐   │
│  │   PUBLIC ROUTES    │    │       ADMIN ROUTES             │   │
│  │  (public) group    │    │   (admin)/admin/ group         │   │
│  │                    │    │                                │   │
│  │  / (home)          │    │  /admin (dashboard)            │   │
│  │  /listings         │    │  /admin/listings               │   │
│  │  /listings/[slug]  │    │  /admin/leads                  │   │
│  │  /categories/[cat] │    │  /admin/deals                  │   │
│  │  /about            │    │  /admin/messages               │   │
│  │  /contact          │    │  /admin/settings               │   │
│  └─────────┬──────────┘    └──────────────┬─────────────────┘   │
│            │                              │                      │
│            └───────────┬──────────────────┘                     │
│                        │                                         │
│               ┌────────▼────────┐                               │
│               │  Service Layer  │  ← src/services/              │
│               │  (mock + API)   │     listingService.ts         │
│               │                 │     leadService.ts            │
│               │                 │     dealService.ts            │
│               │                 │     messageService.ts         │
│               └────────┬────────┘                               │
│                        │                                         │
│               ┌────────▼────────┐                               │
│               │  Data Layer     │  ← src/data/ (mock JSON)     │
│               │  localStorage   │     src/hooks/ (state)       │
│               └─────────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **App Router groups** `(public)` and `(admin)` share the root layout but have their own layouts — public gets Navbar/Footer, admin gets Sidebar
2. **Service layer** (`src/services/`) abstracts data access — all UI components call services, never touch localStorage directly → swap to Supabase without changing UI
3. **Mock data seeded once** into localStorage on app init via `src/data/seed.ts`
4. **Route protection** via Next.js middleware (`middleware.ts`) — redirects `/admin/*` to `/admin/login` if no session cookie

---

## 2. Folder Structure

```
src/
├── app/
│   ├── layout.tsx                   # Root layout (fonts, providers)
│   ├── globals.css                  # Tailwind base + custom CSS vars
│   ├── not-found.tsx                # 404 page
│   │
│   ├── (public)/                    # Public route group
│   │   ├── layout.tsx               # Navbar + Footer wrapper
│   │   ├── page.tsx                 # / — Homepage
│   │   ├── listings/
│   │   │   ├── page.tsx             # /listings — Browse
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # /listings/[slug] — Detail
│   │   ├── categories/
│   │   │   └── [category]/
│   │   │       └── page.tsx         # /categories/residential etc.
│   │   ├── about/
│   │   │   └── page.tsx             # /about
│   │   └── contact/
│   │       └── page.tsx             # /contact
│   │
│   ├── (admin)/
│   │   └── admin/
│   │       ├── login/
│   │       │   └── page.tsx         # /admin/login
│   │       ├── layout.tsx           # Admin layout (Sidebar + TopBar)
│   │       ├── page.tsx             # /admin — Dashboard
│   │       ├── listings/
│   │       │   ├── page.tsx         # /admin/listings — List
│   │       │   ├── new/
│   │       │   │   └── page.tsx     # /admin/listings/new — Create
│   │       │   └── [id]/
│   │       │       └── edit/
│   │       │           └── page.tsx # /admin/listings/[id]/edit
│   │       ├── leads/
│   │       │   └── page.tsx         # /admin/leads — Pipeline
│   │       ├── deals/
│   │       │   └── page.tsx         # /admin/deals — Commission tracker
│   │       ├── messages/
│   │       │   └── page.tsx         # /admin/messages — Chat
│   │       └── settings/
│   │           └── page.tsx         # /admin/settings
│   │
│   └── api/
│       ├── listings/
│       │   └── route.ts             # GET /api/listings (mock)
│       ├── leads/
│       │   └── route.ts             # POST /api/leads (inquiry submit)
│       └── admin/
│           └── auth/
│               └── route.ts         # POST /api/admin/auth
│
├── components/
│   ├── ui/                          # shadcn base + customized
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   └── ... (all shadcn components)
│   │
│   ├── layout/
│   │   ├── Navbar.tsx               # Public navigation
│   │   ├── Footer.tsx               # Public footer with social links
│   │   ├── MobileNav.tsx            # Sheet drawer for mobile
│   │   ├── AdminSidebar.tsx         # Admin navigation sidebar
│   │   └── AdminTopBar.tsx          # Admin header with user info
│   │
│   ├── listing/
│   │   ├── ListingCard.tsx          # Card for grid/list display
│   │   ├── ListingCardSkeleton.tsx  # Loading state
│   │   ├── ListingGrid.tsx          # Responsive grid wrapper
│   │   ├── ListingDetail.tsx        # Full detail view
│   │   ├── ListingGallery.tsx       # Photo gallery with lightbox
│   │   ├── ListingFilters.tsx       # Sidebar + mobile sheet filters
│   │   ├── ListingSort.tsx          # Sort dropdown
│   │   ├── FeaturedBadge.tsx        # Overlay badge components
│   │   └── HotDealBadge.tsx
│   │
│   ├── search/
│   │   ├── HeroSearch.tsx           # Homepage search bar
│   │   ├── SearchFilters.tsx        # Type/location/price filters
│   │   └── SearchResults.tsx        # Results with count + sort
│   │
│   ├── home/
│   │   ├── HeroSection.tsx          # Hero with search
│   │   ├── CategoryGrid.tsx         # Category tiles
│   │   ├── FeaturedListings.tsx     # Featured section
│   │   ├── HotDeals.tsx             # Hot deals section
│   │   ├── WhyChooseUs.tsx          # Trust signals
│   │   └── CTABanner.tsx            # WhatsApp / contact CTA
│   │
│   ├── inquiry/
│   │   ├── InquiryForm.tsx          # Inquiry form (name/phone/message)
│   │   ├── InquiryModal.tsx         # Dialog wrapper
│   │   └── WhatsAppButton.tsx       # Floating + inline WA button
│   │
│   ├── admin/
│   │   ├── DashboardStats.tsx       # Stat cards row
│   │   ├── RecentLeads.tsx          # Latest inquiries table
│   │   ├── ListingTable.tsx         # Admin listings management
│   │   ├── ListingForm.tsx          # Create/edit listing form
│   │   ├── LeadPipeline.tsx         # Kanban-style lead board
│   │   ├── DealTable.tsx            # Closed deals + commission
│   │   ├── CommissionSummary.tsx    # Revenue cards
│   │   └── AdminLoginForm.tsx       # Login form
│   │
│   ├── chat/
│   │   ├── MessageThread.tsx        # Chat conversation view
│   │   ├── MessageComposer.tsx      # Input area
│   │   └── ConversationList.tsx     # List of conversations
│   │
│   └── brand/
│       ├── Logo.tsx                 # SVG logo + text
│       ├── Tagline.tsx              # Brand tagline
│       └── SocialLinks.tsx          # FB, TikTok, WA icons + links
│
├── services/                        # Data access layer (swap-ready)
│   ├── listingService.ts
│   ├── leadService.ts
│   ├── dealService.ts
│   ├── messageService.ts
│   └── adminService.ts
│
├── data/                            # Mock JSON data
│   ├── seed.ts                      # Seeds localStorage on first load
│   ├── listings.json                # 20+ Nepal property listings
│   ├── categories.json              # 8 categories
│   ├── leads.json                   # Sample inquiry data
│   └── deals.json                   # Sample closed deals
│
├── config/
│   └── brand.ts                     # Single source of truth for brand
│
├── i18n/
│   ├── en.json                      # English strings
│   └── ne.json                      # Nepali strings (नेपाली)
│
├── hooks/
│   ├── useListings.ts               # Listing CRUD + filter state
│   ├── useLeads.ts                  # Lead pipeline state
│   ├── useDeals.ts                  # Deals + commission
│   ├── useAdmin.ts                  # Admin auth state
│   └── useMessages.ts               # Chat messages
│
├── lib/
│   ├── utils.ts                     # cn, formatNPR, formatDate, etc.
│   ├── validations.ts               # Zod schemas
│   └── constants.ts                 # App-wide constants
│
└── types/
    └── index.ts                     # All TypeScript interfaces
```

---

## 3. Routing Map

| Route | Component | Auth | Description |
|-------|-----------|------|-------------|
| `/` | `(public)/page.tsx` | Public | Homepage with hero, categories, featured |
| `/listings` | `(public)/listings/page.tsx` | Public | Browse all listings with filters |
| `/listings/[slug]` | `(public)/listings/[slug]/page.tsx` | Public | Listing detail + inquiry |
| `/categories/[category]` | `(public)/categories/[category]/page.tsx` | Public | Category filtered view |
| `/about` | `(public)/about/page.tsx` | Public | About Himal Estates |
| `/contact` | `(public)/contact/page.tsx` | Public | Contact + map |
| `/admin/login` | `(admin)/admin/login/page.tsx` | Public | Admin login |
| `/admin` | `(admin)/admin/page.tsx` | **Admin** | Dashboard |
| `/admin/listings` | `(admin)/admin/listings/page.tsx` | **Admin** | Manage listings |
| `/admin/listings/new` | `(admin)/admin/listings/new/page.tsx` | **Admin** | Create listing |
| `/admin/listings/[id]/edit` | `...edit/page.tsx` | **Admin** | Edit listing |
| `/admin/leads` | `(admin)/admin/leads/page.tsx` | **Admin** | Lead pipeline |
| `/admin/deals` | `(admin)/admin/deals/page.tsx` | **Admin** | Deals + commission |
| `/admin/messages` | `(admin)/admin/messages/page.tsx` | **Admin** | In-platform chat |
| `/admin/settings` | `(admin)/admin/settings/page.tsx` | **Admin** | App settings |

---

## 4. Data Flow

### Public Listing Browse

```
User visits /listings
    ↓
page.tsx (Server Component)
    ↓
listingService.getAll(filters)
    ↓
reads from localStorage (seeded JSON)
    ↓
returns Listing[]
    ↓
ListingGrid renders ListingCard × N
    ↓
User changes filters (Client Component)
    ↓
useListings() hook re-queries service
    ↓
grid updates (no page reload)
```

### Inquiry Submission

```
User fills InquiryForm
    ↓
Zod validation (client-side)
    ↓
POST /api/leads (mock route)
    ↓
leadService.create(inquiry)
    ↓
saves to localStorage leads[]
    ↓
WhatsApp deeplink opens (wa.me/9779801234567?text=...)
    ↓
Admin sees new lead in /admin/leads
```

### Admin Auth Flow

```
Visit /admin/*
    ↓
middleware.ts checks localStorage session
    ↓
No session? → redirect /admin/login
    ↓
Submit credentials (admin@himalestates.com / demo2024)
    ↓
adminService.login() validates against brand config
    ↓
Set session in localStorage
    ↓
Redirect → /admin dashboard
```

### Mock → Supabase Migration Path (Phase 7)

```typescript
// Current (mock):
// src/services/listingService.ts
export async function getListings(filters: ListingFilters): Promise<Listing[]> {
  const data = JSON.parse(localStorage.getItem('listings') ?? '[]');
  return applyFilters(data, filters);
}

// Future (Supabase — same interface, different impl):
export async function getListings(filters: ListingFilters): Promise<Listing[]> {
  const { data } = await supabase
    .from('listings')
    .select('*')
    .match(buildSupabaseQuery(filters));
  return data ?? [];
}
// UI components never change — only the service body changes.
```

---

## 5. Component Tree (Homepage)

```
app/(public)/page.tsx
└── PublicLayout
    ├── Navbar
    │   ├── Logo
    │   ├── NavLinks
    │   └── MobileNav (Sheet)
    │
    ├── HeroSection
    │   ├── HeroBackground (Image)
    │   ├── HeroHeadline
    │   └── HeroSearch
    │       ├── SearchTypeSelect
    │       ├── SearchLocationInput
    │       ├── SearchPriceRange
    │       └── SearchButton
    │
    ├── CategoryGrid
    │   └── CategoryTile × 8
    │
    ├── FeaturedListings
    │   ├── SectionHeader
    │   └── ListingGrid
    │       └── ListingCard × 6
    │           ├── ListingImage (Next Image)
    │           ├── HotDealBadge (conditional)
    │           ├── FeaturedBadge (conditional)
    │           ├── ListingPrice
    │           ├── ListingTitle
    │           ├── ListingLocation
    │           ├── ListingChips (type, area)
    │           └── ListingActions
    │               ├── WhatsAppButton
    │               └── ViewDetailsButton
    │
    ├── HotDeals
    │   └── ListingGrid (filtered: hotDeal=true)
    │
    ├── WhyChooseUs
    │   └── FeatureCard × 4
    │
    ├── CTABanner
    │   ├── CTAText
    │   └── WhatsAppCTA
    │
    └── Footer
        ├── BrandInfo (Logo, tagline, social links)
        ├── QuickLinks
        ├── Categories
        └── Contact
```

---

## 6. State Management

**No Redux / Zustand** — React hooks + service layer is sufficient for the demo scope.

| State | Location | Persistence |
|-------|----------|-------------|
| Listing filters (type, location, price, sort) | `useListings()` hook, URL search params | URL |
| Admin session | `useAdmin()` hook | localStorage |
| Inquiry form state | `InquiryForm` component local state | — |
| Lead pipeline state | `useLeads()` hook | localStorage |
| Deal records | `useDeals()` hook | localStorage |
| Messages | `useMessages()` hook | localStorage |
| Language preference | `next-intl` locale | Cookie |

---

## 7. SEO Strategy

### Per-Page Metadata

```typescript
// src/app/(public)/listings/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const listing = await listingService.getBySlug(params.slug);
  return {
    title: `${listing.title} | Himal Estates`,
    description: listing.description.slice(0, 160),
    openGraph: {
      title: listing.title,
      description: listing.description.slice(0, 160),
      images: [listing.images[0]],
      type: 'website',
      locale: 'ne_NP',
    },
  };
}
```

### Sitemap

Auto-generated via `src/app/sitemap.ts` — includes all listing slugs for Google indexing.

---

## 8. Performance Budget

| Metric | Target | Strategy |
|--------|--------|---------|
| LCP | < 2.5s | Hero image preload, Next Image priority |
| INP | < 200ms | No heavy client-side JS on initial render |
| CLS | < 0.1 | Fixed image dimensions, skeleton loaders |
| Bundle (initial JS) | < 200KB gzip | Dynamic imports for admin, Leaflet, Recharts |
| Lighthouse score | > 90 | Static generation for public pages |

---

*Implementation plan is a living document — update when architecture decisions change.*
