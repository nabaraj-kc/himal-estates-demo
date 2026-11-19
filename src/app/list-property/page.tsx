'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { createSellerSubmission } from '@/lib/storage';
import { ListingCategory, ListingType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import {
  Building2,
  Home,
  Store,
  Hotel,
  Briefcase,
  Layers,
  Upload,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Trash2,
} from 'lucide-react';

export default function ListPropertyPage() {
  const { isNepali } = useLanguage();

  // Wizard Step: 1 = Type/Category, 2 = Details & Location, 3 = Photos, 4 = Contact/Submit
  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields
  const [type, setType] = useState<ListingType>('rent');
  const [category, setCategory] = useState<ListingCategory>('apartment');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState<'total' | 'perMonth' | 'perAana'>('perMonth');
  const [area, setArea] = useState('');
  const [areaUnit, setAreaUnit] = useState<'aana' | 'ropani' | 'sqft'>('aana');
  const [location, setLocation] = useState('');

  // Contact Info
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');

  // Sample Photos
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const categories: { id: ListingCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'apartment', label: isNepali ? 'फ्ल्याट / अपार्टमेन्ट' : 'Flat / Apartment', icon: <Building2 className="w-5 h-5" /> },
    { id: 'room', label: isNepali ? 'कोठा' : 'Single Room', icon: <Home className="w-5 h-5" /> },
    { id: 'house', label: isNepali ? 'घर / विला' : 'House / Villa', icon: <Home className="w-5 h-5" /> },
    { id: 'land', label: isNepali ? 'जग्गा' : 'Land / Plot', icon: <Layers className="w-5 h-5" /> },
    { id: 'shop', label: isNepali ? 'पसल / सटर' : 'Shop / Shutter', icon: <Store className="w-5 h-5" /> },
    { id: 'hotel', label: isNepali ? 'होटल / रिसोर्ट' : 'Hotel / Lodge', icon: <Hotel className="w-5 h-5" /> },
    { id: 'business', label: isNepali ? 'चालु व्यवसाय' : 'Running Business', icon: <Briefcase className="w-5 h-5" /> },
  ];

  const handleAddSampleImage = () => {
    const samples = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    ];
    const nextImg = samples[images.length % samples.length];
    setImages([...images, nextImg]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const numericPrice = parseInt(price.replace(/[^0-9]/g, ''), 10) || 50000;

    setTimeout(() => {
      const res = createSellerSubmission({
        title: title || 'New Property Submission',
        type: type === 'rent' ? 'rent' : 'sale',
        category,
        price: numericPrice,
        priceType,
        area: area || '4 Aana',
        location: location || 'Kathmandu, Nepal',
        ownerName: ownerName || 'Property Owner',
        ownerPhone: ownerPhone || '98XXXXXXXX',
        ownerEmail: ownerEmail || '',
        description: description || 'Owner listing submitted for review by Himal Estates middleman service.',
        images: images,
      });

      setIsSubmitting(false);
      setSubmissionId(res.id);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Top Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <h1 className="font-extrabold text-2xl sm:text-3xl text-[#0F0F0F] tracking-tight">
            {isNepali ? 'आफ्नो सम्पत्ति दर्ता गर्नुहोस्' : 'Post Your Property Ad'}
          </h1>
          <p className="text-xs text-[#71717A] mt-1.5">
            {isNepali
              ? 'हाम्रो मध्यस्थता टोलीले स्थलगत प्रमाणीकरण गरेर तपाईंको सम्पत्ति सूचीकरण गर्नेछ।'
              : 'Submit your listing. Our broker team inspects the property, verifies details, and handles inquiries.'}
          </p>
        </div>

        {/* Success View */}
        {submissionId ? (
          <div className="bg-white rounded-2xl p-8 sm:p-10 text-center border border-[#E5E5E5] max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-[#F5F5F7] text-[#0F0F0F] mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="font-bold text-xl text-[#0F0F0F]">
              {isNepali ? 'सम्पत्ति सफलतापूर्वक प्राप्त भयो!' : 'Ad Submitted Successfully!'}
            </h2>
            <p className="text-xs text-[#71717A] mt-2 leading-relaxed">
              {isNepali
                ? `तपाईंको सूची सन्दर्भ नम्बर #${submissionId} हो। हाम्रो टोलीले प्रमाणीकरणका लागि तपाईंलाई फोन गर्नेछ।`
                : `Your submission ID is #${submissionId}. It has been placed in the verification queue.`}
            </p>

            <div className="mt-5 p-4 rounded-xl bg-[#F5F5F7] text-xs text-[#0F0F0F] text-left space-y-1.5 border border-[#E5E5E5]">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0F0F0F]" />
                <span>Next Steps:</span>
              </div>
              <p className="text-[#71717A]">1. Our broker will call {ownerPhone} to schedule a quick site inspection.</p>
              <p className="text-[#71717A]">2. We verify ownership documents and capture verified photos.</p>
              <p className="text-[#71717A]">3. Your listing is published on Himal Estates and our verified channels.</p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <Link
                href="/admin"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F0F0F] hover:bg-[#27272A] text-white font-semibold text-xs transition-colors"
              >
                View in Admin Queue
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] border border-[#E5E5E5] font-semibold text-xs hover:bg-[#E5E5E5] transition-colors"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-Step Wizard */
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E5E5]">
            {/* Step Indicator */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#E5E5E5]">
              {[
                { step: 1, label: '1. Type' },
                { step: 2, label: '2. Location & Specs' },
                { step: 3, label: '3. Photos' },
                { step: 4, label: '4. Contact & Submit' },
              ].map((s) => (
                <div
                  key={s.step}
                  className={`flex items-center gap-2 text-xs font-semibold ${
                    currentStep >= s.step
                      ? 'text-[#0F0F0F]'
                      : 'text-[#71717A]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      currentStep === s.step
                        ? 'bg-[#0F0F0F] text-white'
                        : currentStep > s.step
                        ? 'bg-[#0F0F0F] text-white'
                        : 'bg-[#F5F5F7] text-[#71717A]'
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
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0F0F0F] uppercase tracking-wider mb-2">
                      Listing Purpose
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setType('rent');
                          setPriceType('perMonth');
                        }}
                        className={`p-3.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          type === 'rent'
                            ? 'border-[#0F0F0F] bg-[#F5F5F7] text-[#0F0F0F] ring-1 ring-[#0F0F0F]'
                            : 'border-[#E5E5E5] text-[#71717A] hover:border-[#0F0F0F] hover:text-[#0F0F0F]'
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
                        className={`p-3.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          type === 'sale'
                            ? 'border-[#0F0F0F] bg-[#F5F5F7] text-[#0F0F0F] ring-1 ring-[#0F0F0F]'
                            : 'border-[#E5E5E5] text-[#71717A] hover:border-[#0F0F0F] hover:text-[#0F0F0F]'
                        }`}
                      >
                        {isNepali ? 'बिक्री गर्न चाहन्छु (For Sale)' : 'For Sale'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F0F0F] uppercase tracking-wider mb-2">
                      Property Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCategory(c.id)}
                          className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-medium transition-all ${
                            category === c.id
                              ? 'border-[#0F0F0F] bg-[#F5F5F7] text-[#0F0F0F] ring-1 ring-[#0F0F0F] font-semibold'
                              : 'border-[#E5E5E5] text-[#71717A] hover:border-[#0F0F0F] hover:text-[#0F0F0F]'
                          }`}
                        >
                          <div className="p-1.5 rounded-lg bg-white text-[#0F0F0F] border border-[#E5E5E5]">
                            {c.icon}
                          </div>
                          <span>{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F0F0F] mb-1.5">
                      Property Headline / Catchy Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Spacious 2BHK Flat with Parking in Kapan Paiyatar"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: LOCATION & SPECS */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0F0F0F] mb-1.5">
                      Location / Full Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Kapan Paiyatar, Near Milan Chowk, Kathmandu"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F0F0F] mb-1.5">
                        Area / Size (in Aana, Ropani or Sq.Ft)
                      </label>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. 4 Aana or 1200 sq.ft"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F0F0F] mb-1.5">
                        Expected Price (NPR) *
                      </label>
                      <input
                        type="text"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 35000 (monthly) or 25000000 (total)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F0F0F] mb-1.5">
                      Description & Features
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Mention road width, water supply, parking, floor level, and any special terms..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* STEP 3: PHOTOS */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-[#0F0F0F] uppercase tracking-wider">
                        Property Photos ({images.length})
                      </label>
                      <button
                        type="button"
                        onClick={handleAddSampleImage}
                        className="text-xs font-medium text-[#71717A] hover:text-[#0F0F0F] hover:underline"
                      >
                        + Add Simulated Photo
                      </button>
                    </div>

                    {/* Drag-and-drop simulated box */}
                    <div
                      onClick={handleAddSampleImage}
                      className="border border-dashed border-[#E5E5E5] rounded-2xl p-6 text-center cursor-pointer hover:bg-[#F5F5F7] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#F5F5F7] text-[#0F0F0F] mx-auto flex items-center justify-center mb-2">
                        <Upload className="w-5 h-5" />
                      </div>
                      <h4 className="font-semibold text-xs text-[#0F0F0F]">
                        Click to upload photos
                      </h4>
                      <p className="text-[11px] text-[#71717A] mt-0.5">
                        JPG, PNG up to 10MB
                      </p>
                    </div>

                    {/* Image Previews */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                      {images.map((url, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E5E5E5] group">
                          <img src={url} alt="upload preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-[#0F0F0F]/80 text-white hover:bg-black transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          {idx === 0 && (
                            <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#0F0F0F] text-white text-[9px] font-bold">
                              Cover
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
                <div className="space-y-5">
                  <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-xs text-[#0F0F0F] space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#0F0F0F]" />
                      <span>Privacy & Brokerage Policy</span>
                    </div>
                    <p className="text-[#71717A]">
                      Your phone number is kept confidential. Himal Estates filters inquiries and schedules serious viewings.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F0F0F] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Umesh Gautam"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F0F0F] mb-1.5">
                        WhatsApp or Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="e.g. 9841XXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F0F0F] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        placeholder="e.g. owner@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#E5E5E5]">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E5E5E5] text-[#0F0F0F] hover:bg-[#F5F5F7] text-xs font-semibold"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0F0F0F] hover:bg-[#27272A] text-white text-xs font-semibold shadow-xs transition-all"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F0F0F] hover:bg-[#27272A] text-white text-xs font-semibold shadow-xs transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Ad...' : 'Publish Listing'}</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
