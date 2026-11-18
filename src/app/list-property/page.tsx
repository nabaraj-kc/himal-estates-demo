'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { createSellerSubmission } from '@/lib/storage';
import { useLanguage } from '@/context/LanguageContext';
import { brand } from '@/config/brand';
import {
  Building2,
  Home,
  MapPin,
  Store,
  Hotel,
  Briefcase,
  CheckCircle2,
  Upload,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Phone,
  Image as ImageIcon,
  Trash2,
} from 'lucide-react';

export default function ListPropertyPage() {
  const { isNepali } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  // Form State
  const [type, setType] = useState<'rent' | 'sale'>('rent');
  const [category, setCategory] = useState('apartment');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState('perMonth');
  const [description, setDescription] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  ]);

  const categories = [
    { id: 'apartment', label: 'Flat / Apartment', icon: <Building2 className="w-5 h-5" /> },
    { id: 'house', label: 'House / Bungalow', icon: <Home className="w-5 h-5" /> },
    { id: 'land', label: 'Land / Ghaderi', icon: <MapPin className="w-5 h-5" /> },
    { id: 'shop', label: 'Shop / Shutter', icon: <Store className="w-5 h-5" /> },
    { id: 'hotel', label: 'Hotel / Resort', icon: <Hotel className="w-5 h-5" /> },
    { id: 'business', label: 'Running Business', icon: <Briefcase className="w-5 h-5" /> },
  ];

  const handleAddSampleImage = () => {
    const samples = [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ];
    const nextImg = samples[images.length % samples.length];
    setImages([...images, nextImg]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !ownerName || !ownerPhone || !price) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const numericPrice = parseFloat(price.replace(/[^0-9]/g, '')) || 50000;
      const res = createSellerSubmission({
        title,
        type,
        category,
        price: numericPrice,
        priceType,
        area: area || '1000 sq.ft',
        location,
        ownerName,
        ownerPhone,
        ownerEmail: ownerEmail || 'owner@example.com',
        description: description || 'Property submitted by owner for review.',
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
      });
      setIsSubmitting(false);
      setSubmissionId(res.id);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 dark:bg-teal-950/60 text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>{isNepali ? 'सम्पत्ति धनीहरूको लागि' : 'Owner Listing Flow'}</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            {isNepali ? 'आफ्नो सम्पत्ति निःशुल्क दर्ता गर्नुहोस्' : 'List Your Property on Himal Estates'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {isNepali
              ? 'हाम्रो मध्यस्थता टोलीले स्थलगत प्रमाणीकरण गरेर तपाईंको सम्पत्ति फेसबुक र टिकटकमा हजारौं खरीददारहरूसम्म पुर्याउनेछ।'
              : 'Submit your property details. Our broker team inspects the listing and publishes it to our site and 50k+ social audience.'}
          </p>
        </div>

        {/* Success View */}
        {submissionId ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 text-center border border-slate-200 dark:border-slate-800 shadow-xl max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              {isNepali ? 'सम्पत्ति सफलतापूर्वक प्राप्त भयो!' : 'Listing Submitted Successfully!'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {isNepali
                ? `तपाईंको सूची सन्दर्भ नम्बर #${submissionId} हो। हाम्रो काठमाडौं टोलीले २४ घण्टाभित्र स्थलगत निरीक्षणका लागि तपाईंलाई फोन गर्नेछ।`
                : `Your submission ID is #${submissionId}. It is currently in the Admin Approval Queue. Our team will verify documents and approve it.`}
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-xs text-teal-800 dark:text-teal-300 text-left space-y-1.5 border border-teal-200">
              <div className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>What Happens Next?</span>
              </div>
              <p>1. Our local broker calls you on {ownerPhone} to schedule a quick 10-minute site inspection.</p>
              <p>2. We take high-resolution photos and verify the property boundary lines.</p>
              <p>3. Your listing goes live and is promoted across our TikTok and Facebook community.</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/admin"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                View in Admin Approval Queue
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200 transition-colors"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-Step Wizard */
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-xl">
            {/* Step Indicator */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100 dark:border-slate-800">
              {[
                { step: 1, label: '1. Property Type' },
                { step: 2, label: '2. Location & Specs' },
                { step: 3, label: '3. Photos' },
                { step: 4, label: '4. Contact & Submit' },
              ].map((s) => (
                <div
                  key={s.step}
                  className={`flex items-center gap-2 text-xs font-semibold ${
                    currentStep === s.step
                      ? 'text-teal-700 dark:text-teal-400'
                      : currentStep > s.step
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-400'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      currentStep === s.step
                        ? 'bg-teal-700 text-white'
                        : currentStep > s.step
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {currentStep > s.step ? '✓' : s.step}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* STEP 1: TYPE & CATEGORY */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Listing Purpose
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setType('rent');
                          setPriceType('perMonth');
                        }}
                        className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all ${
                          type === 'rent'
                            ? 'border-teal-600 bg-teal-50/60 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 ring-2 ring-teal-600'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {isNepali ? 'भाडामा दिन चाहन्छु (For Rent)' : 'For Rent'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setType('sale');
                          setPriceType('total');
                        }}
                        className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all ${
                          type === 'sale'
                            ? 'border-teal-600 bg-teal-50/60 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 ring-2 ring-teal-600'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {isNepali ? 'बिक्री गर्न चाहन्छु (For Sale)' : 'For Sale'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Property Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCategory(c.id)}
                          className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-semibold transition-all ${
                            category === c.id
                              ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 ring-2 ring-teal-600'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 text-teal-700 shadow-xs">
                            {c.icon}
                          </div>
                          <span>{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Property Headline / Catchy Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Spacious 2BHK Flat with Parking in Kapan Paiyatar"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: LOCATION & SPECS */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Location / Full Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Kapan Paiyatar, Near Milan Chowk, Kathmandu"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Area / Size (in Aana, Ropani or Sq.Ft)
                      </label>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. 4 Aana or 1200 sq.ft"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Expected Price (NPR) *
                      </label>
                      <input
                        type="text"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 35000 (monthly) or 25000000 (total)"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Description & Features
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Mention road width, water supply, parking, floor level, and any special terms..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* STEP 3: PHOTOS */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Property Photos ({images.length})
                      </label>
                      <button
                        type="button"
                        onClick={handleAddSampleImage}
                        className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline"
                      >
                        + Add Simulated Photo
                      </button>
                    </div>

                    {/* Drag-and-drop simulated box */}
                    <div
                      onClick={handleAddSampleImage}
                      className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-8 text-center cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 mx-auto flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                        Click to upload photos
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        High-resolution photos increase buyer inquiries by 4x. (JPG, PNG up to 10MB)
                      </p>
                    </div>

                    {/* Image Previews */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                      {images.map((url, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                          <img src={url} alt="upload preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          {idx === 0 && (
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-teal-700 text-white text-[10px] font-bold">
                              Primary Cover
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: OWNER CONTACT & SUBMISSION */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-xs text-teal-800 dark:text-teal-300 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-700" />
                      <span>Privacy & Middleman Policy</span>
                    </div>
                    <p>
                      Your direct phone number will NOT be published publicly on social media or the site. Himal Estates acts as your middleman to filter out non-serious callers.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Umesh Gautam"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        WhatsApp or Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="e.g. 9841XXXXXX"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        placeholder="e.g. owner@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-md shadow-orange-700/20 transition-all active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting to Queue...' : 'Submit Property for Verification'}</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
