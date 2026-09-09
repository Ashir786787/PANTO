"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeSection: string;
}

const NAV_LINKS = [
  { label: "Furniture", href: "#products" },
  { label: "Blog", href: "#materials" },
  { label: "About Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const FURNITURE_ITEMS = ["Sofa", "Chair", "Table", "Cabinet"];

export default function MobileMenu({
  open,
  onClose,
  activeSection,
}: MobileMenuProps) {
  const { count } = useCart();
  const [furnitureOpen, setFurnitureOpen] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-navy-button/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-[70] flex w-[85%] max-w-sm flex-col bg-surface shadow-card-hover lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <Image
                src="/images/panto-logo.jpg"
                alt="Panto"
                width={75}
                height={21}
                className="h-5 w-auto"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-navy-button transition-colors hover:bg-surface-alt"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link) =>
                  link.label === "Furniture" ? (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={() => setFurnitureOpen((v) => !v)}
                        aria-expanded={furnitureOpen}
                        className={`flex w-full items-center justify-between rounded-card px-4 py-3 text-left text-[16px] font-medium transition-colors ${
                          activeSection === link.href
                            ? "bg-accent/10 text-accent"
                            : "text-heading hover:bg-surface-alt"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            furnitureOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {furnitureOpen && (
                        <ul className="mt-1 flex flex-col gap-1 pl-4">
                          {FURNITURE_ITEMS.map((item) => (
                            <li key={item}>
                              <a
                                href="#products"
                                onClick={onClose}
                                className="block rounded-card px-4 py-2.5 text-[15px] font-medium text-body transition-colors hover:bg-surface-alt hover:text-accent"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={onClose}
                        className={`block rounded-card px-4 py-3 text-[16px] font-medium transition-colors ${
                          activeSection === link.href
                            ? "bg-accent/10 text-accent"
                            : "text-heading hover:bg-surface-alt"
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-3 border-t border-border px-6 py-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-button text-white">
                {count}
              </span>
              <span className="text-[14px] font-medium text-heading">
                {count} item{count === 1 ? "" : "s"} in cart
              </span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}