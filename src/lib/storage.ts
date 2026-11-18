import { Listing, Inquiry, Deal } from '@/types';
import { mockListings, mockCategories } from '@/data/mock-listings';
import { mockInquiries, mockDeals, mockSellerSubmissions, SellerSubmission } from '@/data/mock-admin-data';

const STORAGE_KEYS = {
  LISTINGS: 'himal_estates_listings_v1',
  INQUIRIES: 'himal_estates_inquiries_v1',
  DEALS: 'himal_estates_deals_v1',
  SUBMISSIONS: 'himal_estates_submissions_v1',
  FAVORITES: 'himal_estates_favorites_v1',
  LANGUAGE: 'himal_estates_language_v1',
} as const;

// Helper to safely access localStorage (client-side only)
function isClient(): boolean {
  return typeof window !== 'undefined';
}

function getItem<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

// -------------------------------------------------------------
// LISTINGS SERVICE
// -------------------------------------------------------------

export function getListings(): Listing[] {
  return getItem<Listing[]>(STORAGE_KEYS.LISTINGS, mockListings);
}

export function getListingById(id: string): Listing | undefined {
  const listings = getListings();
  return listings.find((l) => l.id === id || l.slug === id);
}

export function getFeaturedListings(): Listing[] {
  return getListings().filter((l) => l.featured && l.status === 'active');
}

export function getHotDeals(): Listing[] {
  return getListings().filter((l) => l.hotDeal && l.status === 'active');
}

