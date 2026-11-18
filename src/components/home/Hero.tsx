'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  Search,
  MapPin,
  Building2,
  Home,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';

export function Hero() {
  const router = useRouter();
  const { isNepali } = useLanguage();

  const [activeTab, setActiveTab] = useState<'all' | 'rent' | 'sale' | 'business'>('all');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('all');
  const [budget, setBudget] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (activeTab !== 'all') {
      if (activeTab === 'business') {
        params.set('category', 'business');
      } else {
        params.set('type', activeTab);
      }
    }

    if (category !== 'all') {
      params.set('category', category);
    }

    if (location.trim()) {
      params.set('location', location.trim());
    }

    if (budget !== 'all') {
      params.set('budget', budget);
    }

    router.push(`/listings?${params.toString()}`);
  };

  const quickSearches = [
    { label: isNepali ? 'झम्सिखेल ३ बीएचके' : 'Jhamsikhel 3BHK', query: 'location=Jhamsikhel&category=apartment' },
    { label: isNepali ? 'इमाडोल ४ आना जग्गा' : 'Imadol 4 Aana Land', query: 'location=Imadol&category=land' },
    { label: isNepali ? 'बानेश्वर फ्ल्याट' : 'Baneshwor Flat', query: 'location=Baneshwor&type=rent' },
    { label: isNepali ? 'सानेपा बंगला' : 'Sanepa House', query: 'location=Sanepa&category=house' },
    { label: isNepali ? 'पोखरा लेकसाइड' : 'Pokhara Lakeside', query: 'location=Pokhara' },
    { label: isNepali ? 'न्यूरोड सटर' : 'New Road Shop', query: 'location=New Road&category=shop' },
  ];

  return (
    <section className="relative w-full pt-6 pb-8 sm:pt-10 sm:pb-12 overflow-hidden bg-slate-50 border-b border-slate-200/90">
      {/* Real Architectural / Valley texture background overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80')`,
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Architectural Headline with tight vertical rhythm */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight leading-[1.2]">
            {isNepali ? (
              'नेपालका प्रमाणित घर, जमिन तथा व्यापारिक सम्पत्तिहरू'
            ) : (
              'Verified Property & Business Marketplace in Nepal'
            )}
          </h1>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            {isNepali
              ? 'काठमाडौं उपत्यका र पोखरामा स्थलगत जाँच गरिएका कोठा, फ्ल्याट, आना/रोपनी घडेरी र चलिरहेका व्यवसायहरू। पारदर्शी मूल्यांकन र कानुनी सहयोग।'
              : 'Direct verified listings across Kathmandu, Lalitpur, Bhaktapur & Pokhara. Inspected boundary lines, verified title deeds, and dedicated field inspection.'}
          </p>
        </div>

        {/* Structured High-Contrast Search Engine Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: isNepali ? 'सबै सूचीहरू' : 'All Properties' },
              { id: 'rent', label: isNepali ? 'भाडामा (Rent)' : 'For Rent' },
              { id: 'sale', label: isNepali ? 'बिक्रीमा (Sale)' : 'For Sale' },
              { id: 'business', label: isNepali ? 'चलिरहेको व्यवसाय' : 'Businesses' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Inputs Form */}
          <form onSubmit={handleSearch} className="mt-3.5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Location Input */}
            <div className="sm:col-span-4 relative">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                {isNepali ? 'स्थान / क्षेत्र' : 'Location / Neighborhood'}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={isNepali ? 'जस्तै: Jhamsikhel, Baneshwor...' : 'e.g. Jhamsikhel, Sanepa, Baneshwor...'}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="sm:col-span-3 relative">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                {isNepali ? 'सम्पत्ति प्रकार' : 'Property Type'}
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-3 pr-7 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white appearance-none"
                >
                  <option value="all">{isNepali ? 'सबै प्रकार' : 'All Types'}</option>
                  <option value="apartment">{isNepali ? 'फ्ल्याट तथा अपार्टमेन्ट' : 'Flats & Apartments'}</option>
                  <option value="house">{isNepali ? 'घर तथा बंगला' : 'Houses & Villas'}</option>
                  <option value="land">{isNepali ? 'जमिन तथा घडेरी (आना)' : 'Land & Plots (Aana)'}</option>
                  <option value="shop">{isNepali ? 'पसल तथा सटर' : 'Shops & Shutters'}</option>
                  <option value="hotel">{isNepali ? 'होटल तथा रिसोर्ट' : 'Hotels & Lodges'}</option>
                  <option value="business">{isNepali ? 'चलिरहेको व्यवसाय' : 'Running Businesses'}</option>
                </select>
                <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Budget Range */}
            <div className="sm:col-span-3 relative">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                {isNepali ? 'बजेट सीमा' : 'Budget Bracket'}
              </label>
              <div className="relative">
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-3 pr-7 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white appearance-none"
                >
                  <option value="all">{isNepali ? 'कुनै पनि बजेट' : 'Any Budget'}</option>
                  <option value="under-30k">{isNepali ? 'रु ३०,००० मुनि (भाडा)' : 'Under NPR 30k'}</option>
                  <option value="30k-80k">{isNepali ? 'रु ३०,००० - ८०,०००' : 'NPR 30k - 80k'}</option>
                  <option value="80k-200k">{isNepali ? 'रु ८०,००० - २ लाख' : 'NPR 80k - 2 Lakh'}</option>
                  <option value="under-3cr">{isNepali ? 'रु ३ करोड मुनि (बिक्री)' : 'Under NPR 3 Crore'}</option>
                  <option value="3cr-plus">{isNepali ? 'रु ३ करोड माथि' : 'NPR 3 Crore+'}</option>
                </select>
                <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Search Submit Button */}
            <div className="sm:col-span-2 sm:self-end">
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isNepali ? 'खोज्नुहोस्' : 'Find Listings'}</span>
              </button>
            </div>
          </form>

          {/* Quick Search Chips */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-medium">{isNepali ? 'प्रचलित खोज:' : 'Popular Searches:'}</span>
            {quickSearches.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => router.push(`/listings?${chip.query}`)}
                className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-800 transition-colors text-[11px] font-medium"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Trust Signals Bar (Right above the listings fold) */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
            <div className="font-display font-bold text-lg sm:text-xl text-slate-900">
              1,250+
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {isNepali ? 'स्थलगत प्रमाणित सूचीहरू' : 'Physically Inspected Listings'}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
            <div className="font-display font-bold text-lg sm:text-xl text-teal-800">
              15 Min
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {isNepali ? 'द्रुत WhatsApp सम्पर्क' : 'WhatsApp Agent Response'}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
            <div className="font-display font-bold text-lg sm:text-xl text-slate-900">
              NPR 48 Cr+
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {isNepali ? 'सम्पन्न कारोबार मूल्य' : 'Deals Facilitated'}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
            <div className="font-display font-bold text-lg sm:text-xl text-emerald-700">
              100%
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {isNepali ? 'लालपुर्जा तथा नक्सा प्रमाणिकरण' : 'Lalpurja & Deed Verification'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
