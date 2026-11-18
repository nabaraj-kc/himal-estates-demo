'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  ShieldCheck,
  FileCheck2,
  Compass,
  Landmark,
  Scale,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
} from 'lucide-react';
import { brand } from '@/config/brand';

export function TrustSection() {
  const { isNepali } = useLanguage();

  const trustPillars = [
    {
      icon: FileCheck2,
      tag: isNepali ? 'स्वामित्व तथा नक्सा' : 'Title & Cadastral',
      title: isNepali ? 'लालपुर्जा तथा नापी नक्सा प्रमाणिकरण' : 'Lalpurja & Napi Verification',
      nepaliSub: 'Physical Deed & Cadastral Audit',
      description: isNepali
        ? 'प्रत्येक सम्पत्तिको लालपुर्जा, नापी ट्रेस नक्सा, सिमाना (Four Boundaries) र मालपोत रोक्का स्थिति स्थलगत रूपमा जाँच गरिन्छ। विवादरहित र एकल स्वामित्व सुनिश्चित।'
        : 'Every listing undergoes physical ownership deed inspection, official cadastral trace map (Napi) boundary validation, and Land Revenue (Malpot) encumbrance checks prior to publication.',
      points: [
        isNepali ? 'मालपोत कार्यालयमा रोक्का/धितो स्थिति रुजु' : 'Land Revenue encumbrance & mortgage check',
        isNepali ? 'नापी नक्सा र फिल्ड सिमाना १००% मेल खाने' : 'Napi trace map matched with actual plot boundaries',
        isNepali ? 'विवादरहित पारिवारिक तथा एकल स्वामित्व' : 'Clear single ownership with zero legal disputes',
      ],
      badge: isNepali ? '१००% कानुनी रुजु' : '100% Title Checked',
    },
    {
      icon: Compass,
      tag: isNepali ? 'स्थलगत सडक विवरण' : 'Access & Orientation',
      title: isNepali ? 'सडक पहुँच र मोहडाको स्थलगत नाप' : 'Road Access & Mohada Specs',
      nepaliSub: 'Accurate Road Width & Facing',
      description: isNepali
        ? 'सडक चौडाइ (पिच, ढलान वा ग्राभेल) र वास्तु अनुसारको मोहडा (पूर्व, उत्तर, पश्चिम वा दक्षिण) हामी आफैं टेपले नापेर प्रमाणित गर्छौं। फोटो र यथार्थमा कुनै भिन्नता हुन्न।'
        : 'Exact government road width in feet (pitched, RCC, or gravel) and Vastu cardinal orientation (East, North, West, South) are measured on-site. What you see is what you get.',
      points: [
        isNepali ? 'सटीक सडक चौडाइ (१३, १६, २० वा २४ फिट)' : 'Verified road width (13 ft, 16 ft, 20 ft, 24 ft)',
        isNepali ? 'सवारी साधन आवतजावत र टर्निङ परीक्षण' : 'Four-wheeler turnaround and drainage check',
        isNepali ? 'दिशा सूचक (कम्पास) द्वारा प्रमाणित मोहडा' : 'Compass-verified cardinal facing direction',
      ],
      badge: isNepali ? 'स्थलगत परीक्षण' : 'On-Site Measured',
    },
    {
      icon: Landmark,
      tag: isNepali ? 'बैंकिङ कर्जा' : 'Banking & Valuation',
      title: isNepali ? 'बैंक ऋण तथा मूल्याङ्कन योग्य' : 'Bank Loan & Valuation Ready',
      nepaliSub: 'Home Finance Assistance',
      description: isNepali
        ? 'नगरपालिका नक्सा पास, निर्माण सम्पन्न प्रमाण-पत्र र सम्पूर्ण आवश्यक कागजात दुरुस्त। नेपाल राष्ट्र बैंकका मान्यता प्राप्त ‘क’ वर्गका वाणिज्य बैंकहरूबाट ७०% सम्म कर्जा लिन सहज।'
        : 'Complete municipal building permits, completion certificates (Nirman Sampanna), and tax clearance ready for hassle-free home loan processing up to 70% from commercial banks.',
      points: [
        isNepali ? 'नगरपालिका निर्माण सम्पन्न प्रमाण-पत्र दुरुस्त' : 'Municipal completion certificates (Nirman Sampanna)',
        isNepali ? '‘क’ वर्गका वाणिज्य बैंकहरूबाट सरल कर्जा' : 'Pre-screened for A-Class commercial bank loans',
        isNepali ? 'स्वतन्त्र भ्यालुएटरबाट उचित बजार मूल्याङ्कन' : 'Independent certified property valuation support',
      ],
      badge: isNepali ? 'बैंक योग्य' : 'Bank Ready',
    },
    {
      icon: Scale,
      tag: isNepali ? 'रजिष्ट्रेसन सहयोग' : 'Legal & Registration',
      title: isNepali ? 'मालपोत रजिष्ट्रेसन सहजीकरण' : 'Malpot Registration Assistance',
      nepaliSub: 'End-to-End Legal Transfer',
      description: isNepali
        ? 'राजीनामा लिखत लेखन, पुँजीगत लाभकर र रजिस्ट्रेसन दस्तुरको पारदर्शी हिसाब, र मालपोत कार्यालयमा हाम्रो प्रतिनिधि स्वयं उपस्थित भई पास नहुन्जेल साथ दिन्छौं।'
        : 'From legal deed drafting (Rajinama) and transparent capital gains tax calculation to accompanied representation at the Land Revenue Office until final deed handover.',
      points: [
        isNepali ? 'कानुनी राजीनामा लिखत मस्यौदा सहयोग' : 'Professional legal deed drafting (Rajinama)',
        isNepali ? 'पारदर्शी सरकारी दस्तुर र लाभकर हिसाब' : 'Transparent revenue tax & transfer fee breakdown',
        isNepali ? 'मालपोत कार्यालयमा अन्तिमसम्म प्रत्यक्ष साथ' : 'Dedicated representative at Malpot until handover',
      ],
      badge: isNepali ? 'सम्पूर्ण कानुनी साथ' : 'End-to-End Support',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800 text-xs font-semibold text-teal-800 dark:text-teal-300 tracking-wide uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            <span>{isNepali ? 'नेपाली घरजग्गा सुरक्षा प्रत्याभूति' : 'Buyer & Tenant Protection Standards'}</span>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            {isNepali
              ? 'हामी प्रत्येक घरजग्गामा किन स्थलगत पुग्छौं?'
              : 'Our 4-Pillar Due Diligence Standard'}
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {isNepali
              ? 'सामाजिक सञ्जालमा देखिने भ्रामक विज्ञापन र नक्कली विवरणबाट सुरक्षित रहनुहोस्। हिमाल एस्टेटमा प्रस्तुत प्रत्येक सम्पत्ति कानुनी र स्थलगत रूपमा जाँचिएको हुन्छ।'
              : 'Never risk your life savings on vague social media posts or disputed properties. Every listing on Himal Estates is vetted through rigorous on-ground and legal verification.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-50/70 dark:bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 hover:border-teal-600/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-teal-900 text-teal-100 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:bg-teal-800 transition-all">
                      <Icon className="w-6 h-6 text-teal-200" />
                    </div>

                    <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-md bg-teal-100/80 dark:bg-teal-950 text-teal-900 dark:text-teal-300 uppercase tracking-wide">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Category Tag & Title */}
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                      {pillar.tag}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug group-hover:text-teal-950 dark:group-hover:text-teal-300 transition-colors">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Bullet checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                    {pillar.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subfooter Note */}
                <div className="mt-6 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-teal-900 dark:text-teal-300">{pillar.nepaliSub}</span>
                  <span className="font-mono text-[11px] text-slate-400">Standard 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Advisory CTA Banner */}
        <div className="mt-12 sm:mt-16 rounded-2xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="font-display font-bold text-lg sm:text-xl text-white">
              {isNepali ? 'सम्पत्तिको कानुनी स्थिति बुझ्न चाहनुहुन्छ?' : 'Need Independent Property Title Guidance?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {isNepali
                ? 'हाम्रा अनुभवी परामर्शदातासँग सिधै कुरा गर्नुहोस्। लालपुर्जा, नक्सा र मूल्याङ्कन सम्बन्धमा निःशुल्क सल्लाह पाउनुहोस्।'
                : 'Speak directly with our senior property advisors before paying any token advance or signing an agreement.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${brand.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{brand.phone}</span>
            </a>
            <Link
              href="/listings"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>{isNepali ? 'प्रमाणित घरजग्गा हेर्नुहोस्' : 'Browse Verified Listings'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
