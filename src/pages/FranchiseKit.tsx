import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Download, CheckCircle, FileText, BarChart3, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import zaplyLogo from "@/assets/zaply-logo.jpg";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(15),
  city: z.string().trim().min(2, "Please enter your city").max(100),
});

type FormData = z.infer<typeof formSchema>;

const kitHighlights = [
  { icon: FileText, title: "Business Model Overview", desc: "Complete breakdown of the Zaply franchise structure" },
  { icon: BarChart3, title: "Financial Projections", desc: "ROI timelines, investment breakdown & revenue estimates" },
  { icon: Users, title: "Support & Training", desc: "Details on onboarding, mentorship & ongoing assistance" },
];

export default function FranchiseKit() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", city: "" },
  });

  const onSubmit = (data: FormData) => {
    // In production, send data to backend before enabling download
    setSubmitted(true);
    toast({ title: "Success!", description: "Your franchise kit is ready to download." });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src={zaplyLogo} alt="Zaply Logo" className="h-10 w-auto" />
        </a>
        <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-accent/10 text-accent font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
              Free Download
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Get Your <span className="text-gradient">Franchise Kit</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-10 max-w-md">
              Everything you need to evaluate the Zaply franchise opportunity — investment details, projections, and our proven success blueprint.
            </p>

            <div className="space-y-6">
              {kitHighlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form / Success */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-elevated border-0">
              <CardContent className="p-8">
                {!submitted ? (
                  <>
                    <h2 className="font-heading text-xl font-semibold text-foreground mb-1">
                      Fill in your details
                    </h2>
                    <p className="text-muted-foreground text-sm mb-6">
                      We'll send the kit to your email and unlock instant download.
                    </p>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl><Input type="tel" placeholder="+91 ..." {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="city" render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl><Input placeholder="Your city" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <Button type="submit" variant="hero" size="lg" className="w-full mt-2">
                          Get Franchise Kit
                        </Button>
                      </form>
                    </Form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                    </motion.div>
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-2">You're all set!</h2>
                    <p className="text-muted-foreground mb-6">
                      Click below to download your franchise kit. We've also sent a copy to your email.
                    </p>
                    <Button variant="hero" size="lg" className="gap-2" asChild>
                      <a href="#" onClick={(e) => { e.preventDefault(); alert("PDF download would trigger here"); }}>
                        <Download className="w-5 h-5" />
                        Download Franchise Kit
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
