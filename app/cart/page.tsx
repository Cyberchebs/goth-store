"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { urlFor } from "@/sanity/lib/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
        <ShoppingBag className="w-16 h-16 text-gray-300" />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 im-fell-english-regular mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-sm">Looks like you haven&apos;t added anything yet.</p>
        </div>
        <Link
          href="/nextpage"
          className="mt-2 bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold im-fell-english-regular">
          Shopping Cart
          <span className="text-gray-400 text-lg font-normal ml-3">({totalItems} {totalItems === 1 ? "item" : "items"})</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          Clear all
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 divide-y divide-gray-100">
          {items.map(({ product, quantity }) => (
            <div key={product._id} className="flex gap-4 py-5">
              {/* Product image */}
              <div className="relative w-24 h-32 sm:w-28 sm:h-36 shrink-0 bg-gray-100 overflow-hidden">
                {product.image ? (
                  <Image
                    src={urlFor(product.image).width(200).height(280).url()}
                    alt={product.name || "Product"}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                    {product.category && <span className="capitalize">{product.category}</span>}
                    {product.gender && product.category && <span>•</span>}
                    {product.gender && <span className="capitalize">{product.gender}</span>}
                  </div>
                </div>

                {/* Quantity + price row */}
                <div className="flex items-center justify-between mt-3">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-gray-200">
                    <button
                      onClick={() => updateQuantity(product._id, quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product._id, quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price + remove */}
                  <div className="flex items-center gap-4">
                    {product.price !== null && product.price !== undefined && (
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        ${(product.price * quantity).toFixed(2)}
                      </p>
                    )}
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-gray-50 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 im-fell-english-regular">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className="mt-6 w-full bg-black text-white py-3.5 text-sm font-medium hover:bg-gray-800 transition-colors">
              Checkout
            </button>

            <Link
              href="/nextpage"
              className="mt-3 w-full block text-center text-sm text-gray-500 hover:text-gray-900 transition-colors py-2"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
