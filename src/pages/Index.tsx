import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { ContactForm } from "@/components/landing/ContactForm";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <ContactForm />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
