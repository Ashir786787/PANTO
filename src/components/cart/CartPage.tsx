"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItemRow from "./CartItemRow";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function CartPage() {
  const { items, count } = useCart();

  return (
    <section className="bg-surface pt-32 pb-24 md:pt-36">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="flex items-center gap-2 text-[13px] text-body-light">
            <Link href="/" className="transition-colors hover:text-accent">
              Home
            </Link>
            <ChevronRight size={12} strokeWidth={2} />
            <span className="font-medium text-heading">Cart</span>
          </nav>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-[32px] font-bold leading-[1.15] text-title md:text-[38px] lg:text-[40px]">
              Shopping Cart
            </h1>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="inline-flex h-8 items-center rounded-full bg-accent/10 px-3 text-[13px] font-bold text-accent"
              >
                {count} item{count === 1 ? "" : "s"}
              </motion.span>
            )}
          </div>
        </motion.div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="mt-10 lg:grid lg:grid-cols-[1fr_380px] lg:items-start lg:gap-12">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4"
            >
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <CartItemRow key={item.product.id} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>

            <CartSummary />
          </div>
        )}
      </div>
    </section>
  );
}
