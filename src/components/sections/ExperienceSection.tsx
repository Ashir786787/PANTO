"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ExperienceSectionProps {
  id: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ExperienceSection({ id }: ExperienceSectionProps) {
  const reduceMotion = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      id={id}
      className="border-b border-divider-soft bg-surface py-14 md:py-24"
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 md:grid-cols-[3fr_4fr] md:gap-12 md:px-10 lg:grid-cols-[44%_56%] lg:px-20">
        <motion.div
          ref={imageRef}
          style={{ y: reduceMotion ? 0 : parallaxY }}
          className="overflow-hidden rounded-card shadow-card will-change-transform"
        >
          <motion.div
            initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="relative aspect-[16/10] w-full md:aspect-[4/3]"
          >
            <Image
              src="/images/experience.jpg"
              alt="A modern living room furnished with a Panto velvet sofa"
              fill
              sizes="(min-width: 768px) 44vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-[480px] text-left"
        >
          <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-accent">
            Experience Us
          </span>
          <h2 className="mt-3 font-heading text-[26px] font-bold leading-[1.15] text-heading md:text-[36px]">
            We Provide You The Best Experience
          </h2>
          <p className="mt-5 text-[15px] leading-[1.5] text-body">
            From the first moment you step in, we make sure every detail feels
            considered — the lighting, the layout, and each carefully chosen
            piece of furniture working together. Our team guides you through
            style, comfort, and budget, so the space you end up with is the one
            you imagined.
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
      </div>
    </section>
  );
}