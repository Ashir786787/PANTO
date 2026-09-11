import Hero from "@/components/sections/Hero";
import WhyChoosingUs from "@/components/sections/WhyChoosingUs";
import BestSellingProducts from "@/components/sections/BestSellingProducts";
import ExperienceSection from "@/components/sections/ExperienceSection";
import MaterialsSection from "@/components/sections/MaterialsSection";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero id="hero" />
      <WhyChoosingUs id="why-us" />
      <BestSellingProducts id="products" />
      <ExperienceSection id="experience" />
      <MaterialsSection id="materials" />
      <Testimonials id="reviews" />
    </>
  );
}
