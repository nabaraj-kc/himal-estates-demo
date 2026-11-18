'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Listing } from '@/types';
import { formatNPR, formatNPRShort } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { getFavoriteIds, toggleFavoriteId } from '@/lib/storage';
import { brand } from '@/config/brand';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  ShieldCheck,
  Flame,
  Star,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  priority?: boolean;
}

export function ListingCard({ listing, priority = false }: ListingCardProps) {
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
          <span className="font-display font-bold text-lg sm:text-xl text-teal-800 dark:text-teal-400">
            {priceText}
          </span>
          <span className="text-xs text-slate-500 font-normal">
            {isNepali ? '/महिना' : '/month'}
          </span>
        </div>
      );
    }
    if (listing.priceType === 'perAana') {
      return (
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-lg sm:text-xl text-teal-800 dark:text-teal-400">
            {priceText}
          </span>
          <span className="text-xs text-slate-500 font-normal">
            {isNepali ? '/आना' : '/aana'}
          </span>
        </div>
      );
    }
    return (
      <span className="font-display font-bold text-lg sm:text-xl text-teal-800 dark:text-teal-400">
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

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-none hover:border-teal-600/40 transition-all duration-300 flex flex-col h-full">
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Link href={`/listings/${listing.slug || listing.id}`} className="block w-full h-full">
          <img
            src={imgError ? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80' : primaryImage}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading={priority ? 'eager' : 'lazy'}
          />
        </Link>

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          {listing.hotDeal && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-600/95 text-white text-[11px] font-bold shadow-sm backdrop-blur-sm">
              <Flame className="w-3 h-3 text-orange-200 animate-pulse" />
              <span>{isNepali ? 'हट डिल' : 'Hot Deal'}</span>
            </span>
          )}

          {listing.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-800/95 text-teal-100 text-[11px] font-bold shadow-sm backdrop-blur-sm">
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
          {/* Price */}
          <div className="mb-1">{renderPriceLabel()}</div>

          {/* Title */}
          <Link href={`/listings/${listing.slug || listing.id}`}>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base sm:text-lg line-clamp-1 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
              {isNepali && listing.titleNe ? listing.titleNe : listing.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
            <span className="line-clamp-1">
              {listing.location.tole ? `${listing.location.tole}, ` : ''}
              {listing.location.district || listing.location.city}
            </span>
          </div>
        </div>

        {/* Property Specs Pill Bar */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400">
          {listing.bedrooms !== undefined ? (
            <div className="flex items-center gap-1.5" title="Bedrooms">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{listing.bedrooms} Beds</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span className="capitalize">{listing.category}</span>
            </div>
          )}

          {listing.bathrooms !== undefined ? (
            <div className="flex items-center gap-1.5" title="Bathrooms">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{listing.bathrooms} Baths</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span>{listing.condition || 'Verified'}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5" title="Area">
            <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">
              {listing.area} {listing.areaUnit}
            </span>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-medium transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <Link
            href={`/listings/${listing.slug || listing.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 group/link"
          >
            <span>{isNepali ? 'विवरण हेर्नुहोस्' : 'Details'}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
