"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Star,
} from "lucide-react";
import { products, productCategories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductsContext";
import type { Product, ProductCategory } from "@/types";

interface BestSellingProductsProps {
  id: string;
}

const PAGE_SIZE = 4;

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, when: "afterChildren" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setAdded(false), 1000);
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group flex flex-col rounded-card bg-white p-3 shadow-card transition-shadow duration-300 hover:shadow-card-hover md:p-4"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-surface-alt">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.tier === "premium" && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-navy-button/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
            Premium
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-body-light">
          {product.category}
        </span>
        <h3 className="mt-1 font-heading text-[16px] font-bold leading-snug text-heading md:text-[17px]">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className={`h-4 w-4 ${
                i < product.rating
                  ? "fill-star text-star"
                  : "fill-star-empty text-star-empty"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="flex items-start leading-none text-heading">
            <span className="mr-0.5 text-sm font-bold">$</span>
            <span className="text-[22px] font-bold">{product.price}</span>
          </p>

          <motion.button
            type="button"
            onClick={handleAdd}
            whileTap={{ scale: 0.85 }}
            aria-label={`Add ${product.name} to cart`}
            className={`flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-300 ${
              added ? "bg-accent" : "bg-navy-button"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={added ? "check" : "plus"}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {added ? (
                  <Check size={20} strokeWidth={2.5} />
                ) : (
                  <Plus size={20} strokeWidth={2.5} />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function BestSellingProducts({ id }: BestSellingProductsProps) {
  const { activeCategory, setActiveCategory, showListing, setShowListing } =
    useProducts();
  const [page, setPage] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = showListing
    ? products
    : products.filter((p) => p.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 0), totalPages - 1);
  const visible = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  const gridKey = `${activeCategory}-${showListing}-${safePage}`;

  const selectCategory = (category: ProductCategory) => {
    setActiveCategory(category);
    setShowListing(false);
    setPage(0);
  };

  const handleViewAll = () => {
    setPage(0);
    setShowListing(!showListing);
    window.setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <section id={id} className="bg-surface py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <h2 className="text-center font-heading text-[32px] font-bold leading-[1.15] text-title md:text-[38px] lg:text-[40px]">
          Best Selling Product
        </h2>

        <div className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Filter products by category"
            className="flex items-center gap-1 rounded-full bg-surface-alt p-1.5"
          >
            {productCategories.map((category) => {
              const isActive = !showListing && category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectCategory(category)}
                  className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-heading"
                      : "text-body-light hover:text-body"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="best-selling-tab-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={gridRef} className="relative mt-10 scroll-mt-28">
          {totalPages > 1 && (
            <>
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={safePage === 0}
                aria-label="Previous products"
                className="absolute -left-6 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-3 text-heading shadow-card transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 md:flex lg:-left-9"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setPage((p) => Math.min(totalPages - 1, p + 1))
                }
                disabled={safePage === totalPages - 1}
                aria-label="Next products"
                className="absolute -right-6 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-3 text-heading shadow-card transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 md:flex lg:-right-9"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={gridKey}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleViewAll}
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-link transition-colors hover:text-accent"
          >
            View All
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}