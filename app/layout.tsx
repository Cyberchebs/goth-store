import type { Metadata } from "next";
import { Geist, IM_Fell_English, UnifrakturMaguntia, Libre_Baskerville, Cormorant_Garamond } from 'next/font/google'

import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";


const geist = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist'
})

const imFell = IM_Fell_English({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-im-fell'
})

const unifraktur = UnifrakturMaguntia({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-unifraktur'
})

const libre = Libre_Baskerville({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-libre'
})

const cormorant = Cormorant_Garamond({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant'
})



export const metadata: Metadata = {
  title: "Goth Heaven",
  description: "your one-stop shop for all things goth fashion. Explore our curated collection of dark and edgy clothing, accessories, and more. Embrace your unique style with our high-quality products designed for the modern goth enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${imFell.variable} ${unifraktur.variable} ${libre.variable} ${cormorant.variable}`}
      >
        <CartProvider>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
