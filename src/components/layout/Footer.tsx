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
  ArrowUpRight,
} from 'lucide-react';

export function Footer() {
  const { isNepali } = useLanguage();

  return (
    <footer className="bg-gray-50 text-gray-600 border-t border-gray-200 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 pb-8 border-b border-gray-200">
          {/* Col 1 & 2: Brand Info */}
          <div className="col-span-2 space-y-3">
            <Logo size="sm" showTagline={false} />
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              {isNepali
                ? 'नेपालको प्रमाणित घर, फ्ल्याट, घडेरी तथा चलिरहेका व्यापारिक सम्पत्तिहरूको विश्वसनीय बजार।'
                : "Nepal's trusted property and business marketplace. Verified listings across Kathmandu, Lalitpur, Bhaktapur, and Pokhara."}
            </p>

            <div className="space-y-1.5 pt-1 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                <span>{brand.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                <a href={`tel:${brand.phone}`} className="hover:text-teal-800 transition-colors">
                  {brand.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                <a href={`mailto:${brand.email}`} className="hover:text-teal-800 transition-colors">
                  {brand.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <a
                href={brand.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-1 transition-colors"
              >
                <span>Facebook</span>
                <ArrowUpRight className="w-3 h-3 text-gray-400" />
              </a>
              <a
                href={brand.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-1 transition-colors"
              >
                <span>TikTok</span>
                <ArrowUpRight className="w-3 h-3 text-gray-400" />
              </a>
              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-1 transition-colors"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h3 className="text-[#111827] font-semibold text-xs uppercase tracking-wider mb-2.5">
              {isNepali ? 'सम्पत्ति प्रकार' : 'Categories'}
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li>
                <Link href="/listings?category=apartment" className="hover:text-teal-800 transition-colors">
                  {isNepali ? 'फ्ल्याट तथा अपार्टमेन्ट' : 'Flats & Apartments'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=house" className="hover:text-teal-800 transition-colors">
                  {isNepali ? 'घर तथा बंगलाहरू' : 'Houses & Villas'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=land" className="hover:text-teal-800 transition-colors">
                  {isNepali ? 'जमिन तथा घडेरी (आना/रोपनी)' : 'Land & Plots'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=shop" className="hover:text-teal-800 transition-colors">
                  {isNepali ? 'पसल तथा सटर' : 'Shops & Retail'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=business" className="hover:text-teal-800 transition-colors">
                  {isNepali ? 'चलिरहेका व्यवसाय' : 'Running Businesses'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Locations */}
          <div>
            <h3 className="text-[#111827] font-semibold text-xs uppercase tracking-wider mb-2.5">
              {isNepali ? 'प्रमुख स्थानहरू' : 'Locations'}
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li>
                <Link href="/listings?location=Jhamsikhel" className="hover:text-teal-800 transition-colors">
                  Jhamsikhel, Lalitpur
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Lazimpat" className="hover:text-teal-800 transition-colors">
                  Lazimpat, Kathmandu
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Imadol" className="hover:text-teal-800 transition-colors">
                  Imadol, Mahalaxmi
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Budhanilkantha" className="hover:text-teal-800 transition-colors">
                  Budhanilkantha
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Pokhara" className="hover:text-teal-800 transition-colors">
                  Pokhara Lakeside
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Quick Links & Staff Login */}
          <div>
            <h3 className="text-[#111827] font-semibold text-xs uppercase tracking-wider mb-2.5">
              {isNepali ? 'सेवा तथा पोर्टल' : 'Services'}
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li>
                <Link href="/list-property" className="text-teal-800 font-medium hover:underline">
                  {isNepali ? 'सम्पत्ति पोस्ट गर्नुहोस्' : '+ Post Free Ad'}
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-teal-800 transition-colors">
                  {isNepali ? 'सुरक्षित गरिएका सूचीहरू' : 'Saved Properties'}
                </Link>
              </li>
              <li>
                <Link href="/inbox" className="hover:text-teal-800 transition-colors">
                  {isNepali ? 'इन्बक्स तथा च्याट' : 'Client-Agent Inbox'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-800 transition-colors">
                  {isNepali ? 'हाम्रो बारेमा' : 'About Himal Estates'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-800 transition-colors">
                  {isNepali ? 'सम्पर्क तथा सहयोग' : 'Contact Support'}
                </Link>
              </li>
              <li className="pt-1.5 border-t border-gray-200">
                <Link href="/admin" className="text-gray-500 hover:text-teal-800 transition-colors">
                  {isNepali ? 'ब्रोकर / स्टाफ पोर्टल' : 'Broker / Staff Portal'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© 2026 {brand.name}. {isNepali ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
            <Link href="/profile" className="hover:text-gray-700 transition-colors">My Account</Link>
            <Link href="/admin" className="text-gray-400 hover:text-gray-700 transition-colors">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
