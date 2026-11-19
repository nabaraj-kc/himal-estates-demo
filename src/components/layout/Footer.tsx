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
    <footer className="bg-white text-[#71717A] border-t border-[#E5E5E5] pt-8 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 pb-8 border-b border-[#E5E5E5]">
          {/* Col 1 & 2: Brand Info */}
          <div className="col-span-2 space-y-3">
            <Logo size="sm" showTagline={false} />
            <p className="text-xs text-[#71717A] leading-relaxed max-w-sm">
              {isNepali
                ? 'नेपालको प्रमाणित घर, फ्ल्याट, घडेरी तथा चलिरहेका व्यापारिक सम्पत्तिहरूको विश्वसनीय बजार।'
                : "Nepal's trusted property and business marketplace. Verified listings across Kathmandu, Lalitpur, Bhaktapur, and Pokhara."}
            </p>

            <div className="space-y-1.5 pt-1 text-xs text-[#71717A]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0F0F0F] flex-shrink-0" />
                <span>{brand.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0F0F0F] flex-shrink-0" />
                <a href={`tel:${brand.phone}`} className="hover:text-[#0F0F0F] transition-colors">
                  {brand.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0F0F0F] flex-shrink-0" />
                <a href={`mailto:${brand.email}`} className="hover:text-[#0F0F0F] transition-colors">
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
                className="px-2.5 py-1 rounded-lg bg-[#F5F5F7] hover:bg-[#E5E5E5] text-[#0F0F0F] border border-[#E5E5E5] flex items-center gap-1 transition-colors font-medium text-[11px]"
              >
                <span>Facebook</span>
                <ArrowUpRight className="w-3 h-3 text-[#71717A]" />
              </a>
              <a
                href={brand.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-[#F5F5F7] hover:bg-[#E5E5E5] text-[#0F0F0F] border border-[#E5E5E5] flex items-center gap-1 transition-colors font-medium text-[11px]"
              >
                <span>TikTok</span>
                <ArrowUpRight className="w-3 h-3 text-[#71717A]" />
              </a>
              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-[#F5F5F7] hover:bg-[#E5E5E5] text-[#0F0F0F] border border-[#E5E5E5] flex items-center gap-1 transition-colors font-medium text-[11px]"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-[#71717A]" />
              </a>
            </div>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h3 className="text-[#0F0F0F] font-bold text-xs uppercase tracking-wider mb-2.5">
              {isNepali ? 'सम्पत्ति प्रकार' : 'Categories'}
            </h3>
            <ul className="space-y-1.5 text-xs text-[#71717A]">
              <li>
                <Link href="/listings?category=apartment" className="hover:text-[#0F0F0F] transition-colors">
                  {isNepali ? 'फ्ल्याट तथा अपार्टमेन्ट' : 'Flats & Apartments'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=house" className="hover:text-[#0F0F0F] transition-colors">
                  {isNepali ? 'घर तथा बंगलाहरू' : 'Houses & Villas'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=land" className="hover:text-[#0F0F0F] transition-colors">
                  {isNepali ? 'जमिन तथा घडेरी (आना/रोपनी)' : 'Land & Plots'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=shop" className="hover:text-[#0F0F0F] transition-colors">
                  {isNepali ? 'पसल तथा सटर' : 'Shops & Retail'}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=business" className="hover:text-[#0F0F0F] transition-colors">
                  {isNepali ? 'चलिरहेका व्यवसाय' : 'Running Businesses'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Locations */}
          <div>
            <h3 className="text-[#0F0F0F] font-bold text-xs uppercase tracking-wider mb-2.5">
              {isNepali ? 'प्रमुख स्थानहरू' : 'Locations'}
            </h3>
            <ul className="space-y-1.5 text-xs text-[#71717A]">
              <li>
                <Link href="/listings?location=Jhamsikhel" className="hover:text-[#0F0F0F] transition-colors">
                  Jhamsikhel, Lalitpur
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Lazimpat" className="hover:text-[#0F0F0F] transition-colors">
                  Lazimpat, Kathmandu
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Imadol" className="hover:text-[#0F0F0F] transition-colors">
                  Imadol, Mahalaxmi
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Budhanilkantha" className="hover:text-[#0F0F0F] transition-colors">
                  Budhanilkantha
                </Link>
              </li>
              <li>
                <Link href="/listings?location=Pokhara" className="hover:text-[#0F0F0F] transition-colors">
                  Pokhara Lakeside
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Quick Links & Staff Login */}
          <div>
            <h3 className="text-[#0F0F0F] font-bold text-xs uppercase tracking-wider mb-2.5">
              {isNepali ? 'सेवा तथा पोर्टल' : 'Services'}
            </h3>
            <ul className="space-y-1.5 text-xs text-[#71717A]">
              <li>
                <Link href="/post" className="text-[#0F0F0F] font-semibold hover:underline">
                  {isNepali ? '+ नयाँ विज्ञापन पोस्ट गर्नुहोस्' : '+ Post Free Ad'}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#0F0F0F] transition-colors">
                  {isNepali ? 'सबै श्रेणीहरू' : 'All Categories'}
                </Link>
              </li>
              <li>
                <Link href="/notifications" className="hover:text-[#0F0F0F] transition-colors">
                  {isNepali ? 'सूचनाहरू (Alerts)' : 'Notifications'}
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-[#0F0F0F] transition-colors">
                  {isNepali ? 'सुरक्षित गरिएका सूचीहरू' : 'Saved Properties'}
                </Link>
              </li>
              <li>
                <Link href="/inbox" className="hover:text-[#0F0F0F] transition-colors">
                  {isNepali ? 'इन्बक्स तथा च्याट' : 'Client-Agent Inbox'}
                </Link>
              </li>
              <li className="pt-1.5 border-t border-[#E5E5E5]">
                <Link href="/admin" className="text-[#71717A] hover:text-[#0F0F0F] transition-colors">
                  {isNepali ? 'ब्रोकर / स्टाफ पोर्टल' : 'Broker / Staff Portal'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#71717A] gap-3">
          <p>© 2026 {brand.name}. {isNepali ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-[#0F0F0F] transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-[#0F0F0F] transition-colors">Privacy</Link>
            <Link href="/account" className="hover:text-[#0F0F0F] transition-colors">My Account</Link>
            <Link href="/admin" className="text-[#71717A] hover:text-[#0F0F0F] transition-colors">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
