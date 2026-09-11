"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/types";

interface CartContextValue {
  items: CartItem[];
  count: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "panto-cart";

function readStoredCart(): CartItem[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeStoredCart(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    void items;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setItems(readStoredCart()));
    return () => cancelAnimationFrame(frame);
  }, []);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      const next = existing
        ? prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prev, { product, quantity: 1 }];
      writeStoredCart(next);
      return next;
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.product.id !== productId);
      writeStoredCart(next);
      return next;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems((prev) => {
      const next =
        quantity < 1
          ? prev.filter((item) => item.product.id !== productId)
          : prev.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item,
            );
      writeStoredCart(next);
      return next;
    });
  };

  const clearCart = () => {
    writeStoredCart([]);
    setItems([]);
  };

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, count, addToCart, removeFromCart, updateQuantity, clearCart }),
    [items, count],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}