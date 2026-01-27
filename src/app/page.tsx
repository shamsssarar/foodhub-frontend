import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedFood from "@/components/home/FeaturedFood";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedFood />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
