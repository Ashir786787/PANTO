"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Search } from "lucide-react";
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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero({ id }: HeroProps) {
  const { searchQuery, setSearchQuery } = useProducts();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), {
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
      className="relative flex min-h-[640px] flex-col overflow-visible bg-hero-bg lg:min-h-[720px]"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hero-bg-alt/80 via-hero-bg/55 to-hero-bg" />
      </div>

      <motion.div
        variants={containerVariants}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center px-6 pb-24 pt-[152px] text-center md:px-10 lg:px-20"
      >
        <motion.h1
          variants={textItemVariants}
          className="max-w-[720px] font-heading text-[32px] font-bold leading-[1.1] text-white md:text-[40px] lg:text-[56px]"
        >
          Make Your Interior More Minimalistic &amp; Modern
        </motion.h1>

        <motion.p
          variants={textItemVariants}
          className="mt-4 max-w-[640px] text-[15px] font-normal leading-[1.7] text-white/70 md:text-base"
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

        <motion.div
          variants={imageVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          style={{
            rotateX: reduceMotion ? 0 : rotateX,
            rotateY: reduceMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative mt-16 w-[70%] max-w-[420px] lg:mt-20 lg:w-[60%]"
        >
          <Image
            src="/images/product-hero.jpg"
            alt="Minimalist sofa with cushions, plant and side table"
            width={370}
            height={476}
            priority
            sizes="(min-width: 1024px) 60vw, 70vw"
            className="relative z-10 h-auto w-full translate-y-[18%] rounded-card object-cover shadow-card-hover"
          />

          <motion.div
            aria-hidden="true"
            animate={{ y: [0, -12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
              repeatDelay: 0.4,
            }}
            className="absolute left-[-8%] top-[18%] z-20 flex items-center gap-2 rounded-[14px] border border-white/20 bg-white/20 px-4 py-3 backdrop-blur-md"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
            <span className="h-2.5 w-2.5 rounded-full bg-navy-button" />
          </motion.div>

          <motion.div
            aria-hidden="true"
            animate={{ y: [0, 14, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
              repeatDelay: 0.6,
            }}
            className="absolute right-[-6%] bottom-[26%] z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/25 backdrop-blur-md"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <Search size={15} strokeWidth={2.2} className="text-white" />
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}