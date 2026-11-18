import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { brand } from '@/config/brand';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400">Last updated: November 2024</p>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-slate-900">1. Middleman Advisory Role</h2>
            <p>
              {brand.name} acts as a professional real-estate and business deal facilitator in Nepal. We connect verified property owners and sellers with prospective buyers and tenants.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-slate-900">2. Commission & Fees</h2>
            <p>
              Our standard middleman facilitation fee is 2% of the agreed transaction value for property sales, or 50% of the first month rent for long-term rental leases, payable upon successful contract execution at the competent Malpot (Land Revenue) office or upon lease signing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-slate-900">3. Verification Guarantee</h2>
            <p>
              We physically verify listings, inspect boundary lines, and review Lalpurja documents. However, parties are encouraged to conduct independent title investigations prior to final consideration transfer.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
