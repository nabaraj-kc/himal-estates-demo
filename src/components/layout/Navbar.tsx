'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { brand } from '@/config/brand';
import { useLanguage } from '@/context/LanguageContext';
import { getFavoriteIds, getTotalUnreadCount } from '@/lib/storage';
import {
  Search,
  Heart,
  MessageSquare,
  Plus,
  Globe,
  Phone,
} from 'lucide-react';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { language, toggleLanguage, isNepali } = useLanguage();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updateCounts = () => {
      setFavoriteCount(getFavoriteIds().length);
      setUnreadCount(getTotalUnreadCount());
    };
    updateCounts();

    window.addEventListener('himal_favorites_changed', updateCounts);
    window.addEventListener('himal_conversations_changed', updateCounts);
    window.addEventListener('storage', updateCounts);

    return () => {
      window.removeEventListener('himal_favorites_changed', updateCounts);
      window.removeEventListener('himal_conversations_changed', updateCounts);
      window.removeEventListener('storage', updateCounts);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      router.push('/listings');
      return;
    }
    router.push(`/listings?location=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      {/* Top micro bar for telephone helpline (desktop only) */}
      <div className="bg-gray-50 border-b border-gray-100 text-[11px] text-gray-600 py-1 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-800">
              {isNepali ? 'नेपालको प्रमाणित घरजग्गा बजार' : "Nepal's Property & Business Marketplace"}
            </span>
            <span className="text-gray-300">•</span>
            <a href={`tel:${brand.phone}`} className="hover:text-teal-800 transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-teal-700" />
              <span>{brand.phone}</span>
            </a>
            <span className="text-gray-300">•</span>
            <span>{brand.address}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-teal-800 transition-colors">
              {isNepali ? 'ब्रोकर लगइन' : 'Broker / Staff Portal'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-14 sm:h-16">
          {/* Logo (plain dark text, no extra tagline clutter) */}
          <div className="flex-shrink-0">
            <Logo size="sm" showTagline={false} />
          </div>

          {/* Hamrobazar-style Search Input (center) */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl mx-2 relative flex items-center"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isNepali
                    ? 'काठमाडौं, ललितपुर वा पोखरामा फ्ल्याट, जग्गा खोज्नुहोस्...'
                    : 'Search flats, land, houses in Kathmandu, Lalitpur, Pokhara...'
                }
                className="w-full pl-9 pr-9 sm:pr-20 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg text-[#111827] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-800 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="submit"
                className="hidden sm:inline-block absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold"
              >
                {isNepali ? 'खोज्नुहोस्' : 'Search'}
              </button>
            </div>
          </form>

          {/* Right Action Icons (desktop & mobile clean actions) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              title="Toggle English / नेपाली"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-gray-600" />
              <span className="hidden sm:inline">{language === 'en' ? 'नेपाली' : 'EN'}</span>
            </button>

            {/* Saved Properties */}
            <Link
              href="/saved"
              className="relative p-2 rounded-lg text-gray-700 hover:text-rose-600 hover:bg-gray-50 transition-colors"
              title="Saved Properties"
              aria-label="Saved properties"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {favoriteCount > 0 && (
                <span className="absolute 1 -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* Client-Agent Inbox */}
            <Link
              href="/inbox"
              className="relative p-2 rounded-lg text-gray-700 hover:text-teal-800 hover:bg-gray-50 transition-colors"
              title="Client-Agent Inbox"
              aria-label="Inbox"
            >
              <MessageSquare className="w-5 h-5 stroke-[1.8]" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-teal-800 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Post Listing CTA (Prominent on desktop, also in bottom nav for mobile) */}
            <Link
              href="/list-property"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>{isNepali ? 'सम्पत्ति पोस्ट' : '+ Post Ad'}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
