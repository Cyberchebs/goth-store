"use client"
import Feed from '@/components/Feed';
import Sidebar from '@/components/Sidebar';
  import { useEffect, useState,useMemo } from 'react';
import { PRODUCTS_QUERY } from '@/sanity/queries';
import { client } from '@/sanity/lib/client';
import { Product } from '@/sanity.types';

type SelectedFilters = {
  gender: string[];
  category: string[];
};


const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    gender: [],
    category: [],
  });
 
  
  


const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
   

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data  = await client.fetch<Product[]>(PRODUCTS_QUERY);
      setProduct(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }}

  fetchProducts();
 }, [])

 const availablCategories = useMemo(() => {
  const unique = new Set(product.map(p => p.category).filter(Boolean));
  return Array.from(unique);
 },[product]);
 console.log("categories",availablCategories);

 const filteredProducts = useMemo(()=>{
  return product.filter( item  => {
   const genderMatch = selectedFilters.gender.length === 0 || 
    (item.gender != undefined &&selectedFilters.gender.includes(item.gender ));

      const categoryMatch =
        selectedFilters.category.length === 0 ||
        (item.category != undefined && selectedFilters.category.includes(item.category));

      return genderMatch && categoryMatch
  })
 },[product, selectedFilters])

 const handleFilterChange = (group: keyof SelectedFilters, value: string) => {
  setSelectedFilters(prev => {
    const current = prev[group];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    return { ...prev, [group]: updated };
  });
 }

 const clearFilters = () => setSelectedFilters({ gender: [], category: [] });
  

  return (
    <div >
      <button onClick={toggleSidebar}  className="lg:hidden fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 hover:bg-gray-800 transition-colors">
        filter
      </button>
      <div className="flex flex-row">
         <Sidebar
          isOpen={sidebarOpen}
          onClose={closeSidebar}
          selectedFilters={selectedFilters}
          availableCategories={availablCategories}  // derived from real data
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
      <Feed/>
      </div>
    </div>
  )
}

export default Page