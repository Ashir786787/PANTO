"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MaterialsSectionProps {
  id: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const collageItemVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

interface MaterialCardProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  eager?: boolean;
  carouselRef: React.RefObject<HTMLDivElement | null>;
  className: string;
}

function MaterialCard({
  src,
  alt,
  width,
  height,
  eager = false,
  carouselRef,
  className,
}: MaterialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef({ left: 0, width: 0, containerWidth: 0 });
  const isMobile = useMediaQuery("(max-width: 767px)");

  const { scrollX } = useScroll({ container: carouselRef });

  useLayoutEffect(() => {
    if (!isMobile) return;
    const card = cardRef.current;
    const container = carouselRef.current;
    if (!card || !container) return;
    const cardRect = card.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    measureRef.current = {
      left: cardRect.left - containerRect.left,
      width: cardRect.width,
      containerWidth: containerRect.width,
    };
  }, [isMobile, carouselRef]);

  const opacity = useTransform(scrollX, (x) => {
    const { left, width, containerWidth } = measureRef.current;
    if (!width || !containerWidth) return 1;
    const target = left - (containerWidth - width) / 2;
    const t = Math.abs(x - target) / (width / 1.2);
    return 1 - 0.4 * Math.min(1, t);
  });

  const scale = useTransform(scrollX, (x) => {
    const { left, width, containerWidth } = measureRef.current;
    if (!width || !containerWidth) return 1;
    const target = left - (containerWidth - width) / 2;
    const t = Math.abs(x - target) / (width / 1.2);
    return 1 - 0.06 * Math.min(1, t);
  });

  return (
    <motion.div
      variants={collageItemVariants}
      ref={cardRef}
      className={className}
    >
      <motion.div
        style={isMobile ? { opacity, scale } : { opacity: 1, scale: 1 }}
        className="h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : undefined}
          sizes="(min-width: 1024px) 26vw, (min-width: 768px) 100vw, 78vw"
          className="h-full w-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

export default function MaterialsSection({ id }: MaterialsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id={id}
      className="border-b border-divider-soft bg-surface py-14 md:py-24"
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 md:grid-cols-[3fr_4fr] md:gap-12 md:px-10 lg:grid-cols-[44%_56%] lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-[480px]"
        >
          <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-accent">
            Materials
          </span>
          <h2 className="mt-3 font-heading text-[26px] font-bold leading-[1.15] text-heading md:text-[36px]">
            Very Serious Materials For Making Furniture
          </h2>
          <p className="mt-5 text-[15px] leading-[1.5] text-body">
            We source solid timber, breathable fabrics, and durable finishes
            that hold up to daily life. Every board is kiln-dried, every seam is
            stitched to last, and each surface is tested for wear, so the pieces
            we ship stay beautiful long after they arrive.
          </p>
          <Link
            href="/#products"
            className="group mt-7 inline-flex items-center gap-2 self-start text-[13px] font-medium text-link"
          >
            Read More
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              <Image
                src="/images/forward-link-icon.png"
                alt=""
                width={48}
                height={24}
                aria-hidden="true"
                className="h-[13px] w-auto"
              />
            </span>
          </Link>
        </motion.div>

        <motion.div
          ref={carouselRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-3 md:flex-col md:snap-none md:gap-[22px] md:overflow-visible lg:grid lg:grid-cols-[minmax(0,220px)_minmax(0,232px)] lg:grid-rows-[repeat(2,auto)] lg:gap-[24px]"
        >
          <MaterialCard
            src="/images/material-1.jpg?v=2"
            alt="A chair surrounded by warm room textures"
            width={223}
            height={229}
            eager
            carouselRef={carouselRef}
            className="relative aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden rounded-card shadow-card md:w-full md:aspect-square lg:col-start-1 lg:row-start-1"
          />
          <MaterialCard
            src="/images/material-2.jpg?v=2"
            alt="A white sofa against a teal wall"
            width={223}
            height={318}
            eager
            carouselRef={carouselRef}
            className="relative aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden rounded-card shadow-card md:w-full md:aspect-square lg:col-start-1 lg:row-start-2"
          />
          <MaterialCard
            src="/images/material-3.jpg?v=2"
            alt="Dining chairs finished in premium upholstery"
            width={445}
            height={445}
            carouselRef={carouselRef}
            className="relative aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden rounded-card shadow-card md:w-full lg:col-start-2 lg:row-span-2 lg:mt-[64px] lg:h-[288px] lg:w-[232px] lg:self-start lg:aspect-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}