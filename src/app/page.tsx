import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedFood from "@/components/home/FeaturedFood";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/shared/Footer";
import HowItWorks from "@/components/home/HowItWorks";
import FutureOfDining from "@/components/home/FutureOfDining";
import FlashOffers from "@/components/home/FlashOffers";
import PartnerBrands from "@/components/home/PartnerBrands";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Categories />
      <HowItWorks />
      <FutureOfDining />
      <FlashOffers />
      <PartnerBrands />
      <FeaturedFood />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </main>
  );
}
