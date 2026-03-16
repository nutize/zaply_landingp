import { useState } from "react";
import { motion } from "framer-motion";
import { Download, CheckCircle, Briefcase, ArrowLeft } from "lucide-react";
import { downloadOfferLetter } from "@/lib/downloadOfferLetter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import zaplyLogo from "@/assets/zaply-logo.jpg";

export default function OfferLetter() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    await downloadOfferLetter();
    setDownloading(false);
    setDownloaded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src={zaplyLogo} alt="Zaply Logo" className="h-10 w-auto" />
        </a>
        <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full"
        >
          <Card className="shadow-elevated border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-accent" />
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                Job Offer Letter
              </h1>
              <p className="text-muted-foreground mb-1 text-lg font-semibold">Digital Marketing Manager</p>
              <p className="text-muted-foreground text-sm mb-8">
                Download the official offer letter with position details, responsibilities, compensation, and terms.
              </p>

              {!downloaded ? (
                <Button variant="hero" size="lg" className="gap-2" onClick={handleDownload} disabled={downloading}>
                  <Download className="w-5 h-5" />
                  {downloading ? "Generating..." : "Download Offer Letter"}
                </Button>
              ) : (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <CheckCircle className="w-12 h-12 text-accent mx-auto mb-3" />
                  <p className="text-foreground font-semibold mb-4">Downloaded successfully!</p>
                  <Button variant="hero" size="lg" className="gap-2" onClick={handleDownload}>
                    <Download className="w-5 h-5" />
                    Download Again
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
