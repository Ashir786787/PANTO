"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Search } from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface HeroProps {
  id: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.2 },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const SWATCHES = [
  { id: "orange", label: "Orange", className: "bg-accent" },
  { id: "teal", label: "Teal", className: "bg-swatch-teal" },
  { id: "white", label: "White", className: "bg-swatch-white" },
] as const;

type SwatchId = (typeof SWATCHES)[number]["id"];

function SwatchChip() {
  const [selected, setSelected] = useState<SwatchId>("orange");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
    >
      <div className="relative">
        <div className="flex items-center gap-2 rounded-pill bg-[rgba(30,32,36,0.9)] px-3.5 py-2.5 backdrop-blur-md">
          {SWATCHES.map((swatch) => (
            <button
              key={swatch.id}
              type="button"
              onClick={() => setSelected(swatch.id)}
              aria-label={`Select ${swatch.label} swatch`}
              aria-pressed={selected === swatch.id}
              className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform hover:scale-110 ${swatch.className} ${
                selected === swatch.id ? "" : "ring-[1.5px] ring-white/40"
              }`}
            >
              {selected === swatch.id && (
                <Check
                  size={13}
                  strokeWidth={3.5}
                  className={selected === "white" ? "text-heading" : "text-white"}
                />
              )}
            </button>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-full -translate-x-1/2 border-l-[7px] border-r-[7px] border-t-[9px] border-l-transparent border-r-transparent border-t-[rgba(30,32,36,0.9)]"
        />
      </div>
    </motion.div>
  );
}

function PingMarker({ size }: { size: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="relative"
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-0 rounded-full border-[1.5px] border-white/50 bg-white/5" />
      <span className="absolute left-1/2 top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-[1.5px] border-white/50"
        style={{ transformOrigin: "center" }}
        animate={{ scale: [0.25, 1], opacity: [0.6, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
      />
    </motion.div>
  );
}

export default function Hero({ id }: HeroProps) {
  const { searchQuery, setSearchQuery } = useProducts();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), {
    stiffness: 120,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop || reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[640px] flex-col overflow-hidden bg-hero-bg lg:min-h-[720px]"
    >
      <motion.div
        aria-hidden="true"
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
        }}
        className="absolute inset-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.25 }}
          animate={{ opacity: 1, scale: 1.12 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/images/background.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/20 to-black/40"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center px-6 pb-28 pt-28 text-center md:px-10 lg:px-20"
      >
        <motion.h1
          variants={textItemVariants}
          className="max-w-[720px] font-heading text-[32px] font-bold leading-[1.1] text-white md:text-[40px] lg:text-[56px]"
        >
          Make Your Interior More Minimalistic &amp; Modern
        </motion.h1>

        <motion.p
          variants={textItemVariants}
          className="mt-4 max-w-[640px] text-[15px] font-normal leading-[1.7] text-white/80 md:text-base"
        >
          Create a warm, modern home with our thoughtfully designed furniture —
          where every piece tells a story of comfort and craftsmanship.
        </motion.p>

        <motion.form
          variants={textItemVariants}
          onSubmit={handleSubmit}
          role="search"
          className="mt-8 flex w-full max-w-[480px] items-center gap-2 rounded-pill border border-white/20 bg-white/10 p-2 backdrop-blur-md"
        >
          <label htmlFor="hero-search" className="sr-only">
            Search products
          </label>
          <input
            id="hero-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Product"
            className="h-11 w-full bg-transparent pl-4 text-[15px] font-medium text-white outline-none placeholder:text-white/60"
          />
          <button
            type="submit"
            aria-label="Search products"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-hover"
          >
            <Search size={18} strokeWidth={2} />
          </button>
        </motion.form>
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute left-[9%] top-[44%] z-20 md:left-[13%] md:top-[46%]"
      >
        <SwatchChip />
      </div>

      <div
        aria-hidden="true"
        className="absolute right-[12%] top-[56%] z-20 md:right-[14%] md:top-[58%]"
      >
        <PingMarker size={40} />
      </div>

      <div
        aria-hidden="true"
        className="absolute right-[21%] top-[47%] z-20 md:right-[24%] md:top-[50%]"
      >
        <PingMarker size={28} />
      </div>
    </section>
  );
}