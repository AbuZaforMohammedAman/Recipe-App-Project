import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import TopRecipes from "@/components/TopRecipes";

export default function Home() {
  return (
    <div className="min-h-screen bg-light">
      <Header />
      <HeroSection />
      <TopRecipes />
      <Footer />
    </div>
  );
}
