import { MotionConfig } from "framer-motion";
import { ProductsProvider } from "@/context/ProductsContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhyChoosingUs from "@/components/sections/WhyChoosingUs";
import BestSellingProducts from "@/components/sections/BestSellingProducts";
import ExperienceSection from "@/components/sections/ExperienceSection";
import MaterialsSection from "@/components/sections/MaterialsSection";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <ProductsProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col">
              <Hero id="hero" />
              <WhyChoosingUs id="why-us" />
              <BestSellingProducts id="products" />
              <ExperienceSection id="experience" />
              <MaterialsSection id="materials" />
              <Testimonials id="reviews" />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </ProductsProvider>
    </MotionConfig>
  );
}