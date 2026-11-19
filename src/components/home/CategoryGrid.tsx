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
    <section className="py-6 sm:py-8 bg-gray-50/50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="mb-4 pb-2 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-bold text-sm sm:text-base text-[#111827]">
            {isNepali ? 'श्रेणी अनुसार खोज्नुहोस्' : 'Explore by Category'}
          </h2>
          <Link
            href="/listings"
            className="text-xs font-medium text-teal-800 hover:underline"
          >
            {isNepali ? 'सबै श्रेणीहरू' : 'All categories'}
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
                className="group flex flex-col items-center justify-center p-3 rounded-lg bg-white border border-gray-200 hover:border-teal-700/60 hover:shadow-sm transition-all text-center"
              >
                <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-700 group-hover:bg-teal-50 group-hover:text-teal-800 flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-[#111827] mt-2 line-clamp-1 group-hover:text-teal-800 transition-colors">
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