export function createListing(listingData: Omit<Listing, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'inquiryCount'>): Listing {
  const listings = getListings();
  const newListing: Listing = {
    ...listingData,
    id: `list-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: 1,
    inquiryCount: 0,
  };
  const updated = [newListing, ...listings];
  setItem(STORAGE_KEYS.LISTINGS, updated);
  return newListing;
}

export function updateListing(id: string, updates: Partial<Listing>): Listing | undefined {
  const listings = getListings();
  const index = listings.findIndex((l) => l.id === id);
  if (index === -1) return undefined;

  listings[index] = {
    ...listings[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  setItem(STORAGE_KEYS.LISTINGS, listings);
  return listings[index];
}

export function deleteListing(id: string): boolean {
  const listings = getListings();
  const filtered = listings.filter((l) => l.id !== id);
  if (filtered.length === listings.length) return false;
  setItem(STORAGE_KEYS.LISTINGS, filtered);
  return true;
}

// -------------------------------------------------------------
// INQUIRIES / LEADS SERVICE
// -------------------------------------------------------------

export function getInquiries(): Inquiry[] {
  return getItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, mockInquiries);
}

export function createInquiry(data: {
  listingId: string;
  listingTitle: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  source?: 'website' | 'whatsapp' | 'phone';
}): Inquiry {
  const inquiries = getInquiries();
  const newInq: Inquiry = {
    id: `inq-${Date.now()}`,
    listingId: data.listingId,
    listingTitle: data.listingTitle,
    name: data.name,
    phone: data.phone,
    email: data.email,
    message: data.message,
    status: 'open',
    source: data.source || 'website',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated = [newInq, ...inquiries];
  setItem(STORAGE_KEYS.INQUIRIES, updated);

  // Also increment inquiry count on listing
  const listings = getListings();
  const listing = listings.find((l) => l.id === data.listingId);
  if (listing) {
    updateListing(listing.id, { inquiryCount: (listing.inquiryCount || 0) + 1 });
  }

  return newInq;
}

export function updateInquiryStatus(id: string, status: Inquiry['status'], notes?: string): Inquiry | undefined {
  const inquiries = getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);
  if (index === -1) return undefined;

  inquiries[index] = {
    ...inquiries[index],
    status,
    notes: notes !== undefined ? notes : inquiries[index].notes,
    updatedAt: new Date().toISOString(),
  };
  setItem(STORAGE_KEYS.INQUIRIES, inquiries);
  return inquiries[index];
}

// -------------------------------------------------------------
// SELLER SUBMISSIONS SERVICE
// -------------------------------------------------------------

export function getSellerSubmissions(): SellerSubmission[] {
  return getItem<SellerSubmission[]>(STORAGE_KEYS.SUBMISSIONS, mockSellerSubmissions);
}

export function createSellerSubmission(data: Omit<SellerSubmission, 'id' | 'status' | 'submittedAt'>): SellerSubmission {
  const submissions = getSellerSubmissions();
  const newSub: SellerSubmission = {
    ...data,
    id: `sub-${Date.now()}`,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };
  const updated = [newSub, ...submissions];
  setItem(STORAGE_KEYS.SUBMISSIONS, updated);
  return newSub;
}

export function approveSellerSubmission(id: string): Listing | undefined {
  const submissions = getSellerSubmissions();
  const sub = submissions.find((s) => s.id === id);
  if (!sub) return undefined;

  // Mark submission approved
  sub.status = 'approved';
  setItem(STORAGE_KEYS.SUBMISSIONS, submissions);

  // Create new active listing
  const newListing = createListing({
    title: sub.title,
    titleNe: sub.title,
    slug: sub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    type: sub.type,
    category: (sub.category as any) || 'apartment',
    status: 'active',
    price: sub.price,
    priceType: (sub.priceType as any) || 'total',
    priceNegotiable: true,
    area: 1,
    areaUnit: 'aana',
    location: {
      province: 'Bagmati',
      district: 'Kathmandu',
      city: 'Kathmandu',
      fullAddress: sub.location,
    },
    description: sub.description,
    descriptionNe: sub.description,
    highlights: ['Owner Direct Submission', 'Verified by Himal Estates'],
    images: sub.images.map((url, idx) => ({
      id: `img-sub-${Date.now()}-${idx}`,
      url,
      alt: sub.title,
      isPrimary: idx === 0,
      order: idx + 1,
    })),
    facilities: { water: true, electricity: true, drainage: true, internet: true },
    featured: false,
    hotDeal: true,
    verified: true,
    postedById: 'owner-submission',
    contactName: sub.ownerName,
    contactPhone: sub.ownerPhone,
    contactEmail: sub.ownerEmail,
  });

  return newListing;
}

export function rejectSellerSubmission(id: string): boolean {
  const submissions = getSellerSubmissions();
  const sub = submissions.find((s) => s.id === id);
  if (!sub) return false;
  sub.status = 'rejected';
  setItem(STORAGE_KEYS.SUBMISSIONS, submissions);
  return true;
}

// -------------------------------------------------------------
// DEALS & COMMISSION TRACKER SERVICE
// -------------------------------------------------------------

export function getDeals(): Deal[] {
  return getItem<Deal[]>(STORAGE_KEYS.DEALS, mockDeals);
}

export function createDeal(dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Deal {
  const deals = getDeals();
  const newDeal: Deal = {
    ...dealData,
    id: `deal-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const updated = [newDeal, ...deals];
  setItem(STORAGE_KEYS.DEALS, updated);
  return newDeal;
}

export function getCommissionSummary() {
  const deals = getDeals();
  const closedDeals = deals.filter((d) => d.status === 'closed');
  
  const totalDealValue = closedDeals.reduce((sum, d) => sum + (d.agreedPrice || 0), 0);
  const totalCommissionEarned = closedDeals.reduce((sum, d) => sum + (d.commissionAmount || 0), 0);
  const totalCommissionPaid = closedDeals.reduce((sum, d) => sum + (d.commissionPaid || 0), 0);
  const totalCommissionPending = deals
    .filter((d) => d.status === 'in-progress')
    .reduce((sum, d) => sum + (d.commissionDue || 0), 0);

  return {
    closedDealsCount: closedDeals.length,
    activeDealsCount: deals.filter((d) => d.status === 'in-progress').length,
    totalDealValue,
    totalCommissionEarned,
    totalCommissionPaid,
    totalCommissionPending,
  };
}

// -------------------------------------------------------------
// SAVED / FAVORITES SERVICE
// -------------------------------------------------------------

export function getFavoriteIds(): string[] {
  return getItem<string[]>(STORAGE_KEYS.FAVORITES, ['list-001', 'list-006']);
}

export function toggleFavoriteId(id: string): boolean {
  const favs = getFavoriteIds();
  let updated: string[];
  let isSaved = false;

  if (favs.includes(id)) {
    updated = favs.filter((f) => f !== id);
    isSaved = false;
  } else {
    updated = [...favs, id];
    isSaved = true;
  }

  setItem(STORAGE_KEYS.FAVORITES, updated);
  if (isClient()) {
    window.dispatchEvent(new CustomEvent('himal_favorites_changed', { detail: updated }));
  }
  return isSaved;
}

// -------------------------------------------------------------
// RESET ALL DEMO DATA
// -------------------------------------------------------------

export function resetDemoData(): void {
  if (!isClient()) return;
  localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(mockListings));
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(mockInquiries));
  localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(mockDeals));
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(mockSellerSubmissions));
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(['list-001', 'list-006']));
  window.dispatchEvent(new CustomEvent('himal_data_reset'));
}
