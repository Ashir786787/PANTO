"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { ProductsProvider } from "@/context/ProductsContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ProductsProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </ProductsProvider>
    </MotionConfig>
  );
}
