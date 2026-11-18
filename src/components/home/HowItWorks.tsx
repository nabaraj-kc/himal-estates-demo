'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Search,
  UserCheck,
  FileText,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export function HowItWorks() {
  const { isNepali } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: <Search className="w-6 h-6 text-teal-600" />,
      title: isNepali ? '१. प्रमाणित क्याटलग खोज्नुहोस्' : '1. Discover Verified Properties',
      desc: isNepali
        ? 'फेसबुक वा टिकटकमा पुराना पोस्ट खोज्दै समय खेर नफाल्नुहोस्। सटीक स्थान, आना/रोपनी वा कोठा संख्या अनुसार तत्काल फिल्टर गर्नुहोस्।'
        : 'Stop wasting hours scrolling buried Facebook posts. Search verified listings with exact Nepali filters: Aana, Ropani, BHK, and realistic price tags.',
    },
    {
      num: '02',
      icon: <UserCheck className="w-6 h-6 text-orange-600" />,
      title: isNepali ? '२. हिमाल एस्टेट टोलीसँग साइट भिजिट' : '2. Guided Site Inspection',
      desc: isNepali
        ? 'हाम्रो स्थानीय एजेन्टले तपाईंसँगै गएर स्थलगत निरीक्षण गराउँछ। लालपुर्जा, बाटोको चौडाइ, खानेपानी र बिजुलीको स्थलगत प्रमाणिकरण।'
        : 'Our licensed local broker coordinates your personal site inspection. We inspect physical condition, road access, and legal boundary lines beforehand.',
    },
    {
      num: '03',
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      title: isNepali ? '३. पारदर्शी सम्झौता र मालपोत रजिष्ट्रेसन' : '3. Transparent & Safe Closing',
      desc: isNepali
        ? 'प्रत्यक्ष क्रेता-बिक्रेता भेटघाट, उचित मध्यस्थता शुल्क र मालपोत कार्यालयमा सहज रजिष्ट्रेसन सहजीकरण।'
        : 'Direct negotiation with the real property owner, structured middleman commission, and complete paperwork assistance through the Malpot land registry.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 dark:bg-teal-950/60 text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            <span>{isNepali ? 'सरल र सुरक्षित प्रक्रिया' : 'The Himal Estates Advantage'}</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            {isNepali ? 'हामी कसरी कारोबार सहज बनाउँछौं?' : 'How Himal Estates Works'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {isNepali
              ? 'सामाजिक सञ्जालको अव्यवस्थित पोस्टिङबाट मुक्त भएर सुरक्षित रूपमा सम्पत्ति किनबेच र भाडामा लिने आधुनिक बाटो।'
              : 'Replacing chaotic Facebook comments and unverified TikTok listings with an authentic, professional brokerage experience.'}
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Top Accent Step Number */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  {step.icon}
                </div>
                <span className="font-display font-extrabold text-2xl text-slate-300 dark:text-slate-700">
                  {step.num}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white mb-2.5">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/list-property"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm shadow-md shadow-teal-700/20 hover:shadow-lg transition-all active:scale-95"
          >
            <span>{isNepali ? 'आफ्नो सम्पत्ति दर्ता गर्नुहोस् (निःशुल्क)' : 'Post Your Property With Us (Free)'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
