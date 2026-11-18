# Data Model — Himal Estates

**Version:** 1.0  
**Location:** `src/types/index.ts`  
**Philosophy:** All interfaces designed so the **mock service layer** (localStorage) can be **swapped to Supabase** without changing any UI component code.

---

## Design Principles

1. **UI never knows about the storage engine.** Components receive typed objects; services handle where they come from.
2. **Every object has an `id` field** — UUID string in mock, Supabase UUID in production.
3. **Timestamps are ISO 8601 strings** — `"2024-11-15T10:30:00+05:45"` (Nepal Standard Time, UTC+5:45)
4. **Optional fields use `?`**, never `null | undefined` union where avoidable.
5. **Enums as `const` objects** with a string union type — works in both runtime and type system.

---

## 1. Enums (as const + type)

```typescript
// src/types/index.ts

// ─── Listing ───────────────────────────────────────────

export const ListingType = {
  Residential:  'residential',
  Commercial:   'commercial',
  Land:         'land',
  Vehicle:      'vehicle',
  Business:     'business',
} as const;
export type ListingType = typeof ListingType[keyof typeof ListingType];

export const ListingStatus = {
  Active:    'active',
  Rented:    'rented',
  Sold:      'sold',
  Pending:   'pending',
  Paused:    'paused',
} as const;
export type ListingStatus = typeof ListingStatus[keyof typeof ListingStatus];

export const PriceType = {
  Sale:    'sale',      // One-time sale price
  Rent:    'rent',      // Monthly rent
  Lease:   'lease',     // Annual lease
} as const;
export type PriceType = typeof PriceType[keyof typeof PriceType];

export const AreaUnit = {
  Aana:    'aana',      // 1 Aana = 31.8 sqm (Nepal land measure)
  Ropani:  'ropani',    // 1 Ropani = 16 Aana = 508.72 sqm
  Dhur:    'dhur',      // 1 Dhur = 182.25 sqm (Terai)
  Sqft:    'sqft',      // Square feet (built-up area)
  Sqm:     'sqm',       // Square meters
} as const;
export type AreaUnit = typeof AreaUnit[keyof typeof AreaUnit];

export const Facing = {
  East:      'east',
  West:      'west',
  North:     'north',
  South:     'south',
  NorthEast: 'north-east',
  NorthWest: 'north-west',
  SouthEast: 'south-east',
  SouthWest: 'south-west',
} as const;
export type Facing = typeof Facing[keyof typeof Facing];

export const Furnishing = {
  Furnished:        'furnished',
  SemiFurnished:    'semi-furnished',
  Unfurnished:      'unfurnished',
} as const;
export type Furnishing = typeof Furnishing[keyof typeof Furnishing];

// ─── Lead / Inquiry ────────────────────────────────────

export const LeadStatus = {
  New:            'new',
  Contacted:      'contacted',
  VisitScheduled: 'visit-scheduled',
  Negotiation:    'negotiation',
  Deal:           'deal',
  Lost:           'lost',
} as const;
export type LeadStatus = typeof LeadStatus[keyof typeof LeadStatus];

export const LeadSource = {
  Website:   'website',   // Inquiry form on site
  WhatsApp:  'whatsapp',  // Direct WhatsApp contact
  Facebook:  'facebook',  // Facebook referral
  TikTok:    'tiktok',
  Referral:  'referral',  // Word of mouth
  Walk_In:   'walk-in',   // Physical visit
} as const;
export type LeadSource = typeof LeadSource[keyof typeof LeadSource];

// ─── Deal ──────────────────────────────────────────────

export const DealStatus = {
  Open:      'open',       // Negotiation in progress
  Closed:    'closed',     // Deal finalized
  Cancelled: 'cancelled',  // Fell through
} as const;
export type DealStatus = typeof DealStatus[keyof typeof DealStatus];

// ─── Message ───────────────────────────────────────────

export const MessageSender = {
  Admin:    'admin',
  Inquirer: 'inquirer',
} as const;
export type MessageSender = typeof MessageSender[keyof typeof MessageSender];
```

