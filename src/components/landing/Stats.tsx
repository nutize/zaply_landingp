import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Active Franchises" },
  { value: "95%", label: "Success Rate" },
  { value: "₹2.4Cr", label: "Avg. Annual Revenue" },
  { value: "28", label: "States Covered" },
];

export function Stats() {
  return (
    <section className="py-20 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
