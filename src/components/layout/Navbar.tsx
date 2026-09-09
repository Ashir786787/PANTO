"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, ShoppingBag } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useCart } from "@/context/CartContext";
import MobileMenu from "@/components/layout/MobileMenu";

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Furniture", href: "#products", hasDropdown: true },
  { label: "Blog", href: "#materials" },
  { label: "About Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const FURNITURE_ITEMS = ["Sofa", "Chair", "Table", "Cabinet"];

const SECTION_IDS = [
  "home",
  "why-us",
  "products",
  "experience",
  "materials",
  "reviews",
];

export default function Navbar() {
  const scrolled = useScrollPosition(40);
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-surface/95 shadow-[0_8px_30px_-12px_rgba(18,21,26,0.25)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[88px] max-w-[1280px] items-center justify-between px-6 md:px-10 lg:px-20"
        >
          <a href="#home" className="flex items-center">
            <Image
              src="/images/panto-logo.jpg"
              alt="Panto"
              width={75}
              height={21}
              className={`h-5 w-auto transition-all ${
                scrolled ? "invert" : ""
              }`}
              priority
            />
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <a
                    href={link.href}
                    aria-expanded={dropdownOpen}
                    className={`flex items-center gap-1.5 text-[15px] font-medium transition-colors ${
                      activeSection === link.href
                        ? scrolled
                          ? "text-accent"
                          : "text-accent"
                        : scrolled
                          ? "text-heading hover:text-accent"
                          : "text-white hover:text-accent"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      className={`transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </a>
                  {dropdownOpen && (
                    <div className="absolute left-0 top-full pt-3">
                      <ul className="w-44 overflow-hidden rounded-card border border-border bg-surface py-2 shadow-card">
                        {FURNITURE_ITEMS.map((item) => (
                          <li key={item}>
                            <a
                              href="#products"
                              className="block px-4 py-2 text-[14px] font-medium text-heading transition-colors hover:bg-surface-alt hover:text-accent"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-[15px] font-medium transition-colors ${
                      activeSection === link.href
                        ? "text-accent"
                        : scrolled
                          ? "text-heading hover:text-accent"
                          : "text-white hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={`Cart with ${count} items`}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                scrolled
                  ? "border-border bg-surface text-navy-button shadow-card hover:bg-surface-alt"
                  : "border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
              }`}
            >
              <ShoppingBag size={18} strokeWidth={1.8} />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            </button>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 lg:hidden ${
                scrolled
                  ? "border-border bg-surface text-navy-button shadow-card"
                  : "border-white/25 bg-white/10 text-white backdrop-blur-md"
              }`}
            >
              <Menu size={18} strokeWidth={1.8} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}