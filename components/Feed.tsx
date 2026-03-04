import React from 'react';
import { Product as ProductType } from '@/sanity.types';
import Product from './Product';

interface FeedProps {
  products: ProductType[];
}

const Feed = ({ products }: FeedProps) => {
  if (products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 lg:p-8">
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Feed;