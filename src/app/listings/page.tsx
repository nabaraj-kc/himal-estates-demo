'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listing/ListingCard';
import { ListingMap } from '@/components/listing/ListingMap';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { getListings } from '@/lib/storage';
import { Listing, ListingCategory, ListingType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { formatNPR } from '@/lib/utils';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  Map as MapIcon,
  X,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Building2,
  Home,
  MapPin,
  Store,
  Hotel,
  Briefcase,
} from 'lucide-react';

function ListingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isNepali } = useLanguage();

  // URL Query Params
  const initialCategory = searchParams.get('category') || 'all';
  const initialType = searchParams.get('type') || 'all';
  const initialLocation = searchParams.get('location') || '';
  const initialFeatured = searchParams.get('featured') === 'true';
  const initialHotDeal = searchParams.get('hotDeal') === 'true';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [searchLocation, setSearchLocation] = useState<string>(initialLocation);
  const [budgetFilter, setBudgetFilter] = useState<string>('all');
  const [bedroomFilter, setBedroomFilter] = useState<string>('all');
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(initialFeatured);
  const [onlyHotDeal, setOnlyHotDeal] = useState<boolean>(initialHotDeal);
  const [sortBy, setSortBy] = useState<string>('newest');

  // View Mode: 'grid' | 'list' | 'map'
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedMapListingId, setSelectedMapListingId] = useState<string | undefined>(undefined);

  // All listings from storage
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate brief smooth loading
    const timer = setTimeout(() => {
      setAllListings(getListings());
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  // Sync state if URL query changes
  useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category') || 'all');
    if (searchParams.get('type')) setSelectedType(searchParams.get('type') || 'all');
    if (searchParams.get('location')) setSearchLocation(searchParams.get('location') || '');
    if (searchParams.get('featured') === 'true') setOnlyFeatured(true);
    if (searchParams.get('hotDeal') === 'true') setOnlyHotDeal(true);
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredListings = useMemo(() => {
    return allListings
      .filter((listing) => {
        // Status filter: only show active
        if (listing.status !== 'active') return false;

        // Type filter
        if (selectedType !== 'all' && listing.type !== selectedType) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && listing.category !== selectedCategory) {
          return false;
        }

        // Location text search
        if (searchLocation.trim()) {
          const locQuery = searchLocation.toLowerCase().trim();
          const matchTole = listing.location.tole?.toLowerCase().includes(locQuery);
          const matchCity = listing.location.city?.toLowerCase().includes(locQuery);
          const matchDistrict = listing.location.district?.toLowerCase().includes(locQuery);
          const matchTitle = listing.title.toLowerCase().includes(locQuery);
          if (!matchTole && !matchCity && !matchDistrict && !matchTitle) {
            return false;
          }
        }

        // Budget brackets
        if (budgetFilter === 'under-30k' && listing.price > 30000) return false;
        if (budgetFilter === '30k-80k' && (listing.price < 30000 || listing.price > 80000)) return false;
        if (budgetFilter === '80k-200k' && (listing.price < 80000 || listing.price > 200000)) return false;
        if (budgetFilter === 'under-3cr' && listing.price > 30000000) return false;
        if (budgetFilter === '3cr-plus' && listing.price < 30000000) return false;

        // Bedroom filter
        if (bedroomFilter !== 'all') {
          const num = parseInt(bedroomFilter, 10);
          if (num === 4 && (listing.bedrooms || 0) < 4) return false;
          if (num < 4 && listing.bedrooms !== num) return false;
        }

        // Featured & Hot Deal toggles
        if (onlyFeatured && !listing.featured) return false;
        if (onlyHotDeal && !listing.hotDeal) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'popular') return (b.viewCount || 0) - (a.viewCount || 0);
        // default: newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [
    allListings,
    selectedCategory,
    selectedType,
    searchLocation,
    budgetFilter,
    bedroomFilter,
    onlyFeatured,
    onlyHotDeal,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setSearchLocation('');
    setBudgetFilter('all');
    setBedroomFilter('all');
    setOnlyFeatured(false);
    setOnlyHotDeal(false);
    setSortBy('newest');
    router.push('/listings');
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedType !== 'all' ? 1 : 0) +
    (searchLocation.trim() ? 1 : 0) +
    (budgetFilter !== 'all' ? 1 : 0) +
    (bedroomFilter !== 'all' ? 1 : 0) +
    (onlyFeatured ? 1 : 0) +
    (onlyHotDeal ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Header / Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              {isNepali ? 'नेपालभरका प्रमाणित सम्पत्ति सूचीहरू' : 'Verified Nepal Properties & Businesses'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {filteredListings.length}{' '}
              {isNepali ? 'सम्पत्तिहरू भेटिए • १००% वास्तविक' : 'verified listings available'}
            </p>
          </div>

          {/* View Toggles & Sort Options */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="List View"
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'map'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Interactive Map View"
                aria-label="Interactive Map View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 shadow-sm"
            >
              <option value="newest">{isNepali ? 'नयाँ पहिले' : 'Newest First'}</option>
              <option value="price-low">{isNepali ? 'मूल्य: कम देखि बढी' : 'Price: Low to High'}</option>
              <option value="price-high">{isNepali ? 'मूल्य: बढी देखि कम' : 'Price: High to Low'}</option>
              <option value="popular">{isNepali ? 'लोकप्रियता' : 'Most Popular'}</option>
            </select>

            {/* Mobile Filter Sheet Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters ({activeFiltersCount})</span>
            </button>
          </div>
        </div>

        {/* Active Filter Chips Strip */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap py-3 border-b border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-semibold">
                Category: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
              </span>
            )}
            {selectedType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-semibold">
                Type: {selectedType}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedType('all')} />
              </span>
            )}
            {searchLocation && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-semibold">
                Location: {searchLocation}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchLocation('')} />
              </span>
            )}
            {onlyFeatured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold">
                Featured Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyFeatured(false)} />
              </span>
            )}
            {onlyHotDeal && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 font-semibold">
                Hot Deals Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyHotDeal(false)} />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold flex items-center gap-1 ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
          </div>
        )}

        {/* Main Content Layout (Sidebar + Results) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Desktop Filter Sidebar (4 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 font-display font-bold text-sm text-slate-900 dark:text-white">
                  <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                  <span>{isNepali ? 'फिल्टरहरू' : 'Filter Properties'}</span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-teal-700 dark:text-teal-400 hover:underline font-semibold"
                  >
                    Clear ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Location Text Search */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isNepali ? 'स्थान / क्षेत्र खोज्नुहोस्' : 'Location or Neighborhood'}
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="e.g. Jhamsikhel, Baneshwor..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              {/* Purpose / Type (Rent vs Sale) */}
              <div className="mt-5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  {isNepali ? 'प्रयोजन (Purpose)' : 'Purpose'}
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'rent', label: 'Rent' },
                    { id: 'sale', label: 'Sale' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedType(t.id)}
                      className={`py-1.5 rounded-lg font-semibold transition-all ${
                        selectedType === t.id
                          ? 'bg-teal-700 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Category List */}
              <div className="mt-5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  {isNepali ? 'श्रेणी' : 'Category'}
                </label>
                <div className="space-y-1">
                  {[
                    { id: 'all', label: 'All Categories' },
                    { id: 'apartment', label: 'Flats & Apartments' },
                    { id: 'house', label: 'Houses & Villas' },
                    { id: 'land', label: 'Land (Aana/Ropani)' },
                    { id: 'shop', label: 'Shops & Shutters' },
                    { id: 'hotel', label: 'Hotels & Lodges' },
                    { id: 'business', label: 'Running Businesses' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div className="mt-5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isNepali ? 'बजेट सीमा' : 'Price / Budget'}
                </label>
                <select
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="all">Any Price</option>
                  <option value="under-30k">Under NPR 30,000</option>
                  <option value="30k-80k">NPR 30k – 80k (Rent)</option>
                  <option value="80k-200k">NPR 80k – 2 Lakh</option>
                  <option value="under-3cr">Under NPR 3 Crore (Sale)</option>
                  <option value="3cr-plus">Above NPR 3 Crore</option>
                </select>
              </div>

              {/* Bedrooms Filter */}
              <div className="mt-5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  {isNepali ? 'सुत्ने कोठा (Bedrooms)' : 'Bedrooms'}
                </label>
                <div className="flex items-center gap-1.5">
                  {['all', '1', '2', '3', '4'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBedroomFilter(b)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        bedroomFilter === b
                          ? 'bg-teal-700 border-teal-700 text-white'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {b === 'all' ? 'Any' : b === '4' ? '4+' : b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency Toggles */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={onlyFeatured}
                    onChange={(e) => setOnlyFeatured(e.target.checked)}
                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4"
                  />
                  <span>Featured Properties Only</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={onlyHotDeal}
                    onChange={(e) => setOnlyHotDeal(e.target.checked)}
                    className="rounded border-slate-300 text-orange-600 focus:ring-orange-500 w-4 h-4"
                  />
                  <span>Hot Deals / Price Drops</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Results Container (8 or 9 cols depending on view) */}
          <section className="lg:col-span-9">
            {isLoading ? (
              // Skeletons loader
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="rounded-2xl bg-white p-4 border border-slate-200 animate-pulse space-y-3">
                    <div className="aspect-[16/10] bg-slate-200 rounded-xl"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredListings.length === 0 ? (
              // Empty State
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 mx-auto flex items-center justify-center mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  {isNepali ? 'कुनै सम्पत्ति फेला परेन' : 'No Matching Properties Found'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                  {isNepali
                    ? 'कृपया आफ्नो फिल्टर परिवर्तन गर्नुहोस् वा अन्य स्थान खोजी हेर्नुहोस्।'
                    : 'We couldn’t find properties matching your exact filters. Try broadening your budget or clearing location keywords.'}
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition-all shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isNepali ? 'सबै फिल्टर हटाउनुहोस्' : 'Reset All Filters'}</span>
                </button>
              </div>
            ) : viewMode === 'map' ? (
              // Split Map View
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px]">
                <div className="lg:col-span-6 overflow-y-auto pr-1 space-y-4 max-h-[720px] no-scrollbar">
                  {filteredListings.map((listing) => (
                    <div
                      key={listing.id}
                      onClick={() => setSelectedMapListingId(listing.id)}
                      className={`cursor-pointer transition-transform ${
                        selectedMapListingId === listing.id ? 'ring-2 ring-teal-600 rounded-2xl' : ''
                      }`}
                    >
                      <ListingCard listing={listing} />
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-6 h-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <ListingMap
                    listings={filteredListings}
                    selectedListingId={selectedMapListingId}
                    onSelectListing={(id) => setSelectedMapListingId(id)}
                  />
                </div>
              </div>
            ) : (
              // Grid View
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading listings...</div>}>
      <ListingsContent />
    </Suspense>
  );
}
