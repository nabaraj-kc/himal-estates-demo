'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  XCircle,
  CheckCircle2,
  Share2,
  Search,
  Database,
  ShieldAlert,
  Zap,
  TrendingUp,
} from 'lucide-react';

export function TrustSection() {
  const { isNepali } = useLanguage();

  const comparisonRows = [
    {
      feature: isNepali ? 'सूचीहरूको दिगो पहुँच' : 'Listing Longevity & Searchability',
      social: isNepali ? '४८ घण्टापछि फिडमा हराउने र खोज्न नमिल्ने' : 'Disappears down the social feed after 48 hours; unsearchable',
      himal: isNepali ? 'स्थायी युआरएल र २४/७ खोज्न सकिने क्याटलग' : 'Permanent indexed link; searchable 24/7 by location, budget & unit',
    },
    {
      feature: isNepali ? 'सटीक नेपाली एकाइ फिल्टर' : 'Authentic Nepali Unit Filters',
      social: isNepali ? 'कुनै फिल्टर छैन, क्याप्सनमा भद्रगोल विवरण' : 'No filters; buyer must read unstructured captions',
      himal: isNepali ? 'आना, रोपनी, बीएचके र मासिक भाडा फिल्टर' : 'Exact Aana, Ropani, BHK, and NPR price brackets',
    },
    {
      feature: isNepali ? 'ग्राहक सोधपुछ तथा लिड ट्र्याकिङ' : 'Buyer Inquiries & Lead Management',
      social: isNepali ? 'इनबक्स र कमेन्टमा हराउने ग्राहक सन्देशहरू' : 'Scattered across unorganized TikTok comments & Facebook DMs',
      himal: isNepali ? 'केन्द्रीकृत सिआरएम पाइपलाइन र व्हाट्सएप लिङ्क' : 'Centralized Lead CRM with status tracking (New → Visit → Deal Done)',
    },
    {
      feature: isNepali ? 'दलाली कमिसन तथा कारोबार रेकर्ड' : 'Commission Accounting & Deal Records',
      social: isNepali ? 'डायरी वा ह्वाट्सएप च्याटमा हराउने हिसाब' : 'Manual notebook scratchings or lost chat logs',
      himal: isNepali ? 'स्वतः कमिसन गणना, आम्दानी रिपोर्ट र CSV निर्यात' : 'Automated 2% commission tracker, revenue charts & instant CSV export',
    },
    {
      feature: isNepali ? 'सामाजिक सञ्जाल प्रचार सहयोग' : 'Social Media Asset Workflow',
      social: isNepali ? 'प्रत्येक पोस्टका लागि स्क्र्याचबाट डिजाइन गर्नुपर्ने' : 'Designing banners manually on Canva or posting blurry photos',
      himal: isNepali ? '१-क्लिकमा ब्रान्डेड इन्स्टाग्राम/फेसबुक कार्ड र क्याप्सन जेनेरेटर' : '1-Click branded 1080x1350 social flyer generator with pre-written captions',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
            <span>{isNepali ? 'व्यावसायिक भिन्नता' : 'The Strategic Difference'}</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            {isNepali ? 'केवल सामाजिक सञ्जाल भन्दा हिमाल एस्टेट किन १० गुणा अगाडि?' : 'Why Himal Estates Beats Social Media Alone'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {isNepali
              ? 'हामी तपाईंलाई फेसबुक वा टिकटक छोड्न भन्दैनौं — हामी तपाईंको सामाजिक सञ्जाललाई व्यवस्थित र दोब्बर प्रभावकारी बनाउँछौं।'
              : 'Keep your powerful Facebook & TikTok audience, but back it up with an authoritative digital marketplace that converts casual viewers into paid closed deals.'}
          </p>
        </div>

        {/* Comparison Table / Card Container */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          {/* Header Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-900 text-white p-4 sm:p-5 text-sm font-bold">
            <div className="md:col-span-4 text-slate-300">
              {isNepali ? 'विशेषता' : 'Feature / Capability'}
            </div>
            <div className="md:col-span-4 text-rose-300 flex items-center gap-1.5 mt-2 md:mt-0">
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>{isNepali ? 'केवल फेसबुक/टिकटकमा निर्भर हुँदा' : 'Social Media Alone (Unorganized)'}</span>
            </div>
            <div className="md:col-span-4 text-teal-300 flex items-center gap-1.5 mt-2 md:mt-0">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>{isNepali ? 'हिमाल एस्टेट बजार प्लेटफर्म' : 'Himal Estates Platform'}</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 text-xs sm:text-sm items-center gap-2 md:gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="md:col-span-4 font-semibold text-slate-900 dark:text-white">
                  {row.feature}
                </div>
                <div className="md:col-span-4 text-rose-700 dark:text-rose-400/90 flex items-start gap-2 bg-rose-50/50 dark:bg-rose-950/20 p-2.5 rounded-xl md:bg-transparent md:p-0">
                  <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>{row.social}</span>
                </div>
                <div className="md:col-span-4 text-teal-800 dark:text-teal-300 flex items-start gap-2 bg-teal-50/50 dark:bg-teal-950/20 p-2.5 rounded-xl md:bg-transparent md:p-0 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>{row.himal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Callout Footer */}
        <div className="mt-8 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <span>{isNepali ? 'तपाईंको ब्रान्ड, तपाईंको ग्राहक र तपाईंको नियन्त्रण।' : 'Own your brand, retain your leads, and command higher brokerage authority.'}</span>
        </div>
      </div>
    </section>
  );
}
