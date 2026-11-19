import { Listing, Inquiry, Deal, Conversation, InboxMessage, AppNotification } from '@/types';
import { mockListings, mockCategories } from '@/data/mock-listings';
import { mockInquiries, mockDeals, mockSellerSubmissions, SellerSubmission } from '@/data/mock-admin-data';
import { mockConversations } from '@/data/mock-inbox-data';
import { brand } from '@/config/brand';

const STORAGE_KEYS = {
  LISTINGS: 'himal_estates_listings_v1',
  INQUIRIES: 'himal_estates_inquiries_v1',
  DEALS: 'himal_estates_deals_v1',
  SUBMISSIONS: 'himal_estates_submissions_v1',
  FAVORITES: 'himal_estates_favorites_v1',
  CONVERSATIONS: 'himal_estates_conversations_v1',
  NOTIFICATIONS: 'himal_estates_notifications_v1',
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
// CONVERSATIONS / INBOX SERVICE
// -------------------------------------------------------------

export function getConversations(): Conversation[] {
  return getItem<Conversation[]>(STORAGE_KEYS.CONVERSATIONS, mockConversations);
}

export function getConversationById(id: string): Conversation | undefined {
  const convs = getConversations();
  return convs.find((c) => c.id === id);
}

export function getTotalUnreadCount(): number {
  const convs = getConversations();
  return convs.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
}

export function getOrCreateConversationForListing(listingId: string): Conversation {
  const convs = getConversations();
  const existing = convs.find((c) => c.listingId === listingId);
  if (existing) return existing;

  const listing = getListingById(listingId);
  const newConv: Conversation = {
    id: `conv-${listingId}-${Date.now()}`,
    listingId: listing?.id || listingId,
    listingTitle: listing?.title || 'Property Inquiry',
    listingPrice: listing?.price || 0,
    listingPriceType: listing?.priceType || 'total',
    listingImage:
      listing?.images?.[0]?.url ||
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    listingLocation: listing?.location
      ? `${listing.location.tole ? `${listing.location.tole}, ` : ''}${listing.location.city || listing.location.district}`
      : 'Kathmandu Valley',
    listingSlug: listing?.slug || listing?.id || listingId,
    agentName: 'Suman Shrestha',
    agentPhone: brand.mobile,
    agentRole: 'Assigned Senior Broker',
    unreadCount: 0,
    updatedAt: new Date().toISOString(),
    messages: [
      {
        id: `m-init-${Date.now()}`,
        sender: 'agent',
        text: `Namaste! I am your assigned advisor for "${listing?.title || 'this property'}". Feel free to ask about legal verification, road width, site visit timing, or pricing!`,
        timestamp: new Date().toISOString(),
      },
    ],
  };

  const updated = [newConv, ...convs];
  setItem(STORAGE_KEYS.CONVERSATIONS, updated);
  if (isClient()) {
    window.dispatchEvent(new CustomEvent('himal_conversations_changed'));
  }
  return newConv;
}

export function sendMessageToConversation(
  conversationId: string,
  text: string,
  sender: 'client' | 'agent' = 'client'
): Conversation | undefined {
  const convs = getConversations();
  const index = convs.findIndex((c) => c.id === conversationId);
  if (index === -1) return undefined;

  const newMsg: InboxMessage = {
    id: `m-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    sender,
    text,
    timestamp: new Date().toISOString(),
  };

  const current = convs[index];
  const updatedMessages = [...current.messages, newMsg];
  const updatedConv: Conversation = {
    ...current,
    messages: updatedMessages,
    unreadCount: sender === 'agent' ? (current.unreadCount || 0) + 1 : 0,
    updatedAt: new Date().toISOString(),
  };

  // Move active conversation to top of list
  const nextConvs = [updatedConv, ...convs.filter((c) => c.id !== conversationId)];
  setItem(STORAGE_KEYS.CONVERSATIONS, nextConvs);
  if (isClient()) {
    window.dispatchEvent(new CustomEvent('himal_conversations_changed'));
  }
  return updatedConv;
}

export function markConversationRead(conversationId: string): void {
  const convs = getConversations();
  const index = convs.findIndex((c) => c.id === conversationId);
  if (index === -1) return;

  if (convs[index].unreadCount > 0) {
    convs[index] = {
      ...convs[index],
      unreadCount: 0,
    };
    setItem(STORAGE_KEYS.CONVERSATIONS, convs);
    if (isClient()) {
      window.dispatchEvent(new CustomEvent('himal_conversations_changed'));
    }
  }
}

// -------------------------------------------------------------
// NOTIFICATIONS SERVICE
// -------------------------------------------------------------

const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'price_drop',
    title: 'Price Drop on Saved Flat',
    titleNe: 'सुरक्षित फ्ल्याटको मूल्य घट्यो',
    description: '2BHK in Lazimpat has dropped to NPR 45,000/month (previously NPR 50,000).',
    descriptionNe: 'लाजिम्पाटको २ बीएचके फ्ल्याटको भाडा घटेर रु ४५,०००/महिना भएको छ।',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    isRead: false,
    linkUrl: '/listings/spacious-2bhk-flat-lazimpat',
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'New Reply from Broker Suman',
    titleNe: 'ब्रोकर सुमनबाट नयाँ सन्देश',
    description: '“The landlord is available tomorrow at 3:30 PM for on-site visit...”',
    descriptionNe: '“घरधनी भोलि दिउँसो ३:३० बजे स्थलगत भ्रमणको लागि उपलब्ध हुनुहुन्छ...”',
    timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
    isRead: false,
    linkUrl: '/inbox',
  },
  {
    id: 'notif-3',
    type: 'approval',
    title: 'Lalpurja & Napi Check Completed',
    titleNe: 'लालपुर्जा तथा नापी नक्सा प्रमाणित',
    description: '4 Aana Land in Tikathali Imadol has passed 100% legal encumbrance audit.',
    descriptionNe: 'टिकाथली इमाडोलको ४ आना घडेरी १००% कानुनी रोक्कामुक्त प्रमाणित भएको छ।',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    isRead: true,
    linkUrl: '/listings/prime-4-aana-residential-plot-imadol',
  },
];

export function getNotifications(): AppNotification[] {
  return getItem<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
}

export function getUnreadNotificationsCount(): number {
  const notifs = getNotifications();
  return notifs.filter((n) => !n.isRead).length;
}

export function markNotificationRead(id: string): void {
  const notifs = getNotifications();
  const index = notifs.findIndex((n) => n.id === id);
  if (index === -1) return;

  notifs[index].isRead = true;
  setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
  if (isClient()) {
    window.dispatchEvent(new CustomEvent('himal_notifications_changed'));
  }
}

export function markAllNotificationsRead(): void {
  const notifs = getNotifications().map((n) => ({ ...n, isRead: true }));
  setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
  if (isClient()) {
    window.dispatchEvent(new CustomEvent('himal_notifications_changed'));
  }
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
  localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(mockConversations));
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initialNotifications));
  window.dispatchEvent(new CustomEvent('himal_data_reset'));
  window.dispatchEvent(new CustomEvent('himal_conversations_changed'));
  window.dispatchEvent(new CustomEvent('himal_notifications_changed'));
}
