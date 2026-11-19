import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="text-center max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-[#E5E5E5]">
          <div className="w-14 h-14 rounded-full bg-[#F5F5F7] text-[#0F0F0F] mx-auto flex items-center justify-center font-bold text-xl mb-3">
            404
          </div>
          <h1 className="font-bold text-xl text-[#0F0F0F]">
            Page Not Found
          </h1>
          <p className="text-xs text-[#71717A] mt-1.5 leading-relaxed">
            The property or page you are looking for does not exist or has been relocated.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <Link
              href="/"
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0F0F0F] hover:bg-[#27272A] text-white font-semibold text-xs transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/listings"
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] border border-[#E5E5E5] hover:bg-[#E5E5E5] font-semibold text-xs transition-colors"
            >
              Explore Listings
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
