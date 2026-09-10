"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

export default function MaterialsSection({ id }: MaterialsSectionProps) {
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
          <a
            href="#products"
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
          </a>
        </motion.div>

<motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex w-full flex-col items-stretch gap-[18px] lg:flex-row lg:items-stretch lg:gap-[24px]"
        >
          <div className="flex w-full flex-col gap-[22px] lg:w-[220px]">
            <motion.div
              variants={collageItemVariants}
              className="overflow-hidden rounded-card shadow-card"
            >
              <Image
                src="/images/material-1.jpg?v=2"
                alt="A chair surrounded by warm room textures"
                width={223}
                height={229}
                sizes="(min-width: 1024px) 26vw, 100vw"
                className="aspect-square w-full object-cover"
              />
            </motion.div>
            <motion.div
              variants={collageItemVariants}
              className="overflow-hidden rounded-card shadow-card"
            >
              <Image
                src="/images/material-2.jpg?v=2"
                alt="A white sofa against a teal wall"
                width={223}
                height={318}
                sizes="(min-width: 1024px) 26vw, 100vw"
                className="aspect-square w-full object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            variants={collageItemVariants}
            className="aspect-[4/5] w-full overflow-hidden rounded-card shadow-card lg:mt-[64px] lg:h-[288px] lg:w-[232px] lg:aspect-auto"
          >
            <Image
              src="/images/material-3.jpg?v=2"
              alt="Dining chairs finished in premium upholstery"
              width={445}
              height={445}
              sizes="(min-width: 1024px) 27vw, 100vw"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}