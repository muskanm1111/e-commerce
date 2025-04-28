import Hero from "./components/home/Hero";
import FeaturedProducts from "./components/home/FeaturedProducts";
import CategoriesSection from "./components/home/CategoriesSection";
import Testimonials from "./components/home/Testimonials";
import Benefits from "./components/home/Benefits";
// import NewsletterSection from "./components/home/NewsletterSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <CategoriesSection />
      <Benefits />
      <Testimonials />
      
    </div>
  );
}
