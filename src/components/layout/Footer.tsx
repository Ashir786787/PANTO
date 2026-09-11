"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";

interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function FacebookIcon({ size = 20, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon({ size = 20, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function InstagramIcon({ size = 20, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string }>;
}

const EXPLORE_LINKS: FooterColumn = {
  title: "Explore",
  links: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/#products" },
    { label: "About Us", href: "/#why-us" },
    { label: "Reviews", href: "/#reviews" },
  ],
};

const USEFUL_LINKS: FooterColumn = {
  title: "Useful Links",
  links: [
    { label: "Help Center", href: "/#contact" },
    { label: "Track Order", href: "/#contact" },
    { label: "Return Policy", href: "/#contact" },
    { label: "Shipping Info", href: "/#contact" },
  ],
};

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
];

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = () => {
    setSubscribed(true);
    reset();
  };

  return (
    <footer id="contact" className="bg-surface-alt">
      <div className="mx-auto max-w-[1280px] px-6 pt-16 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12">
          <div className="max-w-sm">
            <span className="font-heading text-3xl font-bold text-heading">
              Panto
            </span>
            <p className="mt-4 text-[15px] leading-[1.7] text-body">
              Make your interior more minimalistic &amp; modern with
              thoughtfully crafted, premium furniture designed to last a
              lifetime.
            </p>

            {subscribed ? (
              <p className="mt-6 rounded-card border border-accent/30 bg-accent/10 px-4 py-3 text-[14px] font-medium text-accent-hover">
                You&apos;re subscribed! Check your inbox.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 flex items-center gap-2"
                noValidate
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email address"
                  autoComplete="email"
                  aria-invalid={errors.email ? true : undefined}
                  {...register("email")}
                  className="h-12 w-full rounded-pill border border-border bg-surface px-5 text-[14px] text-heading outline-none transition-colors placeholder:text-body-light focus:border-accent"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-hover"
                >
                  <Send size={17} strokeWidth={2} />
                </button>
              </form>
            )}
            {errors.email && (
              <p className="mt-2 text-[13px] font-medium text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {[EXPLORE_LINKS, USEFUL_LINKS].map((column) => (
            <div key={column.title}>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.05em] text-accent">
                {column.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[15px] font-medium text-heading transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.05em] text-accent">
              Follow Us
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-[15px] font-medium text-heading transition-colors hover:text-accent"
                  >
                    <social.icon
                      size={17}
                      strokeWidth={1.8}
                      className="text-body transition-colors group-hover:text-accent"
                    />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 md:flex-row">
          <p className="text-[14px] text-body">
            &copy; {new Date().getFullYear()} Panto — All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/#contact"
              className="text-[14px] text-body transition-colors hover:text-accent"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/#contact"
              className="text-[14px] text-body transition-colors hover:text-accent"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}