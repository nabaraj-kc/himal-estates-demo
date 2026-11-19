'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { brand } from '@/config/brand';
import { resetDemoData } from '@/lib/storage';
import {
  User,
  Heart,
  MessageSquare,
  PlusCircle,
  Globe,
  Shield,
  Phone,
  RotateCcw,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function ProfilePage() {
  const { language, toggleLanguage, isNepali } = useLanguage();

  const handleReset = () => {
    if (confirm(isNepali ? 'के तपाईं सबै डेमो डाटा सुरुवाती अवस्थामा रिसेट गर्न चाहनुहुन्छ?' : 'Reset all demo data to original state?')) {
      resetDemoData();
      alert(isNepali ? 'डेमो डाटा सफलतापूर्वक रिसेट भयो।' : 'Demo data reset successfully.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827]">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 sm:py-10">
        {/* User Card */}
        <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-teal-800 text-white font-bold text-lg flex items-center justify-center">
              HE
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg text-[#111827]">
                {isNepali ? 'अतिथि प्रयोगकर्ता (नेपाल)' : 'Guest User / Buyer'}
              </h1>
              <p className="text-xs text-gray-500">
                {isNepali ? 'काठमाडौं, नेपाल' : 'Kathmandu Valley, Nepal'}
              </p>
            </div>
          </div>

          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Globe className="w-3.5 h-3.5 text-teal-800" />
            <span>{language === 'en' ? 'नेपाली' : 'English'}</span>
          </button>
        </div>

        {/* Quick Menu List */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100 bg-white mb-6">
          <Link
            href="/list-property"
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-sm text-[#111827] block">
                  {isNepali ? 'सम्पत्ति निःशुल्क पोस्ट गर्नुहोस्' : 'Post a Property (Free)'}
                </span>
                <span className="text-xs text-gray-500">
                  {isNepali ? 'फ्ल्याट, घर, जग्गा वा व्यवसाय' : 'List rooms, houses, land or businesses'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            href="/saved"
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-sm text-[#111827] block">
                  {isNepali ? 'सुरक्षित गरिएका सूचीहरू' : 'Saved Properties'}
                </span>
                <span className="text-xs text-gray-500">
                  {isNepali ? 'तपाईंले मन पराउनुभएका सम्पत्तिहरू' : 'View your favorite bookmarks'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            href="/inbox"
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-sm text-[#111827] block">
                  {isNepali ? 'एजेन्ट सन्देश तथा कुराकानी' : 'Agent Inbox & Chats'}
                </span>
                <span className="text-xs text-gray-500">
                  {isNepali ? 'सम्पत्ति सम्बन्धी छलफल र सोधपुछ' : 'Active broker chats and site visit timing'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            href="/admin"
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-sm text-[#111827] block">
                  {isNepali ? 'ब्रोकर तथा स्टाफ पोर्टल' : 'Broker / Staff Portal'}
                </span>
                <span className="text-xs text-gray-500">
                  {isNepali ? 'व्यवस्थापक ड्यासबोर्ड र कमिसन ट्र्याकर' : 'Admin CRM, lead pipeline & commission tracker'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
        </div>

        {/* Agency Contacts */}
        <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/40 mb-6 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {isNepali ? 'हेल्पलाइन तथा कार्यालय सम्पर्क' : 'Agency Helpline & Support'}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href={`tel:${brand.phone}`}
              className="inline-flex items-center gap-1.5 font-semibold text-teal-800 hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{brand.phone}</span>
            </a>
            <a
              href={`tel:${brand.mobile}`}
              className="inline-flex items-center gap-1.5 font-semibold text-teal-800 hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{brand.mobile}</span>
            </a>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{brand.address}</span>
          </div>
        </div>

        {/* Reset Demo Data Action */}
        <div className="pt-2 text-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-rose-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isNepali ? 'डेमो डाटा रिसेट गर्नुहोस्' : 'Reset Demo Data'}</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
