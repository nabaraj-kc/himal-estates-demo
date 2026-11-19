import { Conversation } from '@/types';
import { brand } from '@/config/brand';

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    listingId: 'list-001',
    listingTitle: 'Furnished 3BHK Apartment in Jhamsikhel (20 ft Pitched Road, 1 Car Parking)',
    listingPrice: 85000,
    listingPriceType: 'perMonth',
    listingImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    listingLocation: 'Jhamsikhel, Lalitpur',
    listingSlug: 'luxury-3bhk-furnished-apartment-jhamsikhel',
    agentName: 'Suman Shrestha',
    agentPhone: brand.mobile,
    agentRole: 'Lalitpur Advisory Lead',
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
    messages: [
      {
        id: 'm-1-1',
        sender: 'client',
        text: 'Namaste Suman ji, is this 3BHK in Jhamsikhel available for inspection this Friday?',
        timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
      },
      {
        id: 'm-1-2',
        sender: 'agent',
        text: 'Namaste! Yes, the keys are with us at Himal Estates. The landlord is available after 2 PM.',
        timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
      },
      {
        id: 'm-1-3',
        sender: 'client',
        text: 'Great, can we meet near St. Mary’s School around 3:30 PM?',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      },
      {
        id: 'm-1-4',
        sender: 'agent',
        text: 'Confirmed for 3:30 PM! I will meet you right opposite the school gate. You can also call me directly on mobile if needed.',
        timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      },
    ],
  },
  {
    id: 'conv-2',
    listingId: 'list-010',
    listingTitle: '4 Aana Residential Plot in Tikathali Imadol (East-Facing, 38 ft Mohada, 16 ft Road)',
    listingPrice: 3600000,
    listingPriceType: 'perAana',
    listingImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    listingLocation: 'Tikathali, Lalitpur',
    listingSlug: 'prime-4-aana-residential-plot-imadol',
    agentName: 'Pooja Thapa',
    agentPhone: brand.phone,
    agentRole: 'Land & Registry Specialist',
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    messages: [
      {
        id: 'm-2-1',
        sender: 'client',
        text: 'Hello Pooja, is the Lalpurja and Napi trace map verified for this Tikathali plot?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      },
      {
        id: 'm-2-2',
        sender: 'agent',
        text: 'Namaste! Yes, 100% verified. Clear single ownership, zero bank mortgage encumbrance, and 38 ft front mohada confirmed.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      },
    ],
  },
  {
    id: 'conv-3',
    listingId: 'list-007',
    listingTitle: 'Brand New 2.5 Storey House on 5.5 Aana in Budhanilkantha (East-Facing, 16 ft Road)',
    listingPrice: 39500000,
    listingPriceType: 'total',
    listingImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    listingLocation: 'Budhanilkantha, Kathmandu',
    listingSlug: 'brand-new-house-budhanilkantha',
    agentName: 'Bikash Adhikari',
    agentPhone: brand.mobile,
    agentRole: 'Residential Property Broker',
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // yesterday
    messages: [
      {
        id: 'm-3-1',
        sender: 'client',
        text: 'Is this house eligible for a bank loan from commercial banks?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      },
      {
        id: 'm-3-2',
        sender: 'agent',
        text: 'Yes! Municipal completion certificate (Nirman Sampanna) and approved structural drawings are ready for up to 70% bank finance.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
    ],
  },
];
