import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Logo } from '@/components/brand/Logo';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="text-center max-w-md bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-700 mx-auto flex items-center justify-center font-bold text-2xl mb-4">
            404
          </div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            The property or page you are looking for doesn’t exist or has been relocated by our team.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              Back to Home
            </Link>
            <Link
              href="/listings"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-xs transition-colors"
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
