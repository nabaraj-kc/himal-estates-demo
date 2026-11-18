'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Listing } from '@/types';
import { getHotDeals } from '@/lib/storage';
import { ListingCard } from '@/components/listing/ListingCard';
import { useLanguage } from '@/context/LanguageContext';
import { Flame, ArrowRight, Clock } from 'lucide-react';

export function HotDeals() {
  const { isNepali } = useLanguage();
  const [deals, setDeals] = useState<Listing[]>([]);

  useEffect(() => {
    setDeals(getHotDeals().slice(0, 6));

    const handleReset = () => {
      setDeals(getHotDeals().slice(0, 6));
    };
    window.addEventListener('himal_data_reset', handleReset);
    return () => window.removeEventListener('himal_data_reset', handleReset);
  }, []);

  if (deals.length === 0) return null;

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-orange-50/40 via-amber-50/20 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
              <span>{isNepali ? 'सीमित समयको अफर' : 'Urgent Opportunities'}</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {isNepali ? 'हट डिल तथा मूल्य घटाइएका सम्पत्तिहरू' : 'Hot Deals & Quick Closures'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {isNepali
                ? 'तत्काल बिक्री गर्नुपर्ने वा बजार मूल्यभन्दा कममा उपलब्ध प्रमाणित अवसरहरू'
                : 'Motivated sellers and below-market rates ready for prompt negotiation'}
            </p>
          </div>

          <Link
            href="/listings?hotDeal=true"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 dark:text-orange-400 hover:text-orange-800 group self-start sm:self-auto"
          >
            <span>{isNepali ? 'सबै हट डिलहरू हेर्नुहोस्' : 'View All Hot Deals'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {deals.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
