import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { jsPDF } from "jspdf";
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
    // Send to WhatsApp
    const whatsappNumber = "918420323232";
    const message = encodeURIComponent(
      `📥 Franchise Kit Download\n\n👤 Name: ${data.name}\n📧 Email: ${data.email}\n📱 Phone: ${data.phone}\n🏙️ City: ${data.city}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

    setSubmitted(true);
    toast({ title: "Success!", description: "Your franchise kit is ready to download." });
  };

  const downloadPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    // Brand colors
    const orange = { r: 230, g: 140, b: 20 };
    const navy = { r: 35, g: 55, b: 80 };
    const lightBg = { r: 255, g: 248, b: 240 };
    const white = { r: 255, g: 255, b: 255 };
    const gray = { r: 100, g: 110, b: 120 };

    // Load logo as base64
    const loadImage = (src: string): Promise<string> =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext("2d")!.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/jpeg"));
        };
        img.src = src;
      });

    const logoBase64 = await loadImage(zaplyLogo);

    // ── Helper: add footer on every page ──
    const addFooter = () => {
      doc.setFillColor(navy.r, navy.g, navy.b);
      doc.rect(0, pageHeight - 14, pageWidth, 14, "F");
      doc.setFontSize(8);
      doc.setTextColor(200, 210, 220);
      doc.text("© 2026 Zaply  •  portal.zaply.app  •  Confidential", pageWidth / 2, pageHeight - 5, { align: "center" });
    };

    // ── Helper: decorated section header ──
    let y = 0;
    const addSectionHeader = (title: string, icon: string) => {
      if (y > 240) { addFooter(); doc.addPage(); y = 30; }
      // Accent bar
      doc.setFillColor(orange.r, orange.g, orange.b);
      doc.roundedRect(margin, y, 4, 18, 2, 2, "F");
      // Icon circle
      doc.setFillColor(255, 248, 240);
      doc.circle(margin + 16, y + 9, 8, "F");
      doc.setFontSize(12);
      doc.setTextColor(orange.r, orange.g, orange.b);
      doc.text(icon, margin + 16, y + 12, { align: "center" });
      // Title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(navy.r, navy.g, navy.b);
      doc.text(title, margin + 30, y + 13);
      y += 26;
    };

    const addBullet = (text: string) => {
      if (y > 265) { addFooter(); doc.addPage(); y = 30; }
      doc.setFillColor(orange.r, orange.g, orange.b);
      doc.circle(margin + 6, y - 1.5, 1.8, "F");
      doc.setFontSize(10.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(gray.r, gray.g, gray.b);
      const lines = doc.splitTextToSize(text, contentWidth - 16);
      doc.text(lines, margin + 12, y);
      y += lines.length * 5.5 + 3;
    };

    const addKeyValue = (key: string, value: string) => {
      if (y > 265) { addFooter(); doc.addPage(); y = 30; }
      doc.setFontSize(10.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(navy.r, navy.g, navy.b);
      doc.text(key, margin + 8, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(gray.r, gray.g, gray.b);
      doc.text(value, margin + 70, y);
      y += 7;
    };

    // ═══════════════════════════════════════════
    // PAGE 1 — COVER
    // ═══════════════════════════════════════════
    // Full-page orange gradient top band
    doc.setFillColor(orange.r, orange.g, orange.b);
    doc.rect(0, 0, pageWidth, 110, "F");
    // Lighter overlay stripe
    doc.setFillColor(255, 180, 60);
    doc.rect(0, 90, pageWidth, 20, "F");

    // Logo
    doc.addImage(logoBase64, "JPEG", margin, 20, 40, 40);

    // Title text on orange
    doc.setFontSize(36);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(white.r, white.g, white.b);
    doc.text("Franchise", margin + 50, 42);
    doc.text("Opportunity Kit", margin + 50, 58);

    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 240, 220);
    doc.text("Your complete guide to partnering with Zaply", margin + 50, 72);

    // Navy section below
    doc.setFillColor(navy.r, navy.g, navy.b);
    doc.rect(0, 110, pageWidth, 50, "F");

    doc.setFontSize(11);
    doc.setTextColor(200, 215, 230);
    const taglines = [
      "Proven hyperlocal quick-commerce model",
      "Full technology & operational support",
      "High ROI with low overhead",
    ];
    taglines.forEach((t, i) => {
      doc.text(`✦  ${t}`, margin + 10, 125 + i * 12);
    });

    // Body area
    y = 175;
    doc.setFillColor(lightBg.r, lightBg.g, lightBg.b);
    doc.roundedRect(margin - 4, y - 6, contentWidth + 8, 95, 4, 4, "F");

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(navy.r, navy.g, navy.b);
    doc.text("What's Inside", margin + 4, y + 4);
    y += 14;

    const tocItems = [
      "Business Model Overview — how Zaply works and your role",
      "Investment Breakdown — transparent cost structure",
      "Revenue & ROI Projections — realistic financial outlook",
      "Support & Training — everything we provide",
      "Territory & Expansion — growth roadmap",
      "Next Steps — how to get started today",
    ];
    tocItems.forEach((item, i) => {
      doc.setFontSize(10.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(gray.r, gray.g, gray.b);
      doc.text(`${i + 1}.  ${item}`, margin + 6, y);
      y += 8;
    });

    addFooter();

    // ═══════════════════════════════════════════
    // PAGE 2 — BUSINESS MODEL & INVESTMENT
    // ═══════════════════════════════════════════
    doc.addPage();
    y = 25;

    // Top accent line
    doc.setFillColor(orange.r, orange.g, orange.b);
    doc.rect(0, 0, pageWidth, 4, "F");

    addSectionHeader("Business Model Overview", "📋");
    addBullet("Zaply is a hyperlocal quick-commerce platform delivering essentials in under 30 minutes across Tier 1, 2, and 3 cities in India.");
    addBullet("Franchisees operate branded micro-fulfillment centers with Zaply's proprietary technology stack handling orders, logistics, and customer experience.");
    addBullet("Low overhead model: no large warehousing needed. Lean operations with 3–8 staff per unit.");
    addBullet("Revenue from multiple streams: delivery commissions, subscription programs, local advertising partnerships, and premium placement fees.");
    addBullet("Franchisees benefit from Zaply's national brand campaigns while running hyper-targeted local marketing.");

    y += 8;

    addSectionHeader("Investment Breakdown", "💰");

    // Investment table
    const tableData = [
      ["Component", "Range (INR)"],
      ["Franchise Fee", "5,00,000 – 10,00,000"],
      ["Setup & Infrastructure", "3,00,000 – 6,00,000"],
      ["Technology Integration", "1,00,000 – 2,00,000"],
      ["Working Capital", "2,00,000 – 4,00,000"],
      ["Total Investment", "11,00,000 – 22,00,000"],
    ];

    const colW = [90, 70];
    const startX = margin + 8;
    tableData.forEach((row, ri) => {
      if (y > 265) { addFooter(); doc.addPage(); y = 30; }
      const isHeader = ri === 0;
      const isTotal = ri === tableData.length - 1;

      if (isHeader) {
        doc.setFillColor(navy.r, navy.g, navy.b);
        doc.rect(startX, y - 5, colW[0] + colW[1], 8, "F");
        doc.setTextColor(white.r, white.g, white.b);
      } else if (isTotal) {
        doc.setFillColor(255, 248, 240);
        doc.rect(startX, y - 5, colW[0] + colW[1], 8, "F");
        doc.setTextColor(orange.r, orange.g, orange.b);
      } else {
        doc.setTextColor(gray.r, gray.g, gray.b);
        if (ri % 2 === 0) {
          doc.setFillColor(248, 248, 252);
          doc.rect(startX, y - 5, colW[0] + colW[1], 8, "F");
        }
      }

      doc.setFontSize(10);
      doc.setFont("helvetica", isHeader || isTotal ? "bold" : "normal");
      doc.text(row[0], startX + 3, y);
      doc.text(row[1], startX + colW[0] + 3, y);
      y += 8;
    });

    addFooter();

    // ═══════════════════════════════════════════
    // PAGE 3 — ROI & SUPPORT
    // ═══════════════════════════════════════════
    doc.addPage();
    y = 25;
    doc.setFillColor(orange.r, orange.g, orange.b);
    doc.rect(0, 0, pageWidth, 4, "F");

    addSectionHeader("Revenue & ROI Projections", "📈");

    addKeyValue("Monthly Revenue", "₹8,00,000 – ₹15,00,000 per unit");
    addKeyValue("Break-even", "8 – 14 months");
    addKeyValue("24-Month ROI", "40% – 70%");
    addKeyValue("Gross Margin", "18% – 25%");
    y += 4;
    addBullet("Revenue scales with order volume; top-performing units exceed ₹20L/month within 18 months.");
    addBullet("Seasonal campaigns and festival demand provide significant revenue spikes (Diwali, New Year, etc.).");
    addBullet("Subscription-based customers provide predictable recurring revenue baseline.");

    y += 8;

    addSectionHeader("Support & Training", "🎓");
    addBullet("Comprehensive 2-week onboarding: operations, technology platform, inventory management, and local marketing playbook.");
    addBullet("Dedicated Franchise Success Manager assigned for the first 6 months with weekly check-ins.");
    addBullet("Access to Zaply's real-time analytics dashboard for performance tracking, demand forecasting, and P&L monitoring.");
    addBullet("Ongoing marketing support: national brand campaigns, social media templates, local print collateral, and launch event coordination.");
    addBullet("Quarterly business reviews with the leadership team and peer networking with other franchisees.");
    addBullet("24/7 technical support hotline and dedicated Slack channel for operational queries.");

    addFooter();

    // ═══════════════════════════════════════════
    // PAGE 4 — TERRITORY & NEXT STEPS
    // ═══════════════════════════════════════════
    doc.addPage();
    y = 25;
    doc.setFillColor(orange.r, orange.g, orange.b);
    doc.rect(0, 0, pageWidth, 4, "F");

    addSectionHeader("Territory & Expansion", "🗺️");
    addBullet("Exclusive territory rights within a defined radius ensuring no cannibalization between franchise units.");
    addBullet("Priority access to adjacent territories as you scale — multi-unit operators enjoy reduced franchise fees.");
    addBullet("Currently expanding across 50+ cities; early movers benefit from prime territory selection.");
    addBullet("Urban, semi-urban, and Tier-3 models available with adjusted investment and operational guidelines.");

    y += 8;

    addSectionHeader("Next Steps", "🚀");

    const steps = [
      { num: "01", title: "Review This Kit", desc: "Take your time understanding the model, financials, and support structure." },
      { num: "02", title: "Schedule a Discovery Call", desc: "Speak with our franchise team to discuss your city and goals." },
      { num: "03", title: "Visit portal.zaply.app", desc: "Access detailed resources, FAQs, and submit your application." },
      { num: "04", title: "Due Diligence & Agreement", desc: "Complete verification, sign the franchise agreement, and begin onboarding." },
    ];

    steps.forEach((step) => {
      if (y > 255) { addFooter(); doc.addPage(); y = 30; }
      // Step number circle
      doc.setFillColor(orange.r, orange.g, orange.b);
      doc.circle(margin + 10, y + 2, 7, "F");
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(white.r, white.g, white.b);
      doc.text(step.num, margin + 10, y + 5, { align: "center" });
      // Title & desc
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(navy.r, navy.g, navy.b);
      doc.text(step.title, margin + 24, y + 2);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(gray.r, gray.g, gray.b);
      doc.text(step.desc, margin + 24, y + 9);
      y += 20;
    });

    // CTA box
    y += 10;
    doc.setFillColor(navy.r, navy.g, navy.b);
    doc.roundedRect(margin, y, contentWidth, 35, 4, 4, "F");
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(white.r, white.g, white.b);
    doc.text("Ready to Start Your Zaply Journey?", pageWidth / 2, y + 14, { align: "center" });
    doc.setFontSize(11);
    doc.setTextColor(255, 200, 100);
    doc.text("Visit portal.zaply.app or call us today!", pageWidth / 2, y + 25, { align: "center" });

    addFooter();

    doc.save("Zaply-Franchise-Kit.pdf");
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
                    <Button variant="hero" size="lg" className="gap-2" onClick={downloadPDF}>
                        <Download className="w-5 h-5" />
                        Download Franchise Kit
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
