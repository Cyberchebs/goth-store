"use client"
import Feed from '@/components/Feed';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS_QUERY } from '@/sanity/queries';
import { client } from '@/sanity/lib/client';
import { Product } from '@/sanity.types';

type SelectedFilters = {
  gender: string[];
  category: string[];
};

function PageContent() {
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    gender: [],
    category: [],
  });

  // Sync gender filter from URL param (e.g. ?gender=male from navbar links)
  useEffect(() => {
    const gender = searchParams.get('gender');
    if (gender === 'male' || gender === 'female') {
      setSelectedFilters(prev => ({ ...prev, gender: [gender] }));
    }
  }, [searchParams]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch<Product[]>(PRODUCTS_QUERY);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const availablCategories = useMemo(() => {
    const categories = product
      .map(p => p.category)
      .filter((cat): cat is NonNullable<typeof cat> => cat !== null && cat !== undefined);
    return Array.from(new Set(categories)) as string[];
  }, [product]);

  const filteredProducts = useMemo(() => {
    return product.filter(item => {
      const genderMatch =
        selectedFilters.gender.length === 0 ||
        (item.gender != undefined && selectedFilters.gender.includes(item.gender));
      const categoryMatch =
        selectedFilters.category.length === 0 ||
        (item.category != undefined && selectedFilters.category.includes(item.category));
      return genderMatch && categoryMatch;
    });
  }, [product, selectedFilters]);

  const handleFilterChange = (group: keyof SelectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[group];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [group]: updated };
    });
  };

  const clearFilters = () => setSelectedFilters({ gender: [], category: [] });

  return (
    // Fixed height container = viewport minus the 80px main padding-top (navbar)
    <div className="h-[calc(100vh-80px)] flex flex-row overflow-hidden">
      {/* Mobile filter FAB */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 hover:bg-gray-800 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
      </button>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        selectedFilters={selectedFilters}
        availableCategories={availablCategories}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />

      {/* Feed scrolls independently */}
      <div className="flex-1 overflow-y-auto">
        <Feed products={filteredProducts} />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <p className="text-gray-400">Loading…</p>
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}
