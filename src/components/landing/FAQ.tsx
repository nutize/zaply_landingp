import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the total investment required?",
    answer: "The initial franchise investment includes the franchise fee, equipment, inventory, and initial working capital. Please contact us for detailed investment information. We also offer financing options through our preferred lending partners.",
  },
  {
    question: "Do I need prior business experience?",
    answer: "While business experience is helpful, it's not required. Our comprehensive training program is designed to prepare you for success regardless of your background. We look for motivated individuals with strong work ethic and customer service orientation.",
  },
  {
    question: "How long does it take to open a franchise?",
    answer: "The typical timeline from application approval to grand opening is 4-6 months. This includes site selection, build-out, training, and pre-opening marketing.",
  },
  {
    question: "What ongoing support do you provide?",
    answer: "You'll receive dedicated support including a personal success manager, 24/7 technical support, quarterly business reviews, continuing education programs, and national marketing campaigns that benefit all franchisees.",
  },
  {
    question: "Can I own multiple territories?",
    answer: "Yes! Many of our most successful franchisees operate multiple locations. We offer multi-unit development agreements with preferential terms for qualified candidates looking to scale.",
  },
  {
    question: "What makes Zaply different from other franchises?",
    answer: "Our proprietary technology platform, protected territories, industry-leading training program, and strong franchisee support culture set us apart. Plus, our 95% success rate speaks for itself.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
            FAQ
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Get answers to the most common questions about becoming a Zaply franchisee.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-soft"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-accent hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
