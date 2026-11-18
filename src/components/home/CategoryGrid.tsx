'use client';

import React from 'react';
import Link from 'next/link';
import { mockCategories } from '@/data/mock-listings';
import { useLanguage } from '@/context/LanguageContext';
import {
  Building2,
  Home,
  MapPin,
  Store,
  Hotel,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

export function CategoryGrid() {
  const { isNepali } = useLanguage();

  const iconMap: Record<string, React.ReactNode> = {
    apartment: <Building2 className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
    house: <Home className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
    land: <MapPin className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
    shop: <Store className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
    hotel: <Hotel className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
    business: <Briefcase className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
  };

  return (
    <section className="py-12 sm:py-20 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">
              <span>{isNepali ? 'वर्गीकरण' : 'Categories'}</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {isNepali ? 'श्रेणी अनुसार खोज्नुहोस्' : 'Explore by Category'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {isNepali
                ? 'तपाईंलाई आवश्यक आवासीय, व्यापारिक वा लगानीका अवसरहरू'
                : 'Browse verified listings across residential, commercial and business sectors'}
            </p>
          </div>

          <Link
            href="/listings"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 group self-start sm:self-auto"
          >
            <span>{isNepali ? 'सबै सूची हेर्नुहोस्' : 'View All Categories'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {mockCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/listings?category=${cat.key}`}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none hover:border-teal-600/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Row: Icon + Count */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900/50 group-hover:bg-teal-700 group-hover:text-white transition-colors duration-300">
                  {iconMap[cat.key] || <Building2 className="w-6 h-6 text-teal-600" />}
                </div>

                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
                  {cat.listingCount}+ {isNepali ? 'उपलब्ध' : 'Active'}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                  {isNepali ? cat.labelNe : cat.label}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Bottom Subtle Action */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-teal-700 dark:text-teal-400">
                <span>{isNepali ? 'सूचीहरू अन्वेषण गर्नुहोस्' : 'Explore Listings'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
