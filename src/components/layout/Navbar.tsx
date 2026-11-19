'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { brand } from '@/config/brand';
import { useLanguage } from '@/context/LanguageContext';
import { getFavoriteIds, getTotalUnreadCount } from '@/lib/storage';
import {
  Search,
  Heart,
  MessageCircle,
  Plus,
  Globe,
  Phone,
} from 'lucide-react';

export function Navbar() {
  const router = useRouter();
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
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E5E5E5]">
      {/* Top micro bar for telephone helpline (desktop only) */}
      <div className="bg-[#F5F5F7] border-b border-[#E5E5E5] text-[11px] text-[#71717A] py-1 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium text-[#0F0F0F]">
              {isNepali ? 'नेपालको प्रमाणित घरजग्गा बजार' : "Nepal's Property & Business Marketplace"}
            </span>
            <span className="text-[#E5E5E5]">•</span>
            <a href={`tel:${brand.phone}`} className="hover:text-[#0F0F0F] transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#71717A]" />
              <span>{brand.phone}</span>
            </a>
            <span className="text-[#E5E5E5]">•</span>
            <span>{brand.address}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-[#71717A] hover:text-[#0F0F0F] transition-colors">
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

          {/* Search Input (Soft Off-White #F5F5F7, border #E5E5E5) */}
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
                className="w-full pl-9 pr-9 sm:pr-20 py-2 text-xs sm:text-sm bg-[#F5F5F7] border border-[#E5E5E5] rounded-lg text-[#0F0F0F] placeholder:text-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#0F0F0F] focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="submit"
                className="hidden sm:inline-block absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-[#0F0F0F] hover:bg-[#27272A] text-white text-xs font-semibold transition-colors"
              >
                {isNepali ? 'खोज्नुहोस्' : 'Search'}
              </button>
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-[#71717A] hover:text-[#0F0F0F] hover:bg-[#F5F5F7] transition-colors"
              title="Toggle English / नेपाली"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'en' ? 'नेपाली' : 'EN'}</span>
            </button>

            {/* Saved Properties */}
            <Link
              href="/saved"
              className="relative p-2 rounded-lg text-[#71717A] hover:text-[#0F0F0F] hover:bg-[#F5F5F7] transition-colors"
              title="Saved Properties"
              aria-label="Saved properties"
            >
              <Heart className="w-5 h-5" strokeWidth={1.75} />
              {favoriteCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-[#0F0F0F] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* Client-Agent Inbox (MessageCircle next to search bar) */}
            <Link
              href="/inbox"
              className="relative p-2 rounded-lg text-[#71717A] hover:text-[#0F0F0F] hover:bg-[#F5F5F7] transition-colors"
              title="Client-Agent Inbox"
              aria-label="Inbox"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.75} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
              )}
            </Link>

            {/* Post Listing CTA (Ink Black button with white text) */}
            <Link
              href="/post"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0F0F0F] hover:bg-[#27272A] text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              <span>{isNepali ? 'सम्पत्ति पोस्ट' : '+ Post Ad'}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
