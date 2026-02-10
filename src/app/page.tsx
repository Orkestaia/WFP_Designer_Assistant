import HeaderNew from "@/components/HeaderNew";
import HeroSection from "@/components/HeroSection";
import DesignTool from "@/components/DesignTool";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeaderNew />
      <HeroSection />
      <section id="design-tool" className="py-16">
        <DesignTool />
      </section>
      <HowItWorks />
    </main>
  );
}
