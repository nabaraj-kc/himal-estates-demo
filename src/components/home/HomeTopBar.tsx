'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface HomeTopBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function HomeTopBar({ activeFilter, onFilterChange }: HomeTopBarProps) {
  const { isNepali } = useLanguage();

  const filterTabs = [
    { id: 'all', label: isNepali ? 'सबै सूची' : 'All' },
    { id: 'rent', label: isNepali ? 'भाडामा (Rent)' : 'For Rent' },
    { id: 'sale', label: isNepali ? 'बिक्रीमा (Sale)' : 'For Sale' },
    { id: 'land', label: isNepali ? 'जमिन तथा घडेरी' : 'Land' },
    { id: 'business', label: isNepali ? 'चलिरहेको व्यवसाय' : 'Businesses' },
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-14 sm:top-16 z-30 py-2.5">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  isActive
                    ? 'bg-teal-800 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
