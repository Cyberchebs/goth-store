"use client";
import React from 'react';
import Image from 'next/image';
import { Product as ProductType } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  const { addToCart } = useCart();

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
        {product.image ? (
          <Image
            src={urlFor(product.image).width(600).height(800).url()}
            alt={product.name || 'Product'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}

        {/* Add to Cart overlay button */}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs sm:text-sm py-2.5 flex items-center justify-center gap-2
            translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          aria-label="Add to cart"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>

      <div className="space-y-0.5">
        <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          {product.category && (
            <span className="capitalize">{product.category}</span>
          )}
          {product.gender && product.category && <span>•</span>}
          {product.gender && (
            <span className="capitalize">{product.gender}</span>
          )}
        </div>

        {product.price !== null && product.price !== undefined && (
          <p className="font-semibold text-gray-900 text-sm sm:text-base">
            ${product.price.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;
