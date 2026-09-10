"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductCategory } from "@/types";

interface ProductsContextValue {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: ProductCategory;
  setActiveCategory: (category: ProductCategory) => void;
  showListing: boolean;
  setShowListing: (showListing: boolean) => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<ProductCategory>("Chair");
  const [showListing, setShowListing] = useState(false);

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      activeCategory,
      setActiveCategory,
      showListing,
      setShowListing,
    }),
    [searchQuery, activeCategory, showListing],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextValue {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return ctx;
}