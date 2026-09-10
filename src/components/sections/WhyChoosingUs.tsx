"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface WhyChoosingUsProps {
  id: string;
}

interface Feature {
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    title: "Luxury facilities",
    description:
      "The advantage of hiring a workspace with us is that gives you comfortable service and all-around facilities.",
  },
  {
    title: "Affordable Price",
    description:
      "You can get a workspace of the highest quality at an affordable price and still enjoy the facilities that are only here.",
  },
  {
    title: "Many Choices",
    description:
      "We provide many unique work space choices so that you can choose the workspace to your liking.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function WhyChoosingUs({ id }: WhyChoosingUsProps) {
  return (
    <section id={id} className="border-b border-divider-soft bg-surface pb-14 pt-12 md:pb-24 md:pt-20">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 md:px-10 lg:grid-cols-[19%_70%] lg:gap-x-[11%] lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2
            variants={cardVariants}
            className="font-heading text-[32px] font-bold leading-[1.15] text-title md:text-[38px] lg:text-[40px]"
          >
            Why
            <br />
            <span className="whitespace-nowrap">Choosing Us</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="flex flex-col"
            >
              <h3 className="font-heading text-[20px] font-semibold text-title">
                {feature.title}
              </h3>
              <p className="mt-6 text-[15px] leading-[1.5] text-body">
                {feature.description}
              </p>
              <a
                href="#products"
                className="group mt-6 inline-flex items-center gap-2 self-start text-[13px] font-medium text-link"
              >
                More Info
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}