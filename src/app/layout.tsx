import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const baloo = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Panto — Furniture",
  description:
    "Make your interior more minimalistic & modern with Panto's premium furniture collection.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
