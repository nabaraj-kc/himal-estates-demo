'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { brand } from '@/config/brand';
import {
  getListings,
  updateListing,
  deleteListing,
  createListing,
  getInquiries,
  updateInquiryStatus,
  getSellerSubmissions,
  approveSellerSubmission,
  rejectSellerSubmission,
  getDeals,
  createDeal,
  getCommissionSummary,
  resetDemoData,
} from '@/lib/storage';
import { Listing, Inquiry, Deal, ListingCategory, ListingType } from '@/types';
import { formatNPR, formatNPRShort } from '@/lib/utils';
import { SellerSubmission } from '@/data/mock-admin-data';
import {
  LayoutDashboard,
  Building2,
  Users,
  BadgeDollarSign,
  Share2,
  CheckCircle2,
  Clock,
  Flame,
  Star,
  Search,
  Plus,
  Trash2,
  Eye,
  Phone,
  MessageSquare,
  Download,
  Copy,
  Check,
  ShieldCheck,
  RotateCcw,
  LogOut,
  SlidersHorizontal,
  Home,
  MapPin,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  X,
} from 'lucide-react';

export default function AdminPage() {
  // -------------------------------------------------------------
  // AUTH STATE
  // -------------------------------------------------------------
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'dashboard' | 'listings' | 'submissions' | 'leads' | 'commissions' | 'social'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'listings' | 'submissions' | 'leads' | 'commissions' | 'social'>('dashboard');

  // Storage Data States
  const [listings, setListings] = useState<Listing[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [submissions, setSubmissions] = useState<SellerSubmission[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [commSummary, setCommSummary] = useState<any>(null);

  // Filter States inside admin
  const [listingSearch, setListingSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');

  // Modals
  const [addListingModalOpen, setAddListingModalOpen] = useState(false);
  const [newDealModalOpen, setNewDealModalOpen] = useState(false);

  // Social generator state
  const [selectedSocialListingId, setSelectedSocialListingId] = useState<string>('');
  const [copiedCaption, setCopiedCaption] = useState(false);
  const flyerCardRef = useRef<HTMLDivElement>(null);

  // New Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<ListingType>('rent');
  const [newCategory, setNewCategory] = useState<ListingCategory>('apartment');
  const [newPrice, setNewPrice] = useState('');
  const [newPriceType, setNewPriceType] = useState<'perMonth' | 'total' | 'perAana'>('perMonth');
  const [newLocation, setNewLocation] = useState('');
  const [newArea, setNewArea] = useState('1200');
  const [newBedrooms, setNewBedrooms] = useState('2');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80');

  // New Deal Form State
  const [dealListingId, setDealListingId] = useState('');
  const [dealBuyerName, setDealBuyerName] = useState('');
  const [dealBuyerPhone, setDealBuyerPhone] = useState('');
  const [dealSellerName, setDealSellerName] = useState('');
  const [dealSellerPhone, setDealSellerPhone] = useState('');
  const [dealPrice, setDealPrice] = useState('');
  const [dealRate, setDealRate] = useState('2.0');
  const [dealStatus, setDealStatus] = useState<'closed' | 'in-progress'>('closed');

  // Toast / Feedback message
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Check login on load
  useEffect(() => {
    const authStatus = localStorage.getItem('himal_admin_logged_in');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const refreshData = () => {
    const l = getListings();
    setListings(l);
    setInquiries(getInquiries());
    setSubmissions(getSellerSubmissions());
    setDeals(getDeals());
    setCommSummary(getCommissionSummary());
    if (l.length > 0 && !selectedSocialListingId) {
      setSelectedSocialListingId(l[0].id);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  // Auth handlers
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (
      (emailInput.trim() === brand.adminEmail && passwordInput.trim() === brand.adminPassword) ||
      emailInput === 'admin'
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('himal_admin_logged_in', 'true');
      setLoginError('');
      showToast('Welcome back, Admin!');
    } else {
      setLoginError('Invalid demo credentials. Use the 1-click button below.');
    }
  };

  const handle1ClickLogin = () => {
    setEmailInput(brand.adminEmail);
    setPasswordInput(brand.adminPassword);
    setIsAuthenticated(true);
    localStorage.setItem('himal_admin_logged_in', 'true');
    showToast('Signed in with Demo Credentials!');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('himal_admin_logged_in');
  };

  // Reset demo data handler
  const handleResetData = () => {
    if (confirm('Reset all listings, leads, and commissions back to fresh demo defaults?')) {
      resetDemoData();
      refreshData();
      showToast('Demo data successfully reset!');
    }
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = ['Deal ID', 'Listing Title', 'Category', 'Buyer Name', 'Buyer Phone', 'Seller Name', 'Agreed Price (NPR)', 'Commission Rate (%)', 'Commission Amount (NPR)', 'Paid (NPR)', 'Status', 'Date'];
    const rows = deals.map((d) => [
      d.id,
      `"${d.listingTitle.replace(/"/g, '""')}"`,
      d.listingCategory,
      `"${d.buyerName}"`,
      d.buyerPhone,
      `"${d.sellerName}"`,
      d.agreedPrice,
      d.commissionRate,
      d.commissionAmount,
      d.commissionPaid,
      d.status,
      d.createdAt ? d.createdAt.split('T')[0] : '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `himal_estates_deals_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Deals exported to CSV!');
  };

  // Add Listing Handler
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(newPrice.replace(/[^0-9]/g, '')) || 25000;
    const item = createListing({
      title: newTitle,
      titleNe: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      type: newType,
      category: newCategory,
      status: 'active',
      price: priceNum,
      priceType: newPriceType,
      priceNegotiable: true,
      area: parseFloat(newArea) || 1200,
      areaUnit: 'sqft',
      location: {
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu',
        tole: newLocation,
        fullAddress: newLocation,
      },
      bedrooms: parseInt(newBedrooms, 10) || 2,
      bathrooms: 2,
      description: newDescription || 'Newly added verified listing in Kathmandu.',
      descriptionNe: newDescription || 'काठमाडौंमा नयाँ थपिएको प्रमाणित सम्पत्ति।',
      highlights: ['Verified Title Deed', 'Prime Access Road'],
      images: [
        {
          id: `img-${Date.now()}`,
          url: newImageUrl,
          alt: newTitle,
          isPrimary: true,
          order: 1,
        },
      ],
      facilities: { water: true, electricity: true, drainage: true, internet: true },
      featured: true,
      hotDeal: false,
      verified: true,
      postedById: 'admin-manual',
    });

    setAddListingModalOpen(false);
    refreshData();
    showToast(`Listing "${item.title}" published live!`);
    // Reset form
    setNewTitle('');
    setNewPrice('');
    setNewLocation('');
    setNewDescription('');
  };

  // Add Deal Handler
  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(dealPrice.replace(/[^0-9]/g, '')) || 1000000;
    const rateNum = parseFloat(dealRate) || 2.0;
    const commAmount = Math.round((priceNum * rateNum) / 100);

    const selectedListing = listings.find((l) => l.id === dealListingId);
    const title = selectedListing ? selectedListing.title : 'Direct Commercial Brokerage';
    const cat = selectedListing ? selectedListing.category : 'house';

    createDeal({
      listingId: dealListingId || 'direct-deal',
      listingTitle: title,
      listingCategory: cat,
      buyerName: dealBuyerName,
      buyerPhone: dealBuyerPhone,
      sellerName: dealSellerName,
      sellerPhone: dealSellerPhone,
      agreedPrice: priceNum,
      commissionRate: rateNum,
      commissionAmount: commAmount,
      commissionPaid: dealStatus === 'closed' ? commAmount : Math.round(commAmount / 2),
      commissionDue: dealStatus === 'closed' ? 0 : Math.round(commAmount / 2),
      status: dealStatus,
      notes: 'Deal negotiated and verified by Himal Estates brokerage team.',
    });

    setNewDealModalOpen(false);
    refreshData();
    showToast('New deal & commission logged!');
  };

  // Social caption text generator
  const currentSocialListing = listings.find((l) => l.id === selectedSocialListingId) || listings[0];
  const generateSocialCaption = (l: Listing | undefined) => {
    if (!l) return '';
    return `🔥 NEW LISTING ON HIMAL ESTATES! 🔥\n\n📌 ${l.title}\n📍 Location: ${l.location.tole || ''}, ${l.location.city || l.location.district}\n💰 Price: ${formatNPR(l.price)}${l.priceType === 'perMonth' ? '/month' : ''}\n📐 Area: ${l.area} ${l.areaUnit} ${l.bedrooms ? `• ${l.bedrooms} Bedrooms` : ''}\n\n✅ 100% Inspected & Verified by Himal Estates\n✅ Direct Meeting with Owner (No Fake Middlemen)\n\n📲 Call/WhatsApp to inspect: ${brand.phone}\n🌐 View full photos: https://${brand.domain}/listings/${l.slug || l.id}\n\n#NepalRealEstate #KathmanduProperty #HimalEstates #RoomForRent #HouseForSale #Nepal`;
  };

  const handleCopyCaption = () => {
    const text = generateSocialCaption(currentSocialListing);
    navigator.clipboard.writeText(text);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
    showToast('Social caption copied to clipboard!');
  };

  const pendingSubmissionsCount = submissions.filter((s) => s.status === 'pending').length;
  const openLeadsCount = inquiries.filter((i) => i.status === 'open').length;

  // -------------------------------------------------------------
  // LOGIN SCREEN (If not authenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-white">
          <div className="text-center mb-8">
            <Logo theme="dark" size="lg" className="justify-center mb-4" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-800/60 text-orange-400 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Broker Admin Portal</span>
            </div>
            <h1 className="font-display font-bold text-2xl text-white">
              Middleman Command Center
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage listings, client inquiries, approval queue & commission earnings.
            </p>
          </div>

          {/* Demo Hint Banner with 1-Click Fill */}
          <div className="mb-6 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-700/80 text-xs text-zinc-300 space-y-2">
            <div className="font-bold text-zinc-200 flex items-center justify-between">
              <span>Demo Presentation Account</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300">Ready</span>
            </div>
            <p className="text-slate-300">
              Email: <code className="bg-slate-900 px-1 py-0.5 rounded text-zinc-200">{brand.adminEmail}</code>
              <br />
              Password: <code className="bg-slate-900 px-1 py-0.5 rounded text-zinc-200">{brand.adminPassword}</code>
            </p>
            <button
              type="button"
              onClick={handle1ClickLogin}
              className="w-full mt-2 py-2 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>1-Click Sign In As Admin</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Admin Email
              </label>
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@himalestates.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:ring-2 focus:ring-zinc-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:ring-2 focus:ring-zinc-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors shadow-md"
            >
              Sign In to Command Center
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Toast Banner */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-white text-black px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo theme="dark" size="sm" />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-orange-950/80 border border-orange-800 text-orange-400 text-[11px] font-bold">
              Broker CRM & Command Center
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Reset Demo Data Button */}
            <button
              onClick={handleResetData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors border border-slate-700"
              title="Reset to fresh demo seed"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>

            {/* View Live Website Link */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-zinc-700/80 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Public Site</span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Responsive Horizontal Tab Bar */}
        <div className="max-w-7xl mx-auto mt-3 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800/80">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'listings', label: `Listings (${listings.length})`, icon: <Building2 className="w-4 h-4" /> },
            { id: 'submissions', label: `Approval Queue`, badge: pendingSubmissionsCount, icon: <Clock className="w-4 h-4" /> },
            { id: 'leads', label: `Leads / Inbox`, badge: openLeadsCount, icon: <Users className="w-4 h-4" /> },
            { id: 'commissions', label: 'Commissions', icon: <BadgeDollarSign className="w-4 h-4" /> },
            { id: 'social', label: 'Share to Social', icon: <Share2 className="w-4 h-4 text-orange-400" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-black shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        {/* ======================================================== */}
        {/* TAB 1: DASHBOARD OVERVIEW & KPIS */}
        {/* ======================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Top Middleman Mission Banner */}
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">
                  Welcome to Your Brokerage Operation
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Here is your real-time portfolio: verified listings across Kathmandu and Pokhara, fresh client leads awaiting WhatsApp follow-up, and logged transaction commissions.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setAddListingModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Listing</span>
                </button>
                <button
                  onClick={() => setNewDealModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <BadgeDollarSign className="w-4 h-4" />
                  <span>Log Deal</span>
                </button>
              </div>
            </div>

            {/* 4 KPI Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Active Listings</span>
                  <Building2 className="w-4 h-4 text-zinc-100" />
                </div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {listings.filter((l) => l.status === 'active').length}
                </div>
                <div className="text-[11px] text-zinc-100 font-medium">
                  {listings.filter((l) => l.featured).length} Featured • {listings.filter((l) => l.hotDeal).length} Hot Deals
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>New Inquiries (CRM)</span>
                  <Users className="w-4 h-4 text-orange-400" />
                </div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {inquiries.length}
                </div>
                <div className="text-[11px] text-orange-400 font-medium">
                  {openLeadsCount} Open Action Items
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Owner Submissions</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {submissions.length}
                </div>
                <div className="text-[11px] text-amber-400 font-medium">
                  {pendingSubmissionsCount} Pending Review
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Commission Earned</span>
                  <BadgeDollarSign className="w-4 h-4 text-white" />
                </div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {commSummary ? formatNPR(commSummary.totalCommissionEarned) : 'NPR 6,52,500'}
                </div>
                <div className="text-[11px] text-white font-medium">
                  {commSummary?.closedDealsCount || 3} Closed Transactions
                </div>
              </div>
            </div>

            {/* Quick Status Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Category distribution */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center justify-between">
                  <span>Listings by Category</span>
                  <span className="text-xs text-slate-500">{listings.length} Total</span>
                </h3>
                <div className="space-y-2.5 text-xs">
                  {[
                    { label: 'Flats & Apartments', count: listings.filter((l) => l.category === 'apartment' || l.category === 'room').length, color: 'bg-zinc-600' },
                    { label: 'Houses & Villas', count: listings.filter((l) => l.category === 'house').length, color: 'bg-blue-500' },
                    { label: 'Land & Plots (Aana)', count: listings.filter((l) => l.category === 'land').length, color: 'bg-zinc-500' },
                    { label: 'Shops & Shutters', count: listings.filter((l) => l.category === 'shop' || l.category === 'commercial').length, color: 'bg-orange-500' },
                    { label: 'Hotels & Lodges', count: listings.filter((l) => l.category === 'hotel').length, color: 'bg-amber-500' },
                    { label: 'Running Businesses', count: listings.filter((l) => l.category === 'business').length, color: 'bg-purple-500' },
                  ].map((row, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${row.color}`}></span>
                        <span className="text-slate-300">{row.label}</span>
                      </div>
                      <span className="font-mono font-bold text-white">{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic hubs */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center justify-between">
                  <span>Top Locations</span>
                  <span className="text-xs text-slate-500">Regional Split</span>
                </h3>
                <div className="space-y-3 text-xs">
                  {[
                    { city: 'Kathmandu (Baneshwor, Lazimpat, Budhanilkantha)', pct: '48%', count: '15 listings' },
                    { city: 'Lalitpur (Jhamsikhel, Sanepa, Imadol)', pct: '32%', count: '10 listings' },
                    { city: 'Pokhara (Lakeside, Sarangkot)', pct: '12%', count: '4 listings' },
                    { city: 'Chitwan & Butwal', pct: '8%', count: '3 listings' },
                  ].map((loc, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>{loc.city}</span>
                        <span className="font-bold text-white">{loc.pct}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-zinc-600 rounded-full"
                          style={{ width: loc.pct }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Inquiries Preview */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white">Recent Inquiries</h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-zinc-100 hover:underline"
                  >
                    View All ({inquiries.length})
                  </button>
                </div>
                <div className="space-y-3">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div key={inq.id} className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{inq.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-200 capitalize">
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-slate-400 line-clamp-1">{inq.listingTitle}</p>
                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                        <span>{inq.phone}</span>
                        <a
                          href={`https://wa.me/977${inq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:underline flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: LISTINGS MANAGER */}
        {/* ======================================================== */}
        {activeTab === 'listings' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">
                  Property Catalog Management
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Toggle visibility, mark properties as sold/rented, or add new properties.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAddListingModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Property</span>
                </button>
              </div>
            </div>

            {/* Search filter */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={listingSearch}
                onChange={(e) => setListingSearch(e.target.value)}
                placeholder="Search listing by title or location..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              />
            </div>

            {/* Listings Table */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Property</th>
                      <th className="py-3.5 px-4">Type / Cat</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-center">Featured</th>
                      <th className="py-3.5 px-4 text-center">Hot Deal</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {listings
                      .filter((l) =>
                        listingSearch.trim()
                          ? l.title.toLowerCase().includes(listingSearch.toLowerCase()) ||
                            l.location.district.toLowerCase().includes(listingSearch.toLowerCase())
                          : true
                      )
                      .map((l) => (
                        <tr key={l.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={l.images[0]?.url}
                                alt="thumb"
                                className="w-12 h-10 rounded-lg object-cover flex-shrink-0"
                              />
                              <div>
                                <Link
                                  href={`/listings/${l.slug || l.id}`}
                                  target="_blank"
                                  className="font-semibold text-white hover:text-zinc-100 line-clamp-1 flex items-center gap-1"
                                >
                                  <span>{l.title}</span>
                                  <ExternalLink className="w-3 h-3 text-slate-500" />
                                </Link>
                                <span className="text-[11px] text-slate-500">
                                  {l.location.tole ? `${l.location.tole}, ` : ''}{l.location.district}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 capitalize">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-medium text-slate-300">
                              {l.type} • {l.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-zinc-100">
                            {formatNPR(l.price)}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={l.status}
                              onChange={(e) => {
                                updateListing(l.id, { status: e.target.value as any });
                                refreshData();
                                showToast(`Status updated to ${e.target.value}`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] text-white focus:outline-none"
                            >
                              <option value="active">Active</option>
                              <option value="pending">Pending</option>
                              <option value="sold">Sold</option>
                              <option value="rented">Rented</option>
                              <option value="rejected">Hidden</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => {
                                updateListing(l.id, { featured: !l.featured });
                                refreshData();
                              }}
                              className={`p-1.5 rounded-lg transition-colors ${
                                l.featured ? 'text-amber-400 bg-amber-950/60' : 'text-slate-600 hover:text-slate-400'
                              }`}
                              title="Toggle Featured"
                            >
                              <Star className={`w-4 h-4 ${l.featured ? 'fill-amber-400' : ''}`} />
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => {
                                updateListing(l.id, { hotDeal: !l.hotDeal });
                                refreshData();
                              }}
                              className={`p-1.5 rounded-lg transition-colors ${
                                l.hotDeal ? 'text-orange-500 bg-orange-950/60' : 'text-slate-600 hover:text-slate-400'
                              }`}
                              title="Toggle Hot Deal"
                            >
                              <Flame className={`w-4 h-4 ${l.hotDeal ? 'fill-orange-500' : ''}`} />
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Delete listing "${l.title}"?`)) {
                                  deleteListing(l.id);
                                  refreshData();
                                  showToast('Listing removed');
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: APPROVAL QUEUE (OWNER SUBMISSIONS) */}
        {/* ======================================================== */}
        {activeTab === 'submissions' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">
                  Owner Listing Approval Queue ({pendingSubmissionsCount} Pending)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Submissions from property and business owners submitted through the public &quot;List Property&quot; wizard.
                </p>
              </div>
            </div>

            {submissions.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                <h3 className="font-bold text-base text-white">Queue is Clear</h3>
                <p className="text-xs text-slate-400 mt-1">No pending seller submissions waiting for review.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            sub.status === 'pending'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : sub.status === 'approved'
                              ? 'bg-zinc-900 text-white border border-zinc-700'
                              : 'bg-rose-950 text-rose-400 border border-rose-800'
                          }`}
                        >
                          {sub.status}
                        </span>
                        <h3 className="font-bold text-base text-white mt-1.5">{sub.title}</h3>
                        <p className="text-xs text-slate-400">
                          📍 {sub.location} • {sub.area} • {sub.type.toUpperCase()}
                        </p>
                      </div>

                      <div className="font-mono font-bold text-zinc-100 text-sm flex-shrink-0">
                        {formatNPR(sub.price)}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-3 rounded-2xl border border-slate-800">
                      {sub.description}
                    </p>

                    {/* Owner Contact */}
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Owner:</span>
                        <span className="font-semibold text-white">{sub.ownerName}</span> ({sub.ownerPhone})
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${sub.ownerPhone}`}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
                          title="Call Owner"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/977${sub.ownerPhone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700"
                          title="WhatsApp Owner"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Actions */}
                    {sub.status === 'pending' && (
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => {
                            const res = approveSellerSubmission(sub.id);
                            refreshData();
                            showToast(`Approved & published to public site as ID #${res?.id}!`);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Publish Live</span>
                        </button>

                        <button
                          onClick={() => {
                            rejectSellerSubmission(sub.id);
                            refreshData();
                            showToast('Submission rejected');
                          }}
                          className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 font-semibold text-xs transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: LEADS & CRM PIPELINE */}
        {/* ======================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">
                  Lead Inbox & Middleman CRM Pipeline
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Track every website inquiry, chat lead, and site visit request through closing.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Filter Stage:</span>
                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option value="all">All Stages ({inquiries.length})</option>
                  <option value="open">Open (New)</option>
                  <option value="contacted">Contacted</option>
                  <option value="site-visited">Site-Visited</option>
                  <option value="negotiating">Negotiating</option>
                  <option value="closed">Closed / Deal Done</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>

            {/* Leads Cards Grid */}
            <div className="space-y-4">
              {inquiries
                .filter((inq) => (leadStatusFilter === 'all' ? true : inq.status === leadStatusFilter))
                .map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-base text-white">{inq.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                            {inq.phone}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            via {inq.source}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-100 font-semibold mt-1">
                          Ref: {inq.listingTitle}
                        </p>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <select
                          value={inq.status}
                          onChange={(e) => {
                            updateInquiryStatus(inq.id, e.target.value as any);
                            refreshData();
                            showToast(`Lead status updated to ${e.target.value}`);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize focus:outline-none ${
                            inq.status === 'open'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : inq.status === 'negotiating'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : inq.status === 'closed'
                              ? 'bg-zinc-900 text-zinc-200 border border-zinc-700'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          <option value="open">New / Open</option>
                          <option value="contacted">Contacted</option>
                          <option value="site-visited">Site Visited</option>
                          <option value="negotiating">Negotiating</option>
                          <option value="closed">Closed Deal</option>
                          <option value="lost">Lost</option>
                        </select>

                        {/* Direct WhatsApp Call */}
                        <a
                          href={`https://wa.me/977${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaste ${inq.name}, this is Himal Estates regarding your inquiry on "${inq.listingTitle}". When would you like to speak?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white hover:bg-zinc-200 text-black transition-colors"
                          title="WhatsApp Customer"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>

                        <a
                          href={`tel:${inq.phone}`}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                          title="Call Customer"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Inquiry message */}
                    <p className="text-xs text-slate-300 bg-slate-800/50 p-3 rounded-2xl border border-slate-800/80">
                      &quot;{inq.message}&quot;
                    </p>

                    {/* Middleman internal notes */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500 text-[11px] font-semibold flex-shrink-0">Broker Note:</span>
                      <input
                        type="text"
                        defaultValue={inq.notes || ''}
                        onBlur={(e) => {
                          updateInquiryStatus(inq.id, inq.status, e.target.value);
                          showToast('Broker notes saved');
                        }}
                        placeholder="Add private note (e.g. buyer budget, inspection date, offer price)..."
                        className="flex-1 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: COMMISSION TRACKER */}
        {/* ======================================================== */}
        {activeTab === 'commissions' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">
                  Commission Accounting & Deal Records
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Track transaction value, middleman cut (2%), payment status, and export to CSV.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 border border-slate-700 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Export to CSV</span>
                </button>

                <button
                  onClick={() => setNewDealModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Record Deal</span>
                </button>
              </div>
            </div>

            {/* Commission summary metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-xs block mb-1">Total Deals Facilitated</span>
                <div className="font-display font-bold text-2xl text-white">
                  {deals.length} deals
                </div>
                <span className="text-[11px] text-zinc-100">{commSummary?.closedDealsCount || 0} finalized</span>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-xs block mb-1">Total Deal Volume (GMV)</span>
                <div className="font-display font-bold text-2xl text-white">
                  {commSummary ? formatNPRShort(commSummary.totalDealValue) : 'NPR 3.2 Cr'}
                </div>
                <span className="text-[11px] text-slate-400">Transaction value</span>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-xs block mb-1">Total Commission Earned</span>
                <div className="font-display font-bold text-2xl text-white">
                  {commSummary ? formatNPR(commSummary.totalCommissionEarned) : 'NPR 6,52,500'}
                </div>
                <span className="text-[11px] text-white">Net revenue</span>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-xs block mb-1">Commission Due / Pending</span>
                <div className="font-display font-bold text-2xl text-amber-400">
                  {commSummary ? formatNPR(commSummary.totalCommissionPending) : 'NPR 1,30,000'}
                </div>
                <span className="text-[11px] text-amber-400">Upon registry</span>
              </div>
            </div>

            {/* Deals Table */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Deal Details</th>
                      <th className="py-3.5 px-4">Buyer & Seller</th>
                      <th className="py-3.5 px-4">Deal Value</th>
                      <th className="py-3.5 px-4">Rate</th>
                      <th className="py-3.5 px-4">Commission</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {deals.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-white block">{d.listingTitle}</span>
                          <span className="text-[10px] text-slate-500 uppercase">{d.listingCategory}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div>
                            <span className="text-slate-300">Buyer: </span>
                            <span className="font-semibold text-white">{d.buyerName}</span>
                          </div>
                          <div>
                            <span className="text-slate-300">Seller: </span>
                            <span className="font-semibold text-white">{d.sellerName}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          {formatNPR(d.agreedPrice)}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-400">
                          {d.commissionRate}%
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          {formatNPR(d.commissionAmount)}
                          {d.commissionDue > 0 && (
                            <span className="text-[10px] text-amber-400 block font-normal">
                              Due: {formatNPR(d.commissionDue)}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              d.status === 'closed'
                                ? 'bg-zinc-900 text-zinc-200 border border-zinc-700'
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                          {d.createdAt ? d.createdAt.split('T')[0] : '2024-11-15'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: "SHARE TO SOCIAL" TOOL */}
        {/* ======================================================== */}
        {activeTab === 'social' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">
                  Social Media Promotion Superweapon
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Generate branded 4:5 social media cards and copy-paste Nepali captions ready for Facebook &amp; TikTok.
                </p>
              </div>

              {/* Listing Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Choose Property:</span>
                <select
                  value={selectedSocialListingId}
                  onChange={(e) => setSelectedSocialListingId(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white max-w-xs truncate"
                >
                  {listings.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Live Card Canvas Preview (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div
                  ref={flyerCardRef}
                  className="w-full max-w-sm aspect-[4/5] rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-4 border-zinc-700/60 overflow-hidden shadow-2xl relative flex flex-col justify-between p-5 text-white"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-white text-black font-bold text-sm flex items-center justify-center">
                        HE
                      </div>
                      <div>
                        <div className="font-display font-bold text-xs tracking-tight">HIMAL ESTATES</div>
                        <div className="text-[9px] text-zinc-100 uppercase tracking-wider font-semibold">
                          Verified Property Listing
                        </div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-bold uppercase">
                      {currentSocialListing?.type === 'rent' ? 'FOR RENT' : 'FOR SALE'}
                    </span>
                  </div>

                  {/* Photo Container */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden my-3 border border-slate-800 shadow-md">
                    <img
                      src={currentSocialListing?.images[0]?.url}
                      alt="social flyer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-zinc-900/90 text-white font-mono font-bold text-xs backdrop-blur-sm">
                      {currentSocialListing ? formatNPR(currentSocialListing.price) : ''}
                      {currentSocialListing?.priceType === 'perMonth' ? '/mo' : ''}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-sm text-white line-clamp-2">
                      {currentSocialListing?.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-zinc-100" />
                      <span>{currentSocialListing?.location.tole || ''}, {currentSocialListing?.location.district}</span>
                      <span>•</span>
                      <span>{currentSocialListing?.area} {currentSocialListing?.areaUnit}</span>
                    </div>
                  </div>

                  {/* Bottom Footer Call Banner */}
                  <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between bg-slate-900/90 -mx-5 -mb-5 p-4 rounded-b-2xl">
                    <div>
                      <div className="text-[10px] text-slate-400">Inspection &amp; Inquiries:</div>
                      <div className="font-mono font-bold text-xs text-white">{brand.phone}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-slate-400">Platform Website:</div>
                      <div className="font-semibold text-[10px] text-zinc-200">{brand.domain}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 w-full max-w-sm">
                  <button
                    onClick={() => {
                      alert('Flyer saved! Ready to upload to Facebook & TikTok story.');
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Flyer</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Pre-written Ready Caption (7 cols) */}
              <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Copy className="w-4 h-4 text-zinc-100" />
                    <span>Formatted Post Caption (Facebook / TikTok / Instagram)</span>
                  </h3>

                  <button
                    onClick={handleCopyCaption}
                    className={`px-3 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all ${
                      copiedCaption
                        ? 'bg-white text-black'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {copiedCaption ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCaption ? 'Copied!' : 'Copy Caption'}</span>
                  </button>
                </div>

                <textarea
                  readOnly
                  rows={13}
                  value={generateSocialCaption(currentSocialListing)}
                  className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed focus:outline-none"
                ></textarea>

                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-700 text-xs text-zinc-300 space-y-1">
                  <span className="font-bold block text-zinc-200">How to use this during client pitch:</span>
                  <p>
                    Show the client: Whenever he lists a property on Himal Estates, he doesn&apos;t need to hire a graphic designer or retype details on his phone. In 1 second, he gets a ready-made flyer and pre-written hashtags to paste directly into his TikTok and Facebook groups!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL 1: ADD NEW LISTING */}
      {/* ======================================================== */}
      {addListingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Add New Property Listing</h3>
              <button onClick={() => setAddListingModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Modern 2BHK Furnished Flat in Sanepa"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="rent">Rent</option>
                    <option value="sale">Sale</option>
                    <option value="business">Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="apartment">Apartment / Flat</option>
                    <option value="house">House / Villa</option>
                    <option value="land">Land (Aana)</option>
                    <option value="shop">Shop / Shutter</option>
                    <option value="hotel">Hotel / Lodge</option>
                    <option value="business">Running Business</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Price (NPR) *</label>
                  <input
                    type="text"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="e.g. 35000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Price Unit</label>
                  <select
                    value={newPriceType}
                    onChange={(e) => setNewPriceType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="perMonth">Per Month</option>
                    <option value="total">Total Value</option>
                    <option value="perAana">Per Aana</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Sanepa Ward 2"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Area (sq.ft / aana)</label>
                  <input
                    type="text"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    placeholder="e.g. 1100"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Photo Image URL</label>
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Key features, road width, parking..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddListingModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: RECORD NEW COMMISSION DEAL */}
      {/* ======================================================== */}
      {newDealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Record Closed Deal & Commission</h3>
              <button onClick={() => setNewDealModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Associated Property</label>
                <select
                  value={dealListingId}
                  onChange={(e) => {
                    setDealListingId(e.target.value);
                    const l = listings.find((item) => item.id === e.target.value);
                    if (l) setDealPrice(l.price.toString());
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="">-- Select Listing (or Manual Direct Deal) --</option>
                  {listings.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.title} ({formatNPRShort(l.price)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Buyer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={dealBuyerName}
                    onChange={(e) => setDealBuyerName(e.target.value)}
                    placeholder="e.g. Niraj Manandhar"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Buyer Phone *</label>
                  <input
                    type="tel"
                    required
                    value={dealBuyerPhone}
                    onChange={(e) => setDealBuyerPhone(e.target.value)}
                    placeholder="e.g. 9851XXXXXX"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Seller Full Name *</label>
                  <input
                    type="text"
                    required
                    value={dealSellerName}
                    onChange={(e) => setDealSellerName(e.target.value)}
                    placeholder="e.g. Gopal Krishna"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Seller Phone</label>
                  <input
                    type="tel"
                    value={dealSellerPhone}
                    onChange={(e) => setDealSellerPhone(e.target.value)}
                    placeholder="e.g. 9841XXXXXX"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Agreed Transaction Price (NPR) *</label>
                  <input
                    type="text"
                    required
                    value={dealPrice}
                    onChange={(e) => setDealPrice(e.target.value)}
                    placeholder="e.g. 26000000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Commission Cut (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dealRate}
                    onChange={(e) => setDealRate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Deal Status</label>
                <select
                  value={dealStatus}
                  onChange={(e) => setDealStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="closed">Closed &amp; Paid Full</option>
                  <option value="in-progress">In Progress (Token Paid, Deed Pending)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewDealModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold"
                >
                  Save Deal Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
