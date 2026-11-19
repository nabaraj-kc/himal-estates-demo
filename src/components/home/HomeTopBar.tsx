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
    { id: 'all', label: isNepali ? 'सबै' : 'All' },
    { id: 'apartment', label: isNepali ? 'फ्ल्याट तथा कोठा' : 'Flats & Rooms' },
    { id: 'house', label: isNepali ? 'घर तथा बंगला' : 'Houses' },
    { id: 'land', label: isNepali ? 'जमिन तथा घडेरी' : 'Land & Plots' },
    { id: 'commercial', label: isNepali ? 'व्यापारिक तथा सटर' : 'Commercial' },
    { id: 'business', label: isNepali ? 'चलिरहेको व्यवसाय' : 'Running Businesses' },
  ];

  return (
    <div className="bg-white border-b border-[#E5E5E5] sticky top-14 sm:top-16 z-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={`py-3 text-xs sm:text-sm whitespace-nowrap transition-colors flex-shrink-0 relative ${
                  isActive
                    ? 'font-bold text-[#0F0F0F] border-b-2 border-[#0F0F0F]'
                    : 'font-normal text-[#71717A] hover:text-[#0F0F0F]'
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
