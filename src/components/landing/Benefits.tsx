import { motion } from "framer-motion";
import { TrendingUp, Shield, Users, Zap, HeadphonesIcon, Target } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Proven Track Record",
    description: "Join a network with 95% franchise success rate and consistent year-over-year growth.",
  },
  {
    icon: Shield,
    title: "Protected Territory",
    description: "Exclusive operating zones ensure you're the only Zaply franchise in your market.",
  },
  {
    icon: Users,
    title: "Comprehensive Training",
    description: "8-week intensive program covering operations, marketing, and customer success.",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Technology",
    description: "Proprietary software and tools that streamline your operations and boost efficiency.",
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing Support",
    description: "Dedicated success manager and 24/7 support line for all your business needs.",
  },
  {
    icon: Target,
    title: "Marketing Power",
    description: "National advertising campaigns and local marketing support to drive customers to you.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
            Why Choose Zaply
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We've built a franchise system that gives you the tools, training, and support 
            to build a thriving business.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-elevated"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
