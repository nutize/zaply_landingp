import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const whatsappNumber = "918100892075";
  const whatsappMessage = encodeURIComponent("Hi, I'm interested in the Zaply franchise opportunity. Please share more details.");

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
              Get Started
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Reach out to us directly and one of our franchise specialists will
              help you get started with your Zaply franchise.
            </p>

            <div className="space-y-4">
              <a href="mailto:info@zaply.in" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email Us</p>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">info@zaply.in</p>
                </div>
              </a>
              <a href="tel:+918100892075" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Call Us</p>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">+91 81008 92075</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-elevated border border-border text-center">
              <div className="w-20 h-20 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-[#25D366]" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                Chat With Us on WhatsApp
              </h3>
              <p className="text-muted-foreground mb-6">
                Get instant replies from our franchise team. Tap the button below to start a conversation.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="hero" size="lg" className="w-full bg-[#25D366] hover:bg-[#1da851] text-white">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Start WhatsApp Chat
                </Button>
              </a>
              <p className="text-muted-foreground text-sm mt-4">
                Available Mon–Sat, 9 AM – 7 PM IST
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
