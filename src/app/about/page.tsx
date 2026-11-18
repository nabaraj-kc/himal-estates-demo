'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { brand } from '@/config/brand';
import { useLanguage } from '@/context/LanguageContext';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function AboutPage() {
  const { isNepali } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 dark:bg-teal-950/60 text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>{isNepali ? 'हाम्रो कथा' : 'About Himal Estates'}</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
            {isNepali ? 'नेपालको आधुनिक तथा पारदर्शी सम्पत्ति बजार' : "Nepal's Property & Business Marketplace"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {isNepali
              ? 'हामी फेसबुक र टिकटकमा छरिएका अव्यवस्थित पोस्टिङहरूलाई अन्त्य गर्दै, प्रत्येक सूचीको स्थलगत निरीक्षण र लालपुर्जा प्रमाणिकरण गरेर वास्तविक खरीददारहरूसँग जोड्दछौं।'
              : 'Born out of the need to bring order, credibility, and verified transparency to Nepal’s property sector. We bridge the gap between social media audiences and secure real-estate closings.'}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">
              100% Verified Listings
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every house, flat, land parcel, and running business is physically visited. We verify boundary lines, road access, and legal ownership before listing.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/60 text-orange-700 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">
              Transparent Middleman Rate
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              No hidden broker fees or inflated prices. We operate on a standard, fair 2% transaction commission upon successful deal completion at the land registry.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">
              Social Media Reach
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              With 50k+ followers across Facebook and TikTok, we package listings into professional video walkthroughs and high-converting photo flyers.
            </p>
          </div>
        </div>

        {/* Agency Leadership & Headquarters */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200/90 dark:border-slate-800 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-teal-800 to-teal-600 text-white font-bold text-4xl flex items-center justify-center flex-shrink-0 shadow-lg">
            HE
          </div>
          <div className="space-y-3 text-center md:text-left">
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              Himal Estates Advisory Team
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Operating out of Kathmandu Valley, covering Lalitpur (Jhamsikhel, Sanepa, Imadol), Kathmandu (Baneshwor, Lazimpat, Budhanilkantha), Bhaktapur, and Pokhara.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-teal-700">
              <span>Office: {brand.address}</span>
              <span>•</span>
              <span>Phone: {brand.phone}</span>
              <span>•</span>
              <span>Email: {brand.email}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