---

## 2. Location Interface

```typescript
export interface NepalLocation {
  province:     string;    // "Bagmati", "Gandaki", "Lumbini", etc.
  district:     string;    // "Kathmandu", "Lalitpur", "Bhaktapur", etc.
  municipality: string;    // "Kathmandu Metropolitan City", "Pokhara"
  ward?:        number;    // Ward number (1–35 for KMC)
  tole?:        string;    // Tole/neighborhood: "Baneshwor", "Lazimpat"
  landmark?:    string;    // "Near Baneshwor Chowk", "Opposite NIC Asia Bank"
  mapLat?:      number;    // Latitude for Leaflet map pin
  mapLng?:      number;    // Longitude
  fullAddress:  string;    // Computed: "Baneshwor, Ward 10, Kathmandu"
}
```

---

## 3. Listing Interface

```typescript
export interface Listing {
  // ── Identity ──────────────────────────────────
  id:          string;        // UUID
  slug:        string;        // URL-safe: "3bhk-apartment-baneshwor-ktm-001"
  
  // ── Content ───────────────────────────────────
  title:       string;        // "3BHK Apartment for Rent in Baneshwor"
  titleNe?:    string;        // "बानेश्वरमा ३बीएचके अपार्टमेन्ट भाडामा"
  description: string;        // Full description in English
  descriptionNe?: string;     // Nepali description

  // ── Classification ────────────────────────────
  type:        ListingType;   // 'residential' | 'commercial' | 'land' | ...
  categoryId:  string;        // FK to Category.id
  status:      ListingStatus; // 'active' | 'rented' | 'sold' | ...

  // ── Pricing ───────────────────────────────────
  price:       number;        // Amount in NPR (no formatting — use formatNPR)
  priceType:   PriceType;     // 'sale' | 'rent' | 'lease'
  priceNegotiable: boolean;

  // ── Location ──────────────────────────────────
  location:    NepalLocation;

  // ── Property Details ──────────────────────────
  area?:       number;        // Numeric value
  areaUnit?:   AreaUnit;      // 'aana' | 'ropani' | 'sqft' | ...
  builtArea?:  number;        // Built-up area in sqft (for houses/flats)
  floors?:     number;        // Total floors in building
  floor?:      number;        // Which floor the unit is on
  bedrooms?:   number;        // BHK
  bathrooms?:  number;
  facing?:     Facing;
  furnishing?: Furnishing;
  age?:        number;        // Building age in years
  
  // ── Facilities (Nepal-specific) ───────────────
  facilities: {
    parking:        boolean;  // Car/bike parking
    electricity:    boolean;  // 24hr or load-shedding schedule?
    water:          boolean;  // Municipal or tanker
    solar:          boolean;  // Solar backup
    generator:      boolean;  // Generator backup
    lift:           boolean;  // Elevator
    security:       boolean;  // Guard / CCTV
    internet:       boolean;  // Fiber / broadband
    gym:            boolean;
    garden:         boolean;
    rooftop:        boolean;
    puja_kotha:     boolean;  // Prayer room (common in Nepali homes)
    store_room:     boolean;
    servant_quarter: boolean;
  };

  // ── Media ─────────────────────────────────────
  images:      string[];      // Array of URLs (or base64 in mock)
  coverImage:  string;        // First/primary image URL
  videoUrl?:   string;        // YouTube/TikTok embed URL

  // ── Promotion ─────────────────────────────────
  featured:    boolean;       // Shows in Featured section on homepage
  hotDeal:     boolean;       // Shows Hot Deal badge + section
  verified:    boolean;       // Admin-verified listing

  // ── Ownership ─────────────────────────────────
  ownerName?:  string;        // Property owner name (private — admin only)
  ownerPhone?: string;        // Owner's phone (private — admin only)

  // ── Analytics ─────────────────────────────────
  viewCount:   number;        // Incremented on detail page view
  inquiryCount: number;       // Count of inquiries received

  // ── Timestamps ────────────────────────────────
  createdAt:   string;        // ISO 8601
  updatedAt:   string;        // ISO 8601
  expiresAt?:  string;        // Optional expiry for time-limited listings
}
```

