import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import CategoriesSection from "@/components/Categories";
import FeaturedBanner from "@/components/FeaturedBanner";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <FeaturedBanner />
      <AppDownload />
      <Footer />
    </>
  );
}
