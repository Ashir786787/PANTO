"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CheckoutToast from "./CheckoutToast";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);

export default function CartSummary() {
  const { items } = useCart();
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const total = subtotal;

  const { show, toast } = CheckoutToast();

  return (
    <>
      {toast}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 rounded-card bg-surface-alt p-6 shadow-card lg:mt-0"
      >
        <h3 className="font-heading text-[20px] font-bold text-heading">
          Order Summary
        </h3>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-body">Subtotal</span>
            <motion.span
              key={subtotal}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="text-[14px] font-semibold text-heading"
            >
              {fmt(subtotal)}
            </motion.span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-body">Shipping</span>
            <span className="text-[14px] font-semibold text-accent">Free</span>
          </div>
        </div>

        <div className="my-4 border-t border-border" />

        <div className="flex items-center justify-between">
          <span className="text-[16px] font-bold text-heading">Total</span>
          <motion.span
            key={total}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="text-[22px] font-bold text-heading"
          >
            {fmt(total)}
          </motion.span>
        </div>

        <motion.button
          type="button"
          onClick={show}
          whileTap={{ scale: 0.97 }}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-navy-button text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-accent"
        >
          Proceed to Checkout
        </motion.button>

        <Link
          href="/#products"
          className="mt-4 flex items-center justify-center gap-1.5 py-2 text-[14px] font-semibold text-link transition-colors hover:text-accent"
        >
          Continue Shopping
          <ArrowRight
            size={16}
            className="transition-transform duration-300 hover:translate-x-0.5"
          />
        </Link>
      </motion.div>
    </>
  );
}
