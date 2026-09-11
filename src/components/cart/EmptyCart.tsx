"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center py-20 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 25 }}
        className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-surface-alt"
      >
        <ShoppingBag size={56} strokeWidth={1} className="text-body-light" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="font-heading text-[28px] font-bold text-heading md:text-[32px]"
      >
        Your cart is empty
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="mt-3 max-w-sm text-[15px] leading-relaxed text-body"
      >
        Looks like you haven&apos;t added any furniture yet. Explore our
        collection and find something you love.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        <Link
          href="/#products"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy-button px-8 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-accent"
        >
          Start Shopping
        </Link>
      </motion.div>
    </motion.div>
  );
}
