'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { brand } from '@/config/brand';
import { useLanguage } from '@/context/LanguageContext';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

export function Footer() {
  const { t, isNepali } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Middleman Trust Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-teal-950/80 border border-teal-800/50 text-teal-400 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {isNepali ? 'प्रत्येक सूची भौतिक रूपमा प्रमाणित' : 'Every Listing Verified'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isNepali
                  ? 'हाम्रो टोलीले साइट भिजिट गरेर कागजात र मूल्यको सत्यता जाँच गर्दछ।'
                  : 'We visit properties, verify lalpurja documents, and inspect conditions before listing.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-orange-950/80 border border-orange-800/50 text-orange-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {isNepali ? 'पारदर्शी र सुरक्षित कारोबार' : 'Zero Fake Brokers / Transparent Deals'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isNepali
                  ? 'प्रत्यक्ष क्रेता र बिक्रेताबीच समन्वय। कुनै लुकेको शुल्क छैन।'
                  : 'Direct deal facilitation with clear middleman terms and formal registration support.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {isNepali ? '१५ मिनेट भित्र प्रत्यक्ष सम्पर्क' : '15-Minute Human Response'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isNepali
                  ? 'WhatsApp वा फोन मार्फत तुरुन्तै वास्तविक व्यक्तिसँग कुरा गर्नुहोस्।'
                  : 'Talk to an authentic Nepal property expert on WhatsApp or phone immediately.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo theme="dark" size="lg" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {isNepali ? brand.taglineNepali : brand.tagline}.{' '}
              {isNepali
                ? 'नेपालभर घर, फ्ल्याट, घडेरी तथा चलिरहेका व्यवसायहरूको विश्वसनीय बजार।'
                : 'Nepal’s premier curated marketplace connecting verified property owners with genuine buyers and tenants.'}
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>{brand.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <a href={`tel:${brand.phone}`} className="hover:text-white transition-colors">
                  {brand.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <a href={`mailto:${brand.email}`} className="hover:text-white transition-colors">
                  {brand.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={brand.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1 transition-colors"
              >
                <span>Facebook</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
              <a
                href={brand.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1 transition-colors"
              >
                <span>TikTok</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1 transition-colors"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">
              {isNepali ? 'सम्पत्ति प्रकार' : 'Property Types'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/listings?category=apartment" className="hover:text-teal-400 transition-colors">
                  {isNepali ? 'फ्ल्याट तथा अपार्टमेन्ट' : 'Flats & Apartments'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=house" className="hover:text-teal-400 transition-colors">
                  {isNepali ? 'घर तथा बंगलाहरू' : 'Houses & Bungalows'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=land" className="hover:text-teal-400 transition-colors">
                  {isNepali ? 'जमिन तथा घडेरी (आना/रोपनी)' : 'Land & Plots (Aana/Ropani)'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=shop" className="hover:text-teal-400 transition-colors">
                  {isNepali ? 'पसल तथा सटर' : 'Shops & Commercial Shutters'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=hotel" className="hover:text-teal-400 transition-colors">
                  {isNepali ? 'होटल तथा रिसोर्ट' : 'Hotels & Lodges'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=business" className="hover:text-teal-400 transition-colors">
                  {isNepali ? 'चलिरहेका व्यवसायहरू' : 'Running Businesses'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">
              {isNepali ? 'प्रमुख स्थानहरू' : 'Top Locations'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/listings?location=Jhamsikhel" className="hover:text-teal-400 transition-colors">
                  Jhamsikhel & Sanepa
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Baneshwor" className="hover:text-teal-400 transition-colors">
                  New Baneshwor & Shankhamul
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Lazimpat" className="hover:text-teal-400 transition-colors">
                  Lazimpat & Baluwatar
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Imadol" className="hover:text-teal-400 transition-colors">
                  Imadol & Mahalaxmi
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Budhanilkantha" className="hover:text-teal-400 transition-colors">
                  Budhanilkantha Heights
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Pokhara" className="hover:text-teal-400 transition-colors">
                  Pokhara Lakeside
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick & Middleman Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">
              {isNepali ? 'द्रुत लिङ्कहरू' : 'Platform & Admin'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/list-property" className="text-teal-400 font-medium hover:underline">
                  {isNepali ? 'आफ्नो सम्पत्ति निःशुल्क दर्ता गर्नुहोस्' : 'List Property (Owner Flow)'}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-orange-400 font-medium hover:underline">
                  {isNepali ? 'प्रशासन प्यानल (Middleman CRM)' : 'Admin Portal & CRM'}
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-teal-400 transition-colors">
                  {isNepali ? 'सुरक्षित गरिएका सम्पत्तिहरू' : 'Saved Properties'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  {isNepali ? 'हाम्रो बारेमा' : 'About Himal Estates'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  {isNepali ? 'सम्पर्क तथा सोधपुछ' : 'Contact & Support'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {brand.year} {brand.name}. {isNepali ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/admin" className="hover:text-orange-400 transition-colors">Broker Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
