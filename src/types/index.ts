// ============================================================
// Himal Estates — TypeScript Types
// ============================================================

// ------------------------------------------------------------------
// ENUMS & UNIONS
// ------------------------------------------------------------------

export type ListingType = 'sale' | 'rent' | 'lease' | 'business' | 'wanted';

export type ListingCategory =
  | 'residential'
  | 'land'
  | 'commercial'
  | 'apartment'
  | 'house'
  | 'villa'
  | 'room'
  | 'office'
  | 'shop'
  | 'warehouse'
  | 'factory'
  | 'hotel'
  | 'restaurant'
  | 'agriculture'
  | 'business';

export type ListingStatus = 'active' | 'pending' | 'sold' | 'rented' | 'withdrawn' | 'rejected';

export type PriceType =
  | 'total'
  | 'perMonth'
  | 'perYear'
  | 'perRopani'
  | 'perAana'
  | 'perSqft'
  | 'negotiable';

export type AreaUnit =
  | 'ropani'
  | 'aana'
  | 'paisa'
  | 'dam'
  | 'sqft'
  | 'sqm'
  | 'bigha'
  | 'kattha'
  | 'dhur';

export type FacingDirection = 'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest';

export type PropertyCondition = 'new' | 'excellent' | 'good' | 'fair' | 'needs-renovation';

export type InquiryStatus = 'open' | 'contacted' | 'site-visited' | 'negotiating' | 'closed' | 'lost';

export type DealStatus = 'in-progress' | 'closed' | 'cancelled';

export type UserRole = 'admin' | 'agent' | 'owner';

// ------------------------------------------------------------------
// LOCATION
// ------------------------------------------------------------------

export interface Location {
  province: string;
  district: string;
  city: string;
  tole?: string;        // local neighborhood/tole
  landmark?: string;
  mapLat?: number;
  mapLng?: number;
  fullAddress?: string;
}

// ------------------------------------------------------------------
// LISTING
// ------------------------------------------------------------------

export interface ListingImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ListingFacilities {
  water: boolean;
  electricity: boolean;
  drainage: boolean;
  internet: boolean;
  garden: boolean;
  garage: boolean;
  lift: boolean;
  security: boolean;
  cctv: boolean;
  solar: boolean;
  generator: boolean;
  gym: boolean;
  pool: boolean;
  templeNearby: boolean;
  schoolNearby: boolean;
  hospitalNearby: boolean;
  marketNearby: boolean;
}

export interface Listing {
  id: string;
  title: string;
  titleNe?: string;         // Nepali title
  slug: string;
  type: ListingType;
  category: ListingCategory;
  status: ListingStatus;

  // Price
  price: number;
  priceType: PriceType;
  priceNegotiable: boolean;

  // Area
  area: number;
  areaUnit: AreaUnit;
  builtUpArea?: number;     // sq.ft for buildings
  landArea?: number;        // for land listings

  // Location
  location: Location;

  // Property details
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  totalFloors?: number;
  parkingSpaces?: number;
  roadWidth?: number;       // in feet
  roadType?: 'pitched' | 'graveled' | 'earthen';
  facing?: FacingDirection;
  condition?: PropertyCondition;
  builtYear?: number;

  // Content
  description: string;
  descriptionNe?: string;   // Nepali description
  highlights?: string[];    // key selling points

  // Media
  images: ListingImage[];

  // Facilities
  facilities: Partial<ListingFacilities>;

  // Admin / Meta
  featured: boolean;
  hotDeal: boolean;
  hotDealExpiresAt?: string;
  verified: boolean;
  viewCount: number;
  inquiryCount: number;

  // Contact override (if different from admin)
  contactName?: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  contactEmail?: string;

  // Relations
  postedById: string;       // User.id
  agentId?: string;         // Agent.id if assigned

  // Timestamps
  createdAt: string;        // ISO 8601
  updatedAt: string;
  publishedAt?: string;
}

// ------------------------------------------------------------------
// CATEGORY
// ------------------------------------------------------------------

