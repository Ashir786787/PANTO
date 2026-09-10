"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Avatar from "@/components/shared/Avatar";
import type { Testimonial } from "@/types";

interface TestimonialsProps {
  id: string;
}

const GAP = 32;
const AUTOPLAY_MS = 5000;

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-surface-alt">
        <Image
          src={item.photo}
          alt={`Photo from ${item.name}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="relative flex flex-1 flex-col items-center px-6 pb-7 pt-12 text-center">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        />
        <Avatar
          src={item.avatar}
          alt={`Avatar of ${item.name}`}
          boost={item.avatarBoost}
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2"
        />

        <h3 className="font-heading text-[18px] font-bold leading-snug text-heading md:text-[19px]">
          {item.name}
        </h3>
        <span className="mt-0.5 text-[12px] font-medium text-body-light">
          {item.role}
        </span>
        <p className="mt-3 line-clamp-2 text-[15px] leading-[1.6] text-body">
          {item.quote}
        </p>

        <div className="mt-auto flex items-center justify-center gap-0.5 pt-4">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className={`h-[15px] w-[15px] ${
                i < item.rating
                  ? "fill-star text-star"
                  : "fill-transparent text-star-empty"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ id }: TestimonialsProps) {
  const reduceMotion = useReducedMotion();
  const isMultiView = useMediaQuery("(min-width: 768px)");
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewportW, setViewportW] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  const perView = isMultiView ? 3 : 1;
  const slideW =
    perView === 1
      ? viewportW
      : (viewportW - GAP * (perView - 1)) / perView;
  const step = slideW + GAP;
  const maxPage = Math.max(0, testimonials.length - perView);
  const safePage = Math.min(Math.max(page, 0), maxPage);
  const offsetX = -safePage * step;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewportW(el.getBoundingClientRect().width);
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || isPaused || perView !== 1) return;
    const id = window.setInterval(
      () => setPage((p) => (p + 1) % (maxPage + 1)),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion, isPaused, perView, maxPage]);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(maxPage, p + 1));

  return (
    <section id={id} className="bg-surface py-14 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20">
        <div className="flex flex-col items-center text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-accent">
            Testimonials
          </span>
          <h2 className="mt-3 font-heading text-[32px] font-bold leading-[1.15] text-title md:text-[38px] lg:text-[40px]">
            Our Client Reviews
          </h2>
        </div>

        <div className="relative mt-10">
          <button
            type="button"
            onClick={goPrev}
            disabled={safePage === 0}
            aria-label="Previous testimonials"
            className="absolute -left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-heading shadow-card transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 md:-left-6 lg:-left-9"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={viewportRef}
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <motion.div
              drag={reduceMotion ? false : "x"}
              dragConstraints={{ left: -(maxPage * step), right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                const threshold = step * 0.2;
                if (info.offset.x < -threshold || info.velocity.x < -400)
                  goNext();
                else if (info.offset.x > threshold || info.velocity.x > 400)
                  goPrev();
              }}
              animate={{ x: offsetX }}
              transition={
                reduceMotion
                  ? { duration: 0.3, ease: "easeOut" }
                  : { type: "spring", stiffness: 260, damping: 32 }
              }
              className="flex items-stretch gap-8"
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0"
                  style={{ width: slideW > 0 ? slideW : undefined }}
                >
                  <div
                    className={
                      slideW > 0
                        ? "h-full"
                        : "h-full w-full lg:w-[calc((100%-64px)/3)]"
                    }
                  >
                    <TestimonialCard item={item} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={safePage === maxPage}
            aria-label="Next testimonials"
            className="absolute -right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-heading shadow-card transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 md:-right-6 lg:-right-9"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 md:hidden">
          {Array.from({ length: maxPage + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Go to testimonial page ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === safePage
                  ? "w-6 bg-accent"
                  : "w-2 bg-divider-soft hover:bg-body-light"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}