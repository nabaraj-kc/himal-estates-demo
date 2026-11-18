'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Listing } from '@/types';
import { formatNPR } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { getFavoriteIds, toggleFavoriteId } from '@/lib/storage';
import { brand } from '@/config/brand';
import {
  MapPin,
  Bed,
  Maximize2,
  Heart,
  ShieldCheck,
  Flame,
  Star,
  MessageCircle,
  Compass,
  Milestone,
} from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  priority?: boolean;
}

export function ListingCard({ listing, priority = false }: ListingCardProps) {
  const router = useRouter();
  const { isNepali } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const favs = getFavoriteIds();
    setIsSaved(favs.includes(listing.id));

    const handleFavChange = (e: any) => {
      if (e.detail) {
        setIsSaved(e.detail.includes(listing.id));
      }
    };
    window.addEventListener('himal_favorites_changed', handleFavChange);
    return () => window.removeEventListener('himal_favorites_changed', handleFavChange);
  }, [listing.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleFavoriteId(listing.id);
    setIsSaved(newState);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Prevent routing if user clicked an interactive child (a, button)
    if (target.closest('button, a')) {
      return;
    }
    router.push(`/listings/${listing.slug || listing.id}`);
  };

  const primaryImage =
    listing.images && listing.images.length > 0
      ? listing.images[0].url
      : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80';

  // Format Price label
  const renderPriceLabel = () => {
    const priceText = formatNPR(listing.price);
    if (listing.priceType === 'perMonth') {
      return (
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
            {priceText}
          </span>
          <span className="text-xs text-slate-500 font-normal">
            {isNepali ? '/महिना' : '/mo'}
          </span>
        </div>
      );
    }
    if (listing.priceType === 'perAana') {
      return (
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
            {priceText}
          </span>
          <span className="text-xs text-slate-500 font-normal">
            {isNepali ? '/आना' : '/aana'}
          </span>
        </div>
      );
    }
    return (
      <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
        {priceText}
      </span>
    );
  };

  // WhatsApp quick text
  const whatsappUrl = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    `Namaste Himal Estates, I am interested in: "${listing.title}" (ID: ${listing.id}, Price: ${formatNPR(
      listing.price
    )}). Can you share details or schedule a visit?`
  )}`;

  // Facing translation
  const facingText = listing.facing
    ? isNepali
      ? listing.facing === 'east'
        ? 'पूर्व मोहडा'
        : listing.facing === 'west'
        ? 'पश्चिम मोहडा'
        : listing.facing === 'north'
        ? 'उत्तर मोहडा'
        : listing.facing === 'south'
        ? 'दक्षिण मोहडा'
        : `${listing.facing} मोहडा`
      : `${listing.facing.charAt(0).toUpperCase() + listing.facing.slice(1)}-facing`
    : null;

  return (
    <article
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-none hover:border-teal-700/50 transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80' : primaryImage}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          {listing.hotDeal && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-600/95 text-white text-[11px] font-bold shadow-sm backdrop-blur-sm">
              <Flame className="w-3 h-3 text-orange-200 animate-pulse" />
              <span>{isNepali ? 'हट डिल' : 'Hot Deal'}</span>
            </span>
          )}

          {listing.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-900/95 text-teal-100 text-[11px] font-bold shadow-sm backdrop-blur-sm">
              <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span>{isNepali ? 'विशेष' : 'Featured'}</span>
            </span>
          )}

          {listing.verified && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 text-emerald-300 text-[11px] font-medium backdrop-blur-sm">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{isNepali ? 'प्रमाणित' : 'Verified'}</span>
            </span>
          )}
        </div>

        {/* Type pill (Rent/Sale) */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-md bg-slate-900/80 text-white text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm">
            {listing.type === 'rent'
              ? isNepali ? 'भाडामा' : 'For Rent'
              : listing.type === 'sale'
              ? isNepali ? 'बिक्रीमा' : 'For Sale'
              : isNepali ? 'व्यवसाय' : 'Business'}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isSaved
              ? 'bg-rose-600 text-white scale-110 shadow-md'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white hover:text-rose-600'
          }`}
          aria-label={isSaved ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title */}
          <h3 className="font-semibold text-slate-900 dark:text-white text-base sm:text-lg line-clamp-1 group-hover:text-teal-800 dark:group-hover:text-teal-400 transition-colors">
            {isNepali && listing.titleNe ? listing.titleNe : listing.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400 flex-shrink-0" />
            <span className="line-clamp-1">
              {listing.location.tole ? `${listing.location.tole}, ` : ''}
              {listing.location.district || listing.location.city}
              {listing.location.landmark ? ` • ${listing.location.landmark}` : ''}
            </span>
          </div>
        </div>

        {/* Property Specs Pill Bar (Bedrooms, Area, Road, Facing) */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-2">
          {listing.bedrooms !== undefined ? (
            <div className="flex items-center gap-1" title="Bedrooms">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{listing.bedrooms} {isNepali ? 'कोठा' : 'Beds'}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1" title="Area">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">
                {listing.area} {listing.areaUnit}
              </span>
            </div>
          )}

          {listing.roadWidth ? (
            <div className="flex items-center gap-1" title="Road Width">
              <Milestone className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {listing.roadWidth} ft {listing.roadType || ''}
              </span>
            </div>
          ) : facingText ? (
            <div className="flex items-center gap-1" title="Mohada">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              <span>{facingText}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span className="capitalize">{listing.category}</span>
            </div>
          )}

          <div className="flex items-center gap-1" title="Area">
            <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">
              {listing.area} {listing.areaUnit}
            </span>
          </div>
        </div>

        {/* Single Clean Bottom Row: Price on Left, Single Clean WhatsApp Icon Button on Right */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="min-w-0">{renderPriceLabel()}</div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white flex items-center justify-center shadow-sm hover:shadow transition-all duration-200 flex-shrink-0"
            title={isNepali ? 'ह्वाट्सएपमा सम्पर्क गर्नुहोस्' : 'Instant WhatsApp Inquiry'}
            aria-label="WhatsApp Inquiry"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-white" />
          </a>
        </div>
      </div>
    </article>
  );
}