---

## 4. Category Interface

```typescript
export interface Category {
  id:          string;
  slug:        string;         // 'residential', 'commercial', 'land', etc.
  name:        string;         // "Residential Property"
  nameNe:      string;         // "आवासीय सम्पत्ति"
  description: string;
  icon:        string;         // Lucide icon name: 'Home', 'Building2', etc.
  listingCount: number;        // Computed — updated on listing CRUD
  sortOrder:   number;         // Display order on category grid
}

// Standard categories for Himal Estates:
// 1. residential   — घर / Apartment / Flat / BHK
// 2. commercial    — Office / Shop / Showroom / Warehouse
// 3. land          — Aana / Ropani / Dhur land plots
// 4. vehicle       — Car / Bike / Truck for sale (secondary feature)
// 5. business      — Business-for-sale / franchise
// 6. hotel-resort  — Hotels, lodges, homestay properties
// 7. industrial    — Factory, godown, industrial shed
// 8. agriculture   — Farm land, orchard, rural property
```

---

## 5. Inquiry / Lead Interface

```typescript
export interface Inquiry {
  id:          string;
  
  // ── Inquirer Info ─────────────────────────────
  name:        string;         // "Ram Bahadur Thapa"
  phone:       string;         // "9801234567" (Nepal format, 10 digits)
  email?:      string;
  message:     string;         // Inquiry message
  
  // ── Linked Data ───────────────────────────────
  listingId:   string;         // FK to Listing.id
  listingTitle: string;        // Denormalized for display without join
  listingSlug: string;         // For linking back to listing
  
  // ── Lead Management ───────────────────────────
  status:      LeadStatus;     // Pipeline stage
  source:      LeadSource;     // How they found us
  assignedTo?: string;         // Admin user ID (for multi-agent future)
  
  // ── Communication ─────────────────────────────
  whatsappSent: boolean;       // Did admin send WhatsApp reply?
  lastContactAt?: string;      // ISO 8601
  notes?:      string;         // Admin private notes
  
  // ── Timestamps ────────────────────────────────
  createdAt:   string;         // ISO 8601
  updatedAt:   string;         // ISO 8601
}
```

---

## 6. Message Interface

```typescript
export interface Message {
  id:          string;
  inquiryId:   string;         // FK to Inquiry.id — conversation thread
  sender:      MessageSender;  // 'admin' | 'inquirer'
  senderName:  string;         // Display name
  body:        string;         // Message text
  read:        boolean;        // Has the other party read it?
  createdAt:   string;         // ISO 8601
}

export interface Conversation {
  inquiryId:   string;
  inquirerName: string;
  inquirerPhone: string;
  listingTitle: string;
  listingSlug:  string;
  messages:    Message[];
  unreadCount: number;         // Unread by admin
  lastMessage: string;         // Preview text
  lastMessageAt: string;       // ISO 8601
}
```

---

## 7. Deal / Commission Interface

