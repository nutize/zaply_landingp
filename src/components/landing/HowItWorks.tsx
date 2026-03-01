import { motion } from "framer-motion";
import { FileText, UserCheck, GraduationCap, Rocket } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Submit Application",
    description: "Complete our online application form with your background and investment details.",
  },
  {
    icon: UserCheck,
    step: "02",
    title: "Discovery Call",
    description: "Meet with our franchise team to discuss your goals and answer your questions.",
  },
  {
    icon: GraduationCap,
    step: "03",
    title: "Training Program",
    description: "Complete our comprehensive 8-week training at Zaply headquarters.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Grand Opening",
    description: "Launch your franchise with our full marketing and operational support.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
            The Journey
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Path to Ownership
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From application to grand opening, we guide you every step of the way.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number badge */}
                <div className="relative z-10 mb-6">
                  <div className="w-20 h-20 rounded-full bg-card border-4 border-accent flex items-center justify-center shadow-glow">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
