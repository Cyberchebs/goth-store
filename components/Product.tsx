import React from 'react';
import Image from 'next/image';
import { Product as ProductType } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
        {product.image ? (
          <Image
            src={urlFor(product.image).width(600).height(800).url()}
            alt={product.name || 'Product'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {product.category && (
            <span className="capitalize">{product.category}</span>
          )}
          {product.gender && product.category && <span>•</span>}
          {product.gender && (
            <span className="capitalize">{product.gender}</span>
          )}
        </div>
        
        {product.price !== null && product.price !== undefined && (
          <p className="font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;
