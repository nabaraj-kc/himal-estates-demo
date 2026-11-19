import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { brand } from '@/config/brand';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white w-full max-w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-16 min-w-0">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">Last updated: November 2024</p>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-slate-900">1. Information We Collect</h2>
            <p>
              When you submit a property inquiry or list a property on {brand.name}, we collect your name, contact telephone/WhatsApp number, and property preference details.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-slate-900">2. Middleman Confidentiality</h2>
            <p>
              Property owners’ personal phone numbers and private addresses are kept confidential until an inspection is verified and approved. We never sell your contact details to third-party telemarketers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-slate-900">3. Contact Us</h2>
            <p>
              If you have any questions regarding our data practices, please reach out to us at {brand.email} or call {brand.phone}.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
