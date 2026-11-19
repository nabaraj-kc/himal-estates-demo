'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Listing } from '@/types';
import { formatNPR } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { getFavoriteIds, toggleFavoriteId } from '@/lib/storage';
import { Heart } from 'lucide-react';

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
    if (target.closest('button, a')) {
      return;
    }
    router.push(`/listings/${listing.slug || listing.id}`);
  };

  const primaryImage =
    listing.images && listing.images.length > 0
      ? listing.images[0].url
      : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';

  // Format Price
  const renderPrice = () => {
    const priceText = formatNPR(listing.price);
    if (listing.priceType === 'perMonth') {
      return (
        <span className="font-bold text-sm sm:text-base text-[#0F0F0F]">
          {priceText}
          <span className="text-xs text-[#71717A] font-normal ml-1">
            {isNepali ? '/महिना' : '/mo'}
          </span>
        </span>
      );
    }
    if (listing.priceType === 'perAana') {
      return (
        <span className="font-bold text-sm sm:text-base text-[#0F0F0F]">
          {priceText}
          <span className="text-xs text-[#71717A] font-normal ml-1">
            {isNepali ? '/आना' : '/aana'}
          </span>
        </span>
      );
    }
    return (
      <span className="font-bold text-sm sm:text-base text-[#0F0F0F]">
        {priceText}
      </span>
    );
  };

  // Build clean inline metadata line separated by ' • '
  const metaParts: string[] = [];

  // 1. Tole / City
  const locationLabel = listing.location.tole || listing.location.city || listing.location.district;
  if (locationLabel) {
    metaParts.push(locationLabel);
  }

  // 2. Road or Facing
  if (listing.roadWidth) {
    metaParts.push(`${listing.roadWidth} ft road`);
  } else if (listing.facing) {
    metaParts.push(`${listing.facing.charAt(0).toUpperCase() + listing.facing.slice(1)}`);
  }

  // 3. Beds or Area
  if (listing.bedrooms !== undefined) {
    metaParts.push(`${listing.bedrooms} ${isNepali ? 'कोठा' : 'BHK'}`);
  }
  if (listing.area) {
    metaParts.push(`${listing.area} ${listing.areaUnit}`);
  }

  // Minimal single label (at most ONE)
  const singleLabel =
    listing.type === 'rent'
      ? isNepali ? 'भाडामा' : 'Rent'
      : listing.type === 'sale'
      ? isNepali ? 'बिक्री' : 'Sale'
      : isNepali ? 'व्यवसाय' : 'Business';

  return (
    <article
      onClick={handleCardClick}
      className="group relative bg-white rounded-lg border border-[#E5E5E5] overflow-hidden hover:border-[#0F0F0F] transition-all duration-200 flex flex-col h-full cursor-pointer"
    >
      {/* Photo Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F5F7]">
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80' : primaryImage}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* Minimal ONE single subtle tag */}
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-0.5 rounded bg-[#0F0F0F]/80 text-white text-[10px] font-medium tracking-wide">
            {singleLabel}
          </span>
        </div>

        {/* Minimal favorite heart icon */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 text-[#71717A] hover:text-[#0F0F0F] transition-colors shadow-sm"
          aria-label={isSaved ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#EF4444] text-[#EF4444]' : ''}`} />
        </button>
      </div>

      {/* Content: Photo → Bold Price → Short Title → Location & Key Spec */}
      <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between gap-1.5">
        <div>
          {/* Bold Price */}
          <div className="leading-tight">{renderPrice()}</div>

          {/* Title: concise max 2 lines with line-clamp-2 */}
          <h3 className="font-medium text-xs sm:text-sm text-[#0F0F0F] line-clamp-2 leading-snug mt-1 transition-colors">
            {isNepali && listing.titleNe ? listing.titleNe : listing.title}
          </h3>
        </div>

        {/* Clean inline metadata separated by subtle dot • */}
        <div className="text-[11px] text-[#71717A] truncate mt-1 pt-1.5 border-t border-[#E5E5E5]">
          {metaParts.join(' • ')}
        </div>
      </div>
    </article>
  );
}