export interface Category {
  id: string;
  key: ListingCategory;
  label: string;
  labelNe: string;
  icon: string;             // lucide-react icon name
  listingCount: number;
  description?: string;
  image?: string;
  order: number;
}

// ------------------------------------------------------------------
// INQUIRY / LEAD
// ------------------------------------------------------------------

export interface Inquiry {
  id: string;
  listingId: string;
  listingTitle: string;     // denormalized for display

  // Buyer info
  name: string;
  phone: string;
  email?: string;
  message: string;

  // Status & tracking
  status: InquiryStatus;
  source: 'website' | 'whatsapp' | 'phone' | 'facebook' | 'walk-in';
  notes?: string;           // admin notes

  // Timestamps
  createdAt: string;
  updatedAt: string;
  followUpAt?: string;      // scheduled follow-up
  closedAt?: string;
}

// ------------------------------------------------------------------
// MESSAGE (contact form / chat)
// ------------------------------------------------------------------

export interface Message {
  id: string;
  fromName: string;
  fromPhone: string;
  fromEmail?: string;
  subject: string;
  body: string;
  isRead: boolean;
  isReplied: boolean;
  replyBody?: string;
  createdAt: string;
  repliedAt?: string;
}

export interface InboxMessage {
  id: string;
  sender: 'client' | 'agent';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  listingPriceType?: PriceType;
  listingImage: string;
  listingLocation: string;
  listingSlug: string;
  agentName: string;
  agentPhone: string;
  agentRole: string;
  messages: InboxMessage[];
  unreadCount: number;
  updatedAt: string;
}

// ------------------------------------------------------------------
// DEAL / COMMISSION
// ------------------------------------------------------------------

export interface Deal {
  id: string;
  listingId: string;
  listingTitle: string;     // denormalized
  listingCategory: ListingCategory;

  // Parties
  buyerName: string;
  buyerPhone: string;
  sellerName: string;
  sellerPhone: string;

  // Financials (NPR)
  agreedPrice: number;
  commissionRate: number;   // percentage e.g. 1.5
  commissionAmount: number; // calculated
  commissionPaid: number;
  commissionDue: number;    // calculated

  // Status
  status: DealStatus;
  closedAt?: string;

  // Documents
  deedNumber?: string;
  registrationOffice?: string;
  registrationDate?: string;

  notes?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// ------------------------------------------------------------------
// USER / ADMIN
// ------------------------------------------------------------------

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  avatar?: string;

  // For agents/owners
  agency?: string;
  bio?: string;
  licenseNumber?: string;
  verifiedAgent: boolean;

  // Stats
  listingsCount: number;
  dealsCount: number;
  rating?: number;          // 1-5

  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

// ------------------------------------------------------------------
// APP SETTINGS
// ------------------------------------------------------------------

export interface AppSettings {
  id: string;
  siteName: string;
  tagline: string;
  taglineNe: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  tiktok: string;
  instagram: string;
  youtube: string;

  // Feature flags
  enableChat: boolean;
  enableMap: boolean;
  enableLanguageToggle: boolean;
  enableCommissionTracking: boolean;

  // Defaults
  defaultCommissionRate: number;
  listingsPerPage: number;
  featuredListingsCount: number;

  // SEO
  metaDescription: string;
  metaKeywords: string;
  googleAnalyticsId?: string;

  updatedAt: string;
}

// ------------------------------------------------------------------
// PAGINATION
// ------------------------------------------------------------------

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ------------------------------------------------------------------
// FILTER / SEARCH
// ------------------------------------------------------------------

export interface ListingFilters {
  type?: ListingType;
  category?: ListingCategory;
  status?: ListingStatus;
  province?: string;
  district?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  areaUnit?: AreaUnit;
  bedrooms?: number;
  bathrooms?: number;
  featured?: boolean;
  hotDeal?: boolean;
  search?: string;
  sortBy?: 'newest' | 'priceAsc' | 'priceDesc' | 'featured' | 'mostViewed';
  page?: number;
  pageSize?: number;
}
