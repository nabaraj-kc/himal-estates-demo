'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Building2,
  Home,
  MapPin,
  Store,
  Hotel,
  Briefcase,
} from 'lucide-react';

export function CategoryGrid() {
  const { isNepali } = useLanguage();

  const categories = [
    {
      key: 'apartment',
      label: isNepali ? 'फ्ल्याट तथा अपार्टमेन्ट' : 'Flats & Apartments',
      icon: Building2,
    },
    {
      key: 'house',
      label: isNepali ? 'घर तथा बंगलाहरू' : 'Houses & Villas',
      icon: Home,
    },
    {
      key: 'land',
      label: isNepali ? 'जमिन तथा घडेरी' : 'Land & Plots',
      icon: MapPin,
    },
    {
      key: 'shop',
      label: isNepali ? 'पसल तथा सटर' : 'Shops & Shutters',
      icon: Store,
    },
    {
      key: 'hotel',
      label: isNepali ? 'होटल तथा लज' : 'Hotels & Lodges',
      icon: Hotel,
    },
    {
      key: 'business',
      label: isNepali ? 'सञ्चालित व्यवसाय' : 'Businesses',
      icon: Briefcase,
    },
  ];

  return (
    <section className="py-6 sm:py-8 bg-[#F5F5F7] border-t border-[#E5E5E5] w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-w-0">
        <div className="mb-4 pb-2 border-b border-[#E5E5E5] flex items-center justify-between">
          <h2 className="font-bold text-sm sm:text-base text-[#0F0F0F]">
            {isNepali ? 'श्रेणी अनुसार खोज्नुहोस्' : 'Explore by Category'}
          </h2>
          <Link
            href="/categories"
            className="text-xs font-semibold text-[#0F0F0F] hover:underline"
          >
            {isNepali ? 'सबै श्रेणीहरू हेर्नुहोस्' : 'All categories'}
          </Link>
        </div>

        {/* Compact flat icon-and-label grid: 3 cols on mobile, 6 cols on tablet/desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.key}
                href={`/listings?category=${cat.key}`}
                className="group flex flex-col items-center justify-center p-3 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#0F0F0F] transition-all text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] group-hover:bg-[#0F0F0F] group-hover:text-white flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-[#0F0F0F] mt-2 line-clamp-1 transition-colors">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
