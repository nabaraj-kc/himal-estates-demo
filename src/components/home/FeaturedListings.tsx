'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Listing } from '@/types';
import { getFeaturedListings } from '@/lib/storage';
import { ListingCard } from '@/components/listing/ListingCard';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface FeaturedListingsProps {
  filter?: string;
}

export function FeaturedListings({ filter = 'all' }: FeaturedListingsProps) {
  const { isNepali } = useLanguage();
  const [featured, setFeatured] = useState<Listing[]>([]);

  useEffect(() => {
    let items = getFeaturedListings();
    if (filter === 'apartment') {
      items = items.filter((l) => l.category === 'apartment' || l.category === 'room');
    } else if (filter === 'house') {
      items = items.filter((l) => l.category === 'house' || l.category === 'villa');
    } else if (filter === 'land') {
      items = items.filter((l) => l.category === 'land');
    } else if (filter === 'commercial') {
      items = items.filter((l) => l.category === 'shop' || l.category === 'commercial' || l.category === 'office');
    } else if (filter === 'business') {
      items = items.filter((l) => l.category === 'business' || l.category === 'hotel' || l.type === 'business');
    }
    setFeatured(items.slice(0, 8));

    const handleReset = () => {
      setFeatured(getFeaturedListings().slice(0, 8));
    };
    window.addEventListener('himal_data_reset', handleReset);
    return () => window.removeEventListener('himal_data_reset', handleReset);
  }, [filter]);

  if (featured.length === 0) return null;

  return (
    <section className="py-4 sm:py-6 bg-white w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-w-0">
        {/* Crisp Section Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 border-b border-[#E5E5E5]">
          <h2 className="font-bold text-base sm:text-lg text-[#0F0F0F]">
            {isNepali ? 'विशेष सिफारिस सूचीहरू' : 'Featured / Trending Properties'}
          </h2>

          <Link
            href="/listings?featured=true"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0F0F0F] hover:underline"
          >
            <span>{isNepali ? 'सबै हेर्नुहोस्' : 'View all'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dense 2-column mobile / 4-column desktop grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-full min-w-0">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
