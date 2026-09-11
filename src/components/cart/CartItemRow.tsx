"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/types";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{
        opacity: 0,
        x: -60,
        scale: 0.95,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className="group relative flex gap-4 rounded-card bg-white p-4 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:gap-5 md:gap-6 md:p-5"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative h-28 w-24 shrink-0 overflow-hidden rounded-card bg-surface-alt sm:h-32 sm:w-28 md:h-40 md:w-32"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 128px, (min-width: 640px) 112px, 96px"
          className="object-cover"
        />
      </motion.div>

      <div className="flex flex-1 flex-col justify-between py-0.5">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-body-light">
            {product.category}
          </span>
          <h3 className="mt-0.5 font-heading text-[15px] font-bold leading-snug text-heading sm:text-[16px] md:text-[17px]">
            {product.name}
          </h3>
          <p className="mt-1 flex items-start leading-none text-heading">
            <span className="mr-0.5 text-xs font-bold">$</span>
            <span className="text-[17px] font-bold md:text-[18px]">
              {product.price}
            </span>
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between sm:mt-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-heading transition-all duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-heading"
            >
              <Minus size={14} strokeWidth={2.5} />
            </button>

            <motion.span
              key={quantity}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="flex h-8 min-w-[32px] items-center justify-center rounded-full bg-surface-alt px-2 text-[14px] font-bold text-heading"
            >
              {quantity}
            </motion.span>

            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-heading transition-all duration-200 hover:border-accent hover:text-accent"
            >
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <motion.p
              key={lineTotal}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="hidden items-start leading-none text-heading sm:flex"
            >
              <span className="mr-0.5 text-xs font-bold">$</span>
              <span className="text-[18px] font-bold">{lineTotal}</span>
            </motion.p>

            <motion.button
              type="button"
              aria-label={`Remove ${product.name} from cart`}
              whileTap={{ scale: 0.8 }}
              onClick={() => removeFromCart(product.id)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-body-light transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 size={16} strokeWidth={2} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
