'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import {
  Building2,
  Home,
  MapPin,
  Store,
  Hotel,
  Briefcase,
  DoorClosed,
  Coffee,
  ShoppingBag,
  Dumbbell,
  Milestone,
  ChevronRight,
  LayoutGrid,
} from 'lucide-react';

export function CategoriesClient() {
  const { isNepali } = useLanguage();

  const sections = [
    {
      groupTitle: isNepali ? 'भाडामा (Properties for Rent)' : 'Properties for Rent',
      items: [
        {
          label: isNepali ? '१ र २ बीएचके फ्ल्याट तथा अपार्टमेन्ट' : '1BHK & 2BHK Flats & Apartments',
          count: '9 listings',
          icon: Building2,
          href: '/listings?type=rent&category=apartment',
        },
        {
          label: isNepali ? 'कोठा तथा स्टुडियो (Rooms & Studios)' : 'Single Rooms & Studios',
          count: '4 listings',
          icon: DoorClosed,
          href: '/listings?type=rent&category=room',
        },
        {
          label: isNepali ? 'व्यापारिक सटर (Commercial Shutters)' : 'Commercial Retail Shutters',
          count: '5 listings',
          icon: Store,
          href: '/listings?type=rent&category=shop',
        },
        {
          label: isNepali ? 'कर्पोरेट अफिस स्पेस (Office Space)' : 'Corporate Office Floors',
          count: '4 listings',
          icon: Briefcase,
          href: '/listings?type=rent&category=commercial',
        },
        {
          label: isNepali ? 'भाडामा आवासीय घरहरू' : 'Standalone Rental Houses',
          count: '6 listings',
          icon: Home,
          href: '/listings?type=rent&category=house',
        },
      ],
    },
    {
      groupTitle: isNepali ? 'बिक्रीमा (Properties for Sale)' : 'Properties for Sale',
      items: [
        {
          label: isNepali ? 'घर तथा अत्याधुनिक बंगलाहरू' : 'Houses & Luxury Bungalows',
          count: '8 listings',
          icon: Home,
          href: '/listings?type=sale&category=house',
        },
        {
          label: isNepali ? 'आवासीय घडेरी (आना/रोपनी)' : 'Residential Land (Aana/Ropani)',
          count: '7 listings',
          icon: MapPin,
          href: '/listings?type=sale&category=land',
        },
        {
          label: isNepali ? 'राजमार्ग छेउको व्यावसायिक जमिन' : 'Highway Commercial Land',
          count: '4 listings',
          icon: Milestone,
          href: '/listings?type=sale&category=land',
        },
        {
          label: isNepali ? 'अपार्टमेन्ट तथा पेन्टहाउस' : 'Luxury Towers & Penthouses',
          count: '5 listings',
          icon: Building2,
          href: '/listings?type=sale&category=apartment',
        },
      ],
    },
    {
      groupTitle: isNepali ? 'चलिरहेका व्यवसाय (Running Businesses)' : 'Running Businesses for Sale',
      items: [
        {
          label: isNepali ? 'कफी सप तथा बेकरीहरू' : 'Coffee Shops & Bakeries',
          count: '6 listings',
          icon: Coffee,
          href: '/listings?category=business',
        },
        {
          label: isNepali ? 'होटल तथा लज (Hotels & Lodges)' : 'Operating Hotels & Lodges',
          count: '5 listings',
          icon: Hotel,
          href: '/listings?category=hotel',
        },
        {
          label: isNepali ? 'फेसन बुटिक तथा पसलहरू' : 'Clothing Boutiques & Stores',
          count: '5 listings',
          icon: ShoppingBag,
          href: '/listings?category=shop',
        },
        {
          label: isNepali ? 'जिम तथा फिटनेस सेन्टर' : 'Fitness Centers & Gyms',
          count: '4 listings',
          icon: Dumbbell,
          href: '/listings?category=business',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F0F0F]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header */}
        <div className="pb-4 mb-6 border-b border-[#E5E5E5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h1 className="font-bold text-lg sm:text-2xl text-[#0F0F0F] tracking-tight">
                {isNepali ? 'सबै सम्पत्ति श्रेणीहरू' : 'All Categories & Subcategories'}
              </h1>
              <p className="text-xs text-[#71717A] mt-0.5">
                {isNepali
                  ? 'आफ्नो आवश्यकता अनुसारको श्रेणी छानेर तुरुन्त सूची हेर्नुहोस्'
                  : 'Select any category below to immediately filter marketplace listings'}
              </p>
            </div>
          </div>
        </div>

        {/* Structured Sections */}
        <div className="space-y-8">
          {sections.map((sec, idx) => (
            <div key={idx}>
              <h2 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-[#71717A] mb-3">
                {sec.groupTitle}
              </h2>

              <div className="border border-[#E5E5E5] rounded-xl overflow-hidden divide-y divide-[#E5E5E5] bg-white shadow-sm">
                {sec.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-[#F5F5F7] transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#F5F5F7] text-[#0F0F0F] group-hover:bg-[#0F0F0F] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                          <Icon className="w-4 h-4 stroke-[1.75]" />
                        </div>
                        <span className="font-medium text-xs sm:text-sm text-[#0F0F0F] truncate group-hover:text-[#0F0F0F]">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[11px] text-[#71717A] bg-[#F5F5F7] px-2 py-0.5 rounded">
                          {item.count}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#71717A] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
