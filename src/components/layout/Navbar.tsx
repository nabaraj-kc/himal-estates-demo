'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { brand } from '@/config/brand';
import { useLanguage } from '@/context/LanguageContext';
import { getFavoriteIds } from '@/lib/storage';
import {
  Heart,
  PlusCircle,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Search,
  Globe,
  MessageSquare,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage, t, isNepali } = useLanguage();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sync favorites count
  useEffect(() => {
    const updateFavs = () => {
      setFavoriteCount(getFavoriteIds().length);
    };
    updateFavs();

    window.addEventListener('himal_favorites_changed', updateFavs);
    window.addEventListener('storage', updateFavs);
    return () => {
      window.removeEventListener('himal_favorites_changed', updateFavs);
      window.removeEventListener('storage', updateFavs);
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: t('nav.home', 'Home') },
    { href: '/listings?type=rent', label: isNepali ? 'भाडामा' : 'For Rent' },
    { href: '/listings?type=sale', label: isNepali ? 'बिक्रीमा' : 'For Sale' },
    { href: '/listings?category=land', label: isNepali ? 'जमिन/घडेरी' : 'Land' },
    { href: '/listings?category=business', label: isNepali ? 'व्यवसाय' : 'Businesses' },
    { href: '/about', label: t('nav.about', 'About') },
    { href: '/contact', label: t('nav.contact', 'Contact') },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800'
          : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800'
      }`}
    >
      {/* Top micro bar for contact info & admin link */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isNepali ? 'प्रत्येक सूची हाम्रो टोलीद्वारा प्रमाणित' : 'Verified Nepal Property & Business Deals'}
            </span>
            <a
              href={`tel:${brand.phone}`}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-teal-400" />
              <span>{brand.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${brand.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium"
            >
              <span>WhatsApp Us</span>
            </a>
            <span className="text-slate-600">|</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-2.5 py-0.5 rounded text-[11px] font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>Middleman Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href.split('?')[0]));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors"
              title="Toggle English / नेपाली"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>{language === 'en' ? 'नेपाली' : 'English'}</span>
            </button>

            {/* Saved Properties Heart */}
            <Link
              href="/saved"
              className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
              title="Saved Properties"
              aria-label="Saved properties"
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* List Property Primary Button */}
            <Link
              href="/list-property"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium shadow-sm shadow-teal-700/20 hover:shadow-md transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isNepali ? 'सम्पत्ति पोस्ट गर्नुहोस्' : 'List Property'}</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/list-property"
              className="col-span-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-teal-700 text-white font-medium text-sm shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isNepali ? 'सम्पत्ति पोस्ट गर्नुहोस्' : 'List Your Property (Free)'}</span>
            </Link>

            <Link
              href="/admin"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium"
            >
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              <span>Admin Panel</span>
            </Link>

            <a
              href={`https://wa.me/${brand.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