```typescript
export interface Deal {
  id:          string;
  
  // ── Linked Listing ────────────────────────────
  listingId:   string;         // FK to Listing.id
  listingTitle: string;        // Denormalized
  listingType: ListingType;
  
  // ── Parties ───────────────────────────────────
  buyerName:   string;         // Buyer/tenant name
  buyerPhone:  string;
  sellerName?: string;         // Seller/owner name
  
  // ── Financial ─────────────────────────────────
  dealPrice:   number;         // Final agreed price in NPR
  commissionRate: number;      // Percentage: 1.5 for 1.5%
  commissionAmount: number;    // Computed: dealPrice × (commissionRate / 100)
  commissionPaid: boolean;     // Has commission been received?
  commissionPaidAt?: string;   // ISO 8601
  
  // ── Status ────────────────────────────────────
  status:      DealStatus;     // 'open' | 'closed' | 'cancelled'
  closedAt?:   string;         // ISO 8601
  notes?:      string;
  
  // ── Timestamps ────────────────────────────────
  createdAt:   string;
  updatedAt:   string;
}

// Commission summary (derived/computed — not stored)
export interface CommissionSummary {
  totalEarned:     number;     // Sum of all closed deals
  thisMonth:       number;     // Current calendar month
  lastMonth:       number;     // Previous month
  pendingDeals:    number;     // Count of open deals
  pendingAmount:   number;     // Sum of open deal commissions
  averageRate:     number;     // Average commission %
  topListing?:     string;     // Listing title that earned most
}
```

---

## 8. User / Admin Interface

```typescript
export interface AdminUser {
  id:          string;
  email:       string;         // "admin@himalestates.com"
  name:        string;         // "Himal Estates Admin"
  role:        'super_admin' | 'admin' | 'viewer';
  avatar?:     string;         // URL
  phone?:      string;
  createdAt:   string;
  lastLoginAt?: string;
}

export interface AdminSession {
  userId:      string;
  email:       string;
  name:        string;
  role:        AdminUser['role'];
  expiresAt:   string;         // ISO 8601 — 24h from login in demo
}
```

---

## 9. App Settings Interface

```typescript
export interface AppSettings {
  // Brand (overrides for multi-tenant future)
  brandName:   string;
  tagline:     string;
  phone:       string;
  whatsapp:    string;
  email:       string;
  facebook:    string;
  tiktok:      string;
  
  // Feature flags
  showVehicleListings: boolean;
  showBusinessListings: boolean;
  enableNepalLanguage:  boolean;
  
  // SEO
  defaultMetaTitle:    string;
  defaultMetaDesc:     string;
  
  // Pagination
  listingsPerPage:     number;   // Default: 12
  
  updatedAt:   string;
}
```

---

## 10. Filter / Query Interfaces

```typescript
export interface ListingFilters {
  type?:        ListingType;
  categoryId?:  string;
  status?:      ListingStatus;
  priceType?:   PriceType;
  minPrice?:    number;
  maxPrice?:    number;
  province?:    string;
  district?:    string;
  municipality?: string;
  bedrooms?:    number;
  featured?:    boolean;
  hotDeal?:     boolean;
  search?:      string;         // Full-text search on title/description
}

export type ListingSortKey = 
  | 'createdAt-desc'            // Newest first (default)
  | 'createdAt-asc'
  | 'price-asc'
  | 'price-desc'
  | 'viewCount-desc'
  | 'featured-first';

export interface PaginatedResult<T> {
  data:        T[];
  total:       number;
  page:        number;
  pageSize:    number;
  totalPages:  number;
}
```

---

## 11. Supabase Migration Notes

When migrating from mock → Supabase:

| Interface | Supabase Table | Notes |
|-----------|---------------|-------|
| `Listing` | `listings` | JSONB column for `facilities`, array for `images` |
| `Category` | `categories` | Static seed data |
| `Inquiry` | `inquiries` | Add `user_id` FK when buyer auth added |
| `Message` | `messages` | Realtime subscriptions for live chat |
| `Deal` | `deals` | RLS: admin-only read/write |
| `AdminUser` | `profiles` | Extends Supabase `auth.users` |
| `AppSettings` | `settings` | Single-row table |

**Service layer contract is the same.** Only the implementation inside each service function changes — all function signatures, return types, and input interfaces stay identical.

---

*All interfaces are in `src/types/index.ts` as the single source. Import with: `import type { Listing, Inquiry } from '@/types';`*
