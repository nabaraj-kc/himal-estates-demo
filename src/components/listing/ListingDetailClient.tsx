'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listing/ListingCard';
import { ListingMap } from '@/components/listing/ListingMap';
import { CallModal } from '@/components/chat/CallModal';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { getListingById, getListings, createInquiry, toggleFavoriteId, getFavoriteIds } from '@/lib/storage';
import { Listing } from '@/types';
import { formatNPR } from '@/lib/utils';
import { brand } from '@/config/brand';
import { useLanguage } from '@/context/LanguageContext';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Flame,
  Star,
  Share2,
  Heart,
  Phone,
  MessageSquare,
  ArrowLeft,
  X,
  Droplets,
  Zap,
  Wifi,
  Car,
  Trees,
  Sun,
  Shield,
  Send,
} from 'lucide-react';

export function ListingDetailClient({ slug }: { slug: string }) {
  const { isNepali } = useLanguage();

  const [listing, setListing] = useState<Listing | null>(null);
  const [similarListings, setSimilarListings] = useState<Listing[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Inquiry Form state
  const [inqName, setInqName] = useState('');
  const [inqPhone, setInqPhone] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqMessage, setInqMessage] = useState('');
  const [inqSubmitted, setInqSubmitted] = useState(false);
  const [inqLoading, setInqLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const item = getListingById(slug);
    if (item) {
      setListing(item);
      const all = getListings();
      const similar = all.filter(
        (l) => l.id !== item.id && (l.category === item.category || l.type === item.type)
      ).slice(0, 3);
      setSimilarListings(similar);

      const favs = getFavoriteIds();
      setIsSaved(favs.includes(item.id));
    }
  }, [slug]);

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#0F0F0F]">Property Not Found</h2>
            <p className="text-xs text-[#71717A] mt-2">The property listing you are looking for may have been rented, sold or moved.</p>
            <Link href="/listings" className="mt-4 inline-block px-4 py-2 rounded-xl bg-[#0F0F0F] text-white text-xs font-semibold hover:bg-[#27272A]">
              Browse All Listings
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleFavorite = () => {
    const newState = toggleFavoriteId(listing.id);
    setIsSaved(newState);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: `Check out this property on Himal Estates: ${listing.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Property link copied to clipboard!');
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inqName || !inqPhone) return;

    setInqLoading(true);
    setTimeout(() => {
      createInquiry({
        listingId: listing.id,
        listingTitle: listing.title,
        name: inqName,
        phone: inqPhone,
        email: inqEmail,
        message: inqMessage || `Interested in viewing: ${listing.title}`,
        source: 'website',
      });
      setInqLoading(false);
      setInqSubmitted(true);
    }, 600);
  };

  const whatsappUrl = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    `Namaste Himal Estates, I would like to schedule an inspection for: "${listing.title}" (ID: ${listing.id}, Price: ${formatNPR(
      listing.price
    )}). When is the broker available?`
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3">
          <Link
            href="/listings"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#71717A] hover:text-[#0F0F0F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isNepali ? 'सबै सूचीहरूमा फर्कनुहोस्' : 'Back to Listings'}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFavorite}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isSaved
                  ? 'bg-[#F5F5F7] border-[#E5E5E5] text-[#EF4444]'
                  : 'bg-white border-[#E5E5E5] text-[#0F0F0F] hover:bg-[#F5F5F7]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#EF4444] text-[#EF4444]' : 'text-[#71717A]'}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E5E5] bg-white text-[#0F0F0F] hover:bg-[#F5F5F7] text-xs font-semibold transition-colors"
            >
              <Share2 className="w-4 h-4 text-[#71717A]" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Title & Badges Bar */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#0F0F0F] text-white text-[11px] font-semibold uppercase tracking-wider">
              {listing.type === 'rent'
                ? isNepali ? 'भाडामा' : 'For Rent'
                : listing.type === 'sale'
                ? isNepali ? 'बिक्रीमा' : 'For Sale'
                : 'Business'}
            </span>

            {listing.hotDeal && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F] text-[11px] font-semibold">
                <Flame className="w-3.5 h-3.5" />
                <span>{isNepali ? 'हट डिल' : 'Hot Deal'}</span>
              </span>
            )}

            {listing.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F] text-[11px] font-semibold">
                <Star className="w-3.5 h-3.5" />
                <span>{isNepali ? 'विशेष' : 'Featured'}</span>
              </span>
            )}

            {listing.verified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F] text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isNepali ? 'स्थलगत प्रमाणित' : 'Site Verified'}</span>
              </span>
            )}
          </div>

          <h1 className="font-extrabold text-2xl sm:text-3xl text-[#0F0F0F] tracking-tight">
            {isNepali && listing.titleNe ? listing.titleNe : listing.title}
          </h1>

          <div className="flex items-center gap-2 text-[#71717A] text-xs sm:text-sm mt-1.5">
            <MapPin className="w-4 h-4 text-[#0F0F0F] flex-shrink-0" />
            <span>
              {listing.location.fullAddress ||
                `${listing.location.tole || ''}, ${listing.location.city || ''}, ${listing.location.district}`}
            </span>
            {listing.location.landmark && (
              <span className="text-[#71717A]">• Landmark: {listing.location.landmark}</span>
            )}
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden mb-8 max-h-[460px]">
          {/* Main Hero Photo (2 cols) */}
          <div
            onClick={() => {
              setActivePhotoIdx(0);
              setLightboxOpen(true);
            }}
            className="md:col-span-2 relative h-[280px] sm:h-[460px] cursor-pointer overflow-hidden group"
          >
            <img
              src={listing.images[0]?.url}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors"></div>
          </div>

          {/* Secondary Photos (2 cols stacked) */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3 h-[460px]">
            {listing.images.slice(1, 5).map((img, idx) => (
              <div
                key={img.id}
                onClick={() => {
                  setActivePhotoIdx(idx + 1);
                  setLightboxOpen(true);
                }}
                className="relative h-[224px] cursor-pointer overflow-hidden group rounded-xl"
              >
                <img
                  src={img.url}
                  alt={img.alt || listing.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {idx === 3 && listing.images.length > 5 && (
                  <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center text-white font-bold text-sm">
                    +{listing.images.length - 4} More Photos
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in">
            <div className="w-full flex items-center justify-between text-white text-xs">
              <span className="font-semibold">
                Photo {activePhotoIdx + 1} of {listing.images.length}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative max-w-4xl max-h-[75vh] w-full flex items-center justify-center">
              <img
                src={listing.images[activePhotoIdx]?.url}
                alt="Fullscreen view"
                className="max-h-[72vh] max-w-full object-contain rounded-2xl"
              />
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center gap-2 overflow-x-auto p-2 no-scrollbar">
              {listing.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activePhotoIdx === idx ? 'border-[#0F0F0F] scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img.url} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Details Grid (Left Content + Right Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Details (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Key Facts Ribbon */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E5E5E5] gap-4">
                <div>
                  <span className="text-[11px] font-bold text-[#71717A] uppercase tracking-wider">
                    {isNepali ? 'मूल्य' : 'Price / Valuation'}
                  </span>
                  <div className="font-extrabold text-3xl sm:text-4xl text-[#0F0F0F] mt-1">
                    {formatNPR(listing.price)}
                    {listing.priceType === 'perMonth' && (
                      <span className="text-sm font-normal text-[#71717A] ml-1">/month</span>
                    )}
                    {listing.priceType === 'perAana' && (
                      <span className="text-sm font-normal text-[#71717A] ml-1">/aana</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F] text-xs font-semibold">
                    {listing.priceNegotiable
                      ? isNepali ? 'मुल्यमा छलफल हुन सक्ने' : 'Negotiable'
                      : 'Fixed Price'}
                  </span>
                </div>
              </div>

              {/* Grid of Key Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5]">
                  <span className="text-[#71717A] block text-[11px] mb-1">Area / Size</span>
                  <div className="font-bold text-[#0F0F0F] flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-[#0F0F0F]" />
                    <span>{listing.area} {listing.areaUnit}</span>
                  </div>
                </div>

                {listing.bedrooms !== undefined && (
                  <div className="p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5]">
                    <span className="text-[#71717A] block text-[11px] mb-1">Bedrooms</span>
                    <div className="font-bold text-[#0F0F0F] flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-[#0F0F0F]" />
                      <span>{listing.bedrooms} Beds</span>
                    </div>
                  </div>
                )}

                {listing.bathrooms !== undefined && (
                  <div className="p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5]">
                    <span className="text-[#71717A] block text-[11px] mb-1">Bathrooms</span>
                    <div className="font-bold text-[#0F0F0F] flex items-center gap-1.5">
                      <Bath className="w-4 h-4 text-[#0F0F0F]" />
                      <span>{listing.bathrooms} Baths</span>
                    </div>
                  </div>
                )}

                {listing.facing && (
                  <div className="p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5]">
                    <span className="text-[#71717A] block text-[11px] mb-1">Facing</span>
                    <div className="font-bold text-[#0F0F0F] flex items-center gap-1.5 capitalize">
                      <Compass className="w-4 h-4 text-[#0F0F0F]" />
                      <span>{listing.facing}</span>
                    </div>
                  </div>
                )}

                {listing.roadWidth && (
                  <div className="p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5]">
                    <span className="text-[#71717A] block text-[11px] mb-1">Road Access</span>
                    <div className="font-bold text-[#0F0F0F]">
                      {listing.roadWidth} ft ({listing.roadType || 'pitched'})
                    </div>
                  </div>
                )}

                {listing.condition && (
                  <div className="p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5]">
                    <span className="text-[#71717A] block text-[11px] mb-1">Condition</span>
                    <div className="font-bold text-[#0F0F0F] capitalize">
                      {listing.condition}
                    </div>
                  </div>
                )}

                {listing.builtYear && (
                  <div className="p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5]">
                    <span className="text-[#71717A] block text-[11px] mb-1">Built Year</span>
                    <div className="font-bold text-[#0F0F0F]">
                      {listing.builtYear} A.D.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] space-y-4">
              <h3 className="font-bold text-lg text-[#0F0F0F]">
                {isNepali ? 'सम्पत्ति विवरण' : 'About This Property'}
              </h3>

              <p className="text-sm text-[#0F0F0F] leading-relaxed">
                {listing.description}
              </p>

              {listing.descriptionNe && (
                <div className="p-4 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-sm text-[#0F0F0F] leading-relaxed">
                  <span className="font-bold text-xs text-[#0F0F0F] block mb-1">नेपाली विवरण:</span>
                  {listing.descriptionNe}
                </div>
              )}

              {/* Highlights */}
              {listing.highlights && listing.highlights.length > 0 && (
                <div className="pt-4 border-t border-[#E5E5E5]">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#71717A] mb-3">
                    {isNepali ? 'प्रमुख आकर्षणहरू' : 'Key Highlights'}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    {listing.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[#0F0F0F]">
                        <CheckCircle2 className="w-4 h-4 text-[#0F0F0F] flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Facilities & Amenities */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
              <h3 className="font-bold text-lg text-[#0F0F0F] mb-4">
                {isNepali ? 'उपलब्ध सुविधाहरू' : 'Facilities & Amenities'}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                {listing.facilities?.water && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F]">
                    <Droplets className="w-4 h-4 text-[#0F0F0F]" />
                    <span>24/7 Water Supply</span>
                  </div>
                )}
                {listing.facilities?.electricity && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F]">
                    <Zap className="w-4 h-4 text-[#0F0F0F]" />
                    <span>Electricity / Sub-meter</span>
                  </div>
                )}
                {listing.facilities?.internet && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F]">
                    <Wifi className="w-4 h-4 text-[#0F0F0F]" />
                    <span>High-Speed Fiber Net</span>
                  </div>
                )}
                {listing.facilities?.solar && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F]">
                    <Sun className="w-4 h-4 text-[#0F0F0F]" />
                    <span>Solar Water Heating</span>
                  </div>
                )}
                {listing.facilities?.garage && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F]">
                    <Car className="w-4 h-4 text-[#0F0F0F]" />
                    <span>Parking Space</span>
                  </div>
                )}
                {listing.facilities?.garden && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F]">
                    <Trees className="w-4 h-4 text-[#0F0F0F]" />
                    <span>Private Garden / Lawn</span>
                  </div>
                )}
                {listing.facilities?.security && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F]">
                    <Shield className="w-4 h-4 text-[#0F0F0F]" />
                    <span>24/7 Security & CCTV</span>
                  </div>
                )}
                {listing.facilities?.lift && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F]">
                    <CheckCircle2 className="w-4 h-4 text-[#0F0F0F]" />
                    <span>Elevator / Lift</span>
                  </div>
                )}
              </div>
            </div>

            {/* Location Map Section */}
            {listing.location.mapLat && listing.location.mapLng && (
              <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-[#0F0F0F]">
                    {isNepali ? 'नक्सामा स्थान' : 'Property Location'}
                  </h3>
                  <span className="text-xs text-[#71717A]">OpenStreetMap</span>
                </div>
                <div className="h-[340px] rounded-xl overflow-hidden border border-[#E5E5E5]">
                  <ListingMap
                    listings={[listing]}
                    center={[listing.location.mapLat, listing.location.mapLng]}
                    zoom={15}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Contact & Middleman Action Bar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Middleman Authority Box */}
            <div className="bg-white rounded-2xl p-5 border border-[#E5E5E5] sticky top-24">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E5E5E5]">
                <div className="w-11 h-11 rounded-xl bg-[#0F0F0F] text-white font-bold flex items-center justify-center text-sm">
                  HE
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0F0F0F]">
                    Himal Estates Advisory
                  </h4>
                  <p className="text-xs text-[#71717A] flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0F0F0F]" />
                    <span>Verified Broker Advisor</span>
                  </p>
                </div>
              </div>

              {/* Direct Actions: Message Agent & Call Agent */}
              <div className="py-4 space-y-2">
                <Link
                  href={`/inbox?listingId=${listing.id}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0F0F0F] hover:bg-[#27272A] text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isNepali ? 'एजेन्टलाई सन्देश पठाउनुहोस्' : 'Message Agent'}</span>
                </Link>

                <a
                  href={`tel:${brand.mobile}`}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] hover:bg-[#E5E5E5] text-[#0F0F0F] font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-[#0F0F0F]" />
                  <span>{isNepali ? 'एजेन्टलाई सिधै कल गर्नुहोस्' : 'Call Agent'}</span>
                </a>
              </div>

              {/* Inquiry Form */}
              <div className="pt-4 border-t border-[#E5E5E5]">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#71717A] mb-3">
                  {isNepali ? 'स्थलगत भ्रमणको लागि सोधपुछ' : 'Request Site Inspection'}
                </h4>

                {inqSubmitted ? (
                  <div className="p-4 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] text-xs space-y-1.5 border border-[#E5E5E5]">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#0F0F0F]">
                      <CheckCircle2 className="w-4 h-4 text-[#0F0F0F]" />
                      <span>Inquiry Sent Successfully!</span>
                    </div>
                    <p className="text-[#71717A]">Our advisory broker will reach out to you within 15 minutes.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        required
                        value={inqName}
                        onChange={(e) => setInqName(e.target.value)}
                        placeholder="Your Full Name"
                        className="w-full px-3 py-2 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        value={inqPhone}
                        onChange={(e) => setInqPhone(e.target.value)}
                        placeholder="Phone or WhatsApp (98XXXXXXXX)"
                        className="w-full px-3 py-2 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        value={inqMessage}
                        onChange={(e) => setInqMessage(e.target.value)}
                        placeholder="Preferred date/time for visit or specific questions..."
                        className="w-full px-3 py-2 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={inqLoading}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0F0F0F] hover:bg-[#27272A] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{inqLoading ? 'Submitting...' : 'Send Inquiry to Broker'}</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Middleman Trust Seal */}
              <div className="mt-4 p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-[11px] text-[#71717A] space-y-1">
                <div className="flex items-center gap-1 font-semibold text-[#0F0F0F]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F0F0F]" />
                  <span>Himal Estates Guarantee</span>
                </div>
                <p>Transparent 2% brokerage rate upon deal completion. Full title deed & boundary check support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Listings Grid (Dense Hamrobazar layout) */}
        {similarListings.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-bold text-base sm:text-lg text-[#111827] mb-4">
              {isNepali ? 'सम्बन्धित अन्य सम्पत्तिहरू' : 'Similar Properties in Nepal'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {similarListings.map((sim) => (
                <ListingCard key={sim.id} listing={sim} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
