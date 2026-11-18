'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Listing } from '@/types';
import { getFeaturedListings } from '@/lib/storage';
import { ListingCard } from '@/components/listing/ListingCard';
import { useLanguage } from '@/context/LanguageContext';
import { Star, ArrowRight } from 'lucide-react';

export function FeaturedListings() {
  const { isNepali } = useLanguage();
  const [featured, setFeatured] = useState<Listing[]>([]);

  useEffect(() => {
    setFeatured(getFeaturedListings().slice(0, 6));

    const handleReset = () => {
      setFeatured(getFeaturedListings().slice(0, 6));
    };
    window.addEventListener('himal_data_reset', handleReset);
    return () => window.removeEventListener('himal_data_reset', handleReset);
  }, []);

  if (featured.length === 0) return null;

  return (
    <section className="py-12 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{isNepali ? 'विशेष सिफारिस' : 'Handpicked by Experts'}</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {isNepali ? 'प्रिमियम तथा विशेष सम्पत्तिहरू' : 'Featured Properties'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {isNepali
                ? 'उत्कृष्ट स्थान, उचित मूल्य र पूर्ण कानुनी कागजात प्रमाणित भएका सम्पत्तिहरू'
                : 'Prime locations, realistic valuations, and verified legal documentation'}
            </p>
          </div>

          <Link
            href="/listings?featured=true"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 group self-start sm:self-auto"
          >
            <span>{isNepali ? 'सबै विशेष हेर्नुहोस्' : 'View All Featured'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
