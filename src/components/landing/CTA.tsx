import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Franchise Journey?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Take the first step toward business ownership. Our team is ready to answer 
            your questions and guide you through the process.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://zaply.in/apply" target="_blank" rel="noopener noreferrer">
              <Button
                variant="hero"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 group"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Button
              variant="heroOutline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Schedule a Call
            </Button>
          </div>

          <p className="mt-8 text-primary-foreground/60 text-sm">
            Limited territories available • Apply before they're gone
          </p>
        </motion.div>
      </div>
    </section>
  );
}
