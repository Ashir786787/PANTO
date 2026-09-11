"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Search } from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { ProductCategory } from "@/types";

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

const CATEGORY_ALIASES: Record<ProductCategory, string[]> = {
  Sofa: ["sofa"],
  Chair: ["chair"],
  Beds: ["bed", "beds"],
  Lamp: ["lamp"],
};

type SwatchId = (typeof SWATCHES)[number]["id"];

function SwatchChip({
  animateIn = true,
  tailDirection = "down",
  interactive = true,
}: {
  animateIn?: boolean;
  tailDirection?: "down" | "up";
  interactive?: boolean;
}) {
  const [selected, setSelected] = useState<SwatchId>("orange");

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 16 } : false}
      animate={animateIn ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay: 1.2 }}
    >
      <div className="relative">
        <div className="flex items-center gap-2 rounded-pill border border-white/15 bg-[rgba(30,32,36,0.7)] px-3.5 py-2.5 backdrop-blur-md">
          {SWATCHES.map((swatch) => (
            <button
              key={swatch.id}
              type="button"
              onClick={() => setSelected(swatch.id)}
              aria-label={`Select ${swatch.label} swatch`}
              aria-pressed={selected === swatch.id}
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                interactive ? "transition-transform hover:scale-110" : ""
              } ${swatch.className} ${
                selected === swatch.id ? "" : "border-[1.5px] border-white/40"
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
        {tailDirection === "down" ? (
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-full -translate-x-1/2 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[rgba(30,32,36,0.7)]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute bottom-full left-1/2 -translate-x-1/2 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-[rgba(30,32,36,0.7)]"
          />
        )}
      </div>
    </motion.div>
  );
}

function PingMarker({
  size,
  entrance = true,
  pulse = true,
}: {
  size: number;
  entrance?: boolean;
  pulse?: boolean;
}) {
  return (
    <motion.div
      initial={entrance ? { opacity: 0, scale: 0.8 } : { opacity: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="relative"
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-0 rounded-full border-[1.5px] border-white/70 bg-white/10" />
      <span className="absolute left-1/2 top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      {pulse && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-[1.5px] border-white/60"
          style={{ transformOrigin: "center" }}
          animate={{ scale: [0.25, 1], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
}

function SpotPicker({
  size,
  popDirection = "up",
  animatePop = true,
  pulse = true,
  hoverable = true,
}: {
  size: number;
  popDirection?: "up" | "down";
  animatePop?: boolean;
  pulse?: boolean;
  hoverable?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const chip = (
    <div
      className={
        popDirection === "up"
          ? "absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2"
          : "absolute top-full left-1/2 z-30 mt-3 -translate-x-1/2"
      }
    >
      <SwatchChip
        animateIn={false}
        tailDirection={popDirection === "up" ? "down" : "up"}
      />
    </div>
  );

  return (
    <div className="relative flex flex-col items-center">
      {animatePop ? (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
                y: popDirection === "up" ? 12 : -12,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.5,
                y: popDirection === "up" ? 12 : -12,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className={
                popDirection === "up"
                  ? "absolute bottom-full left-1/2 z-30 mb-3 origin-bottom -translate-x-1/2"
                  : "absolute top-full left-1/2 z-30 mt-3 origin-top -translate-x-1/2"
              }
            >
              <SwatchChip
                animateIn={false}
                tailDirection={popDirection === "up" ? "down" : "up"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        open && chip
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close color picker" : "Open color picker"}
        aria-expanded={open}
        className={`flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white/60 ${
          hoverable ? "transition-transform hover:scale-110" : ""
        }`}
        style={{ width: size, height: size }}
      >
        <PingMarker size={size} entrance={false} pulse={pulse} />
      </button>
    </div>
  );
}

export default function Hero({ id }: HeroProps) {
  const { searchQuery, setSearchQuery, setActiveCategory, setShowListing } =
    useProducts();
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
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const matched = (Object.keys(CATEGORY_ALIASES) as ProductCategory[]).find(
      (category) =>
        CATEGORY_ALIASES[category].some(
          (alias) =>
            query.includes(alias) || (query.length >= 3 && alias.includes(query)),
        ),
    );

    if (matched) {
      setActiveCategory(matched);
      setShowListing(false);
    }

    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[560px] flex-col overflow-hidden bg-hero-bg sm:min-h-[640px] lg:min-h-[720px]"
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
          initial={{ opacity: 0, scale: 1.18 }}
          animate={{ opacity: 1, scale: 1.02 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/images/background.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_60%]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/20 to-black/40"
        />

        <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-b from-transparent to-white" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center px-6 pb-16 pt-28 text-center md:px-10 lg:px-20"
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
        className="absolute left-[19%] top-[49%] z-20 flex flex-col items-center md:left-[17%] md:top-[51%]"
      >
        <SwatchChip animateIn={false} interactive={false} />
        <div aria-hidden="true" className="mt-1">
          <PingMarker size={40} entrance={false} pulse={false} />
        </div>
      </div>

      <div
        className="absolute left-[7%] top-[54%] z-30 md:left-[6%] md:top-[56%]"
      >
        <SpotPicker size={28} />
      </div>

      <div className="absolute right-[6%] top-[52%] z-30 md:right-[5%] md:top-[54%]">
        <SpotPicker size={24} />
      </div>
    </section>
  );
}