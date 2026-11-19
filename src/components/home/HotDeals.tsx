'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Listing } from '@/types';
import { getHotDeals } from '@/lib/storage';
import { ListingCard } from '@/components/listing/ListingCard';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface HotDealsProps {
  filter?: string;
}

export function HotDeals({ filter = 'all' }: HotDealsProps) {
  const { isNepali } = useLanguage();
  const [deals, setDeals] = useState<Listing[]>([]);

  useEffect(() => {
    let items = getHotDeals();
    if (filter === 'rent') {
      items = items.filter((l) => l.type === 'rent');
    } else if (filter === 'sale') {
      items = items.filter((l) => l.type === 'sale');
    } else if (filter === 'land') {
      items = items.filter((l) => l.category === 'land');
    } else if (filter === 'business') {
      items = items.filter((l) => l.category === 'business' || l.type === 'business');
    }
    setDeals(items.slice(0, 8));

    const handleReset = () => {
      setDeals(getHotDeals().slice(0, 8));
    };
    window.addEventListener('himal_data_reset', handleReset);
    return () => window.removeEventListener('himal_data_reset', handleReset);
  }, [filter]);

  if (deals.length === 0) return null;

  return (
    <section className="py-4 sm:py-6 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Crisp Section Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 border-b border-gray-100">
          <h2 className="font-bold text-base sm:text-lg text-[#111827]">
            {isNepali ? 'नयाँ तथा तत्काल सम्झौता सूचीहरू' : 'Hot Deals / Latest Uploads'}
          </h2>

          <Link
            href="/listings?hotDeal=true"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-teal-800 hover:underline"
          >
            <span>{isNepali ? 'सबै हेर्नुहोस्' : 'View all'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dense 2-column mobile / 4-column desktop grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {deals.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
