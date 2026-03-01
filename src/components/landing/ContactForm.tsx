import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long").regex(/^[+]?[\d\s-]+$/, "Invalid phone number format"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Thank you for your interest!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

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
              Fill out the form and one of our franchise specialists will contact you 
              within 24 hours to discuss your opportunity.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email Us</p>
                  <p className="text-muted-foreground">franchise@zaply.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Call Us</p>
                  <p className="text-muted-foreground">+91-ZAPLY-GO</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 shadow-elevated border border-border"
            >
              <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                Request Franchise Information
              </h3>

              <div className="space-y-5">
                <div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-12 h-12"
                    />
                  </div>
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-12 h-12"
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-12 h-12"
                    />
                  </div>
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                    <Textarea
                      name="message"
                      placeholder="Tell us about yourself and why you're interested in Zaply franchise..."
                      value={formData.message}
                      onChange={handleChange}
                      className="pl-12 min-h-[120px] resize-none"
                    />
                  </div>
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Inquiry
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-muted-foreground text-sm text-center mt-4">
                We respect your privacy. Your information will never be shared.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
