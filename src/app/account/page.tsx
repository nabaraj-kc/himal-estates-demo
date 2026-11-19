'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { brand } from '@/config/brand';
import { resetDemoData } from '@/lib/storage';
import {
  User,
  Heart,
  MessageCircle,
  PlusSquare,
  Globe,
  Shield,
  Phone,
  HelpCircle,
  ChevronRight,
  RotateCcw,
  Edit2,
  FileText,
} from 'lucide-react';

export default function AccountPage() {
  const { language, toggleLanguage, isNepali } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('Sandip Sharma');
  const [userPhone, setUserPhone] = useState('+977-9851123456');

  const handleReset = () => {
    if (confirm(isNepali ? 'के तपाईं सबै डेमो डाटा रिसेट गर्न चाहनुहुन्छ?' : 'Reset all demo data to original state?')) {
      resetDemoData();
      alert(isNepali ? 'डेमो डाटा सफलतापूर्वक रिसेट भयो।' : 'Demo data reset successfully.');
    }
  };

  const accountRows = [
    {
      title: isNepali ? 'मेरो सूचीहरू (My Listings)' : 'My Listings',
      subtitle: isNepali ? 'तपाईंले पोस्ट गर्नुभएका सम्पत्तिहरू' : 'Properties you submitted or posted',
      href: '/post',
      icon: PlusSquare,
    },
    {
      title: isNepali ? 'सुरक्षित गरिएका सम्पत्तिहरू' : 'Saved Properties',
      subtitle: isNepali ? 'तपाईंले मन पराउनुभएका बुकमार्कहरू' : 'Your bookmarked homes and plots',
      href: '/saved',
      icon: Heart,
    },
    {
      title: isNepali ? 'एजेन्ट इन्बक्स तथा च्याट' : 'Client-Agent Inbox',
      subtitle: isNepali ? 'ब्रोकरहरूसँगको प्रत्यक्ष कुराकानी' : 'Direct conversations with assigned brokers',
      href: '/inbox',
      icon: MessageCircle,
    },
    {
      title: isNepali ? 'भाषा परिवर्तन (Language)' : 'Language (EN / नेपाली)',
      subtitle: language === 'en' ? 'Currently English (नेपालीमा स्विच गर्नुहोस्)' : 'हाल नेपाली (Switch to English)',
      onClick: toggleLanguage,
      icon: Globe,
    },
    {
      title: isNepali ? 'सहयोग तथा सम्पर्क' : 'Help & Support',
      subtitle: isNepali ? 'कार्यालय ठेगाना र सम्पर्क नम्बर' : 'Customer care helpline and office details',
      href: '/contact',
      icon: HelpCircle,
    },
    {
      title: isNepali ? 'ब्रोकर / स्टाफ पोर्टल' : 'Broker / Staff Portal',
      subtitle: isNepali ? 'एजेन्सी ड्यासबोर्ड, लिड र कमिसन ट्र्याकर' : 'Middleman CRM & commission tracker',
      href: '/admin',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F0F0F]">
      <Navbar />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* User Profile Header */}
        <div className="p-5 rounded-2xl border border-[#E5E5E5] bg-white shadow-sm mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full bg-[#0F0F0F] text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                {userName.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h1 className="font-bold text-base sm:text-lg text-[#0F0F0F] truncate">
                  {userName}
                </h1>
                <p className="text-xs text-[#71717A] mt-0.5">{userPhone}</p>
                <p className="text-[11px] text-[#71717A]">Kathmandu, Nepal • Verified Account</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E5E5] bg-[#F5F5F7] hover:bg-[#E5E5E5] text-xs font-semibold text-[#0F0F0F] transition-colors flex-shrink-0"
            >
              <Edit2 className="w-3.5 h-3.5 text-[#71717A]" />
              <span>{isEditing ? (isNepali ? 'रद्द' : 'Cancel') : isNepali ? 'सम्पादन' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Quick Edit Drawer inline */}
          {isEditing && (
            <div className="mt-4 pt-4 border-t border-[#E5E5E5] space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#71717A] mb-1">
                  {isNepali ? 'पूरा नाम' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F0F0F]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#71717A] mb-1">
                  {isNepali ? 'सम्पर्क नम्बर' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F0F0F]"
                />
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="w-full py-2 bg-[#0F0F0F] text-white text-xs font-semibold rounded-lg hover:bg-[#27272A] transition-colors"
              >
                {isNepali ? 'परिवर्तन सुरक्षित गर्नुहोस्' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

        {/* Quick Monochrome List Rows */}
        <div className="border border-[#E5E5E5] rounded-2xl overflow-hidden divide-y divide-[#E5E5E5] bg-white shadow-sm mb-6">
          {accountRows.map((row, idx) => {
            const Icon = row.icon;
            const content = (
              <div className="flex items-center justify-between p-4 hover:bg-[#F5F5F7] transition-colors group cursor-pointer">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] group-hover:bg-[#0F0F0F] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-xs sm:text-sm text-[#0F0F0F] block truncate">
                      {row.title}
                    </span>
                    <span className="text-[11px] text-[#71717A] truncate block mt-0.5">
                      {row.subtitle}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#71717A] group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </div>
            );

            if (row.onClick) {
              return (
                <div key={idx} onClick={row.onClick}>
                  {content}
                </div>
              );
            }

            return (
              <Link key={idx} href={row.href!}>
                {content}
              </Link>
            );
          })}
        </div>

        {/* Helpline Contact Card */}
        <div className="p-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#71717A] mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-bold text-[#0F0F0F] block">
              {brand.name} Helpline
            </span>
            <span>Tel: {brand.phone} • {brand.address}</span>
          </div>
          <a
            href={`tel:${brand.phone}`}
            className="px-3 py-1.5 rounded-lg bg-[#0F0F0F] text-white text-xs font-semibold hover:bg-[#27272A] transition-colors"
          >
            Call Support
          </a>
        </div>

        {/* Reset Demo Data Action */}
        <div className="text-center pt-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-[#71717A] hover:text-[#0F0F0F] transition-colors"
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
