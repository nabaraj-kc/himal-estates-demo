'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { brand } from '@/config/brand';
import { PlusCircle, MessageSquare, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export function ListPropertyCTA() {
  const { isNepali } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Glow Backdrop */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-600/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-950/80 via-slate-900 to-slate-900 border border-teal-800/40 rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-700/50 text-teal-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>{isNepali ? 'घरधनी तथा व्यवसायीहरूका लागि' : 'For Property Owners & Business Sellers'}</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {isNepali
                ? 'आफ्नो घर, फ्ल्याट वा व्यवसाय छिटो र उचित मूल्यमा बेच्न वा भाडामा दिनुहोस्'
                : 'Sell or Rent Your Property with Maximum Visibility in Nepal'}
            </h2>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              {isNepali
                ? 'हामी तपाईंको सम्पत्तिको उच्च गुणस्तरको फोटो खिचेर हिमाल एस्टेट र हाम्रा हजारौं फेसबुक तथा टिकटक फलोअरहरूसम्म निःशुल्क पुर्याउँछौं। वास्तविक खरीददार भेटिएपछि मात्र मध्यस्थता सम्झौता।'
                : 'List your property on Himal Estates. We package professional listings, market directly to our massive social media community, and manage inspections on your behalf.'}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isNepali ? 'निःशुल्क दर्ता' : 'Zero Upfront Cost'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isNepali ? 'फेसबुक र टिकटक प्रचार' : 'Facebook & TikTok Promotion'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isNepali ? 'स्थलगत भ्रमण व्यवस्थापन' : 'Inspection Management'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
            <Link
              href="/list-property"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm shadow-lg shadow-teal-900/40 hover:shadow-xl transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isNepali ? 'सम्पत्ति दर्ता गर्नुहोस्' : 'List Your Property Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent('Namaste Himal Estates, I am a property owner and want to consult on listing my property.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 font-semibold text-sm transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>{isNepali ? 'व्हाट्सएपमा कुरा गर्नुहोस्' : 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
