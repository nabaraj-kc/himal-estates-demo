'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listing/ListingCard';
import { ListingMap } from '@/components/listing/ListingMap';
import { getListings } from '@/lib/storage';
import { Listing } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Map as MapIcon,
  X,
  RotateCcw,
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
    const timer = setTimeout(() => {
      setAllListings(getListings());
      setIsLoading(false);
    }, 150);
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
        if (listing.status !== 'active') return false;

        if (selectedType !== 'all' && listing.type !== selectedType) {
          return false;
        }

        if (selectedCategory !== 'all' && listing.category !== selectedCategory) {
          return false;
        }

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

        if (budgetFilter === 'under-30k' && listing.price > 30000) return false;
        if (budgetFilter === '30k-80k' && (listing.price < 30000 || listing.price > 80000)) return false;
        if (budgetFilter === '80k-200k' && (listing.price < 80000 || listing.price > 200000)) return false;
        if (budgetFilter === 'under-3cr' && listing.price > 30000000) return false;
        if (budgetFilter === '3cr-plus' && listing.price < 30000000) return false;

        if (bedroomFilter !== 'all') {
          const num = parseInt(bedroomFilter, 10);
          if (num === 4 && (listing.bedrooms || 0) < 4) return false;
          if (num < 4 && listing.bedrooms !== num) return false;
        }

        if (onlyFeatured && !listing.featured) return false;
        if (onlyHotDeal && !listing.hotDeal) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'popular') return (b.viewCount || 0) - (a.viewCount || 0);
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

  const filterFormContent = (
    <div className="space-y-5">
      {/* Location Text Search */}
      <div>
        <label className="block text-xs font-bold text-[#0F0F0F] mb-1.5">
          {isNepali ? 'स्थान / क्षेत्र खोज्नुहोस्' : 'Location or Area'}
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="e.g. Jhamsikhel, Baneshwor, Pokhara..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
          />
        </div>
      </div>

      {/* Purpose / Type (Rent vs Sale) */}
      <div>
        <label className="block text-xs font-bold text-[#0F0F0F] mb-2">
          {isNepali ? 'प्रयोजन (Purpose)' : 'Purpose'}
        </label>
        <div className="grid grid-cols-3 gap-1 bg-[#F5F5F7] p-1 rounded-xl text-xs">
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
                  ? 'bg-[#0F0F0F] text-white shadow-xs'
                  : 'text-[#71717A] hover:text-[#0F0F0F]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Category List */}
      <div>
        <label className="block text-xs font-bold text-[#0F0F0F] mb-2">
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
                  ? 'bg-[#F5F5F7] text-[#0F0F0F] font-semibold'
                  : 'text-[#71717A] hover:bg-[#F5F5F7] hover:text-[#0F0F0F]'
              }`}
            >
              <span>{cat.label}</span>
              {selectedCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F]"></span>}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Range */}
      <div>
        <label className="block text-xs font-bold text-[#0F0F0F] mb-1.5">
          {isNepali ? 'बजेट सीमा' : 'Price / Budget'}
        </label>
        <select
          value={budgetFilter}
          onChange={(e) => setBudgetFilter(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
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
      <div>
        <label className="block text-xs font-bold text-[#0F0F0F] mb-2">
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
                  ? 'bg-[#0F0F0F] border-[#0F0F0F] text-white'
                  : 'border-[#E5E5E5] text-[#71717A] hover:border-[#0F0F0F] hover:text-[#0F0F0F]'
              }`}
            >
              {b === 'all' ? 'Any' : b === '4' ? '4+' : b}
            </button>
          ))}
        </div>
      </div>

      {/* Urgency Toggles */}
      <div className="pt-4 border-t border-[#E5E5E5] space-y-2.5">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#0F0F0F]">
          <input
            type="checkbox"
            checked={onlyFeatured}
            onChange={(e) => setOnlyFeatured(e.target.checked)}
            className="rounded border-[#E5E5E5] accent-[#0F0F0F] w-4 h-4"
          />
          <span>Featured Properties Only</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#0F0F0F]">
          <input
            type="checkbox"
            checked={onlyHotDeal}
            onChange={(e) => setOnlyHotDeal(e.target.checked)}
            className="rounded border-[#E5E5E5] accent-[#0F0F0F] w-4 h-4"
          />
          <span>Hot Deals / Price Drops</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white w-full max-w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-5 min-w-0">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-[#E5E5E5] gap-3 w-full max-w-full">
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-[#0F0F0F] tracking-tight">
              {isNepali ? 'नेपालभरका सम्पत्ति सूचीहरू' : 'Properties & Businesses for Rent & Sale'}
            </h1>
            <p className="text-xs text-[#71717A] mt-0.5">
              {filteredListings.length}{' '}
              {isNepali ? 'सम्पत्तिहरू भेटिए' : 'listings found'}
            </p>
          </div>

          {/* View Toggles & Sort Options (Stacked cleanly on mobile) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
            {/* View Mode Toggle: Desktop only */}
            <div className="hidden sm:flex items-center bg-[#F5F5F7] border border-[#E5E5E5] rounded-xl p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#0F0F0F] text-white shadow-xs'
                    : 'text-[#71717A] hover:text-[#0F0F0F]'
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
                    ? 'bg-[#0F0F0F] text-white shadow-xs'
                    : 'text-[#71717A] hover:text-[#0F0F0F]'
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
                    ? 'bg-[#0F0F0F] text-white shadow-xs'
                    : 'text-[#71717A] hover:text-[#0F0F0F]'
                }`}
                title="Map View"
                aria-label="Map View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Sort & Filters side-by-side in 2-column grid on mobile */}
            <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto sm:items-center sm:gap-2.5">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] text-xs font-medium text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
              >
                <option value="newest">{isNepali ? 'नयाँ पहिले' : 'Newest'}</option>
                <option value="price-low">{isNepali ? 'मूल्य: कम देखि बढी' : 'Price: Low-High'}</option>
                <option value="price-high">{isNepali ? 'मूल्य: बढी देखि कम' : 'Price: High-Low'}</option>
                <option value="popular">{isNepali ? 'लोकप्रियता' : 'Most Popular'}</option>
              </select>

              {/* Mobile Filter Sheet Trigger */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] border border-[#E5E5E5] text-xs font-semibold"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Strip */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap py-3 border-b border-[#E5E5E5] text-xs">
            <span className="text-[#71717A] font-medium">Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F] font-medium">
                Category: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer text-[#71717A] hover:text-[#0F0F0F]" onClick={() => setSelectedCategory('all')} />
              </span>
            )}
            {selectedType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F] font-medium">
                Type: {selectedType}
                <X className="w-3 h-3 cursor-pointer text-[#71717A] hover:text-[#0F0F0F]" onClick={() => setSelectedType('all')} />
              </span>
            )}
            {searchLocation && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F] font-medium">
                Location: {searchLocation}
                <X className="w-3 h-3 cursor-pointer text-[#71717A] hover:text-[#0F0F0F]" onClick={() => setSearchLocation('')} />
              </span>
            )}
            {onlyFeatured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F] font-medium">
                Featured Only
                <X className="w-3 h-3 cursor-pointer text-[#71717A] hover:text-[#0F0F0F]" onClick={() => setOnlyFeatured(false)} />
              </span>
            )}
            {onlyHotDeal && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F5F7] border border-[#E5E5E5] text-[#0F0F0F] font-medium">
                Hot Deals Only
                <X className="w-3 h-3 cursor-pointer text-[#71717A] hover:text-[#0F0F0F]" onClick={() => setOnlyHotDeal(false)} />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-[#71717A] hover:text-[#0F0F0F] hover:underline font-semibold flex items-center gap-1 ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        )}

        {/* Main Content Layout (Sidebar + Results) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-4 sm:mt-5 w-full max-w-full min-w-0">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-4 border border-[#E5E5E5] sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0F0F0F]">
                  <SlidersHorizontal className="w-4 h-4 text-[#0F0F0F]" />
                  <span>{isNepali ? 'फिल्टरहरू' : 'Filter Properties'}</span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#71717A] hover:text-[#0F0F0F] hover:underline font-medium"
                  >
                    Clear ({activeFiltersCount})
                  </button>
                )}
              </div>
              <div className="mt-4">
                {filterFormContent}
              </div>
            </div>
          </aside>

          {/* Results Container (9 cols) */}
          <section className="lg:col-span-9 w-full max-w-full min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-full min-w-0">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="rounded-xl bg-white p-3 border border-[#E5E5E5] animate-pulse space-y-3 min-w-0 w-full overflow-hidden">
                    <div className="h-32 sm:h-44 bg-[#F5F5F7] rounded-lg w-full"></div>
                    <div className="h-4 bg-[#F5F5F7] rounded w-2/3"></div>
                    <div className="h-3 bg-[#F5F5F7] rounded w-1/2"></div>
                    <div className="h-5 bg-[#F5F5F7] rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-[#E5E5E5] max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-[#F5F5F7] text-[#0F0F0F] mx-auto flex items-center justify-center mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-[#0F0F0F]">
                  {isNepali ? 'कुनै सम्पत्ति फेला परेन' : 'No Matching Properties Found'}
                </h3>
                <p className="text-xs text-[#71717A] mt-1.5 leading-relaxed">
                  {isNepali
                    ? 'कृपया आफ्नो फिल्टर परिवर्तन गर्नुहोस् वा अन्य स्थान खोजी हेर्नुहोस्।'
                    : 'We could not find properties matching your filters. Try clearing some filters or searching a different area.'}
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F0F0F] text-white text-xs font-semibold hover:bg-[#27272A] transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isNepali ? 'सबै फिल्टर हटाउनुहोस्' : 'Reset All Filters'}</span>
                </button>
              </div>
            ) : viewMode === 'map' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[680px] w-full max-w-full min-w-0">
                <div className="lg:col-span-6 overflow-y-auto pr-1 space-y-3 max-h-[680px] no-scrollbar min-w-0">
                  {filteredListings.map((listing) => (
                    <div
                      key={listing.id}
                      onClick={() => setSelectedMapListingId(listing.id)}
                      className={`cursor-pointer transition-all ${
                        selectedMapListingId === listing.id ? 'ring-2 ring-[#0F0F0F] rounded-xl' : ''
                      }`}
                    >
                      <ListingCard listing={listing} />
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-6 h-full rounded-xl overflow-hidden border border-[#E5E5E5] min-w-0">
                  <ListingMap
                    listings={filteredListings}
                    selectedListingId={selectedMapListingId}
                    onSelectListing={(id) => setSelectedMapListingId(id)}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-full min-w-0">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#0F0F0F]">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-[#71717A] hover:text-[#0F0F0F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              {filterFormContent}
            </div>
            <div className="pt-3 border-t border-[#E5E5E5] flex gap-2">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl border border-[#E5E5E5] text-xs font-semibold text-[#71717A] hover:text-[#0F0F0F]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#0F0F0F] text-white text-xs font-semibold hover:bg-[#27272A]"
              >
                Apply ({filteredListings.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#71717A] text-xs">Loading listings...</div>}>
      <ListingsContent />
    </Suspense>
  );
}
