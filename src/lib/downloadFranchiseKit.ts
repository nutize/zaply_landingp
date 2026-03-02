import { jsPDF } from "jspdf";
import zaplyLogo from "@/assets/zaply-logo.jpg";

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

export async function downloadFranchiseKit() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  const orange = { r: 230, g: 140, b: 20 };
  const navy = { r: 35, g: 55, b: 80 };
  const lightBg = { r: 255, g: 248, b: 240 };
  const white = { r: 255, g: 255, b: 255 };
  const gray = { r: 100, g: 110, b: 120 };

  const logoBase64 = await loadImage(zaplyLogo);

  const addFooter = () => {
    doc.setFillColor(navy.r, navy.g, navy.b);
    doc.rect(0, pageHeight - 14, pageWidth, 14, "F");
    doc.setFontSize(8);
    doc.setTextColor(200, 210, 220);
    doc.text("© 2026 Zaply  •  portal.zaply.app  •  Confidential", pageWidth / 2, pageHeight - 5, { align: "center" });
  };

  let y = 0;
  const addSectionHeader = (title: string, icon: string) => {
    if (y > 240) { addFooter(); doc.addPage(); y = 30; }
    doc.setFillColor(orange.r, orange.g, orange.b);
    doc.roundedRect(margin, y, 4, 18, 2, 2, "F");
    doc.setFillColor(255, 248, 240);
    doc.circle(margin + 16, y + 9, 8, "F");
    doc.setFontSize(12);
    doc.setTextColor(orange.r, orange.g, orange.b);
    doc.text(icon, margin + 16, y + 12, { align: "center" });
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

  // PAGE 1 — COVER
  doc.setFillColor(orange.r, orange.g, orange.b);
  doc.rect(0, 0, pageWidth, 110, "F");
  doc.setFillColor(255, 180, 60);
  doc.rect(0, 90, pageWidth, 20, "F");
  doc.addImage(logoBase64, "JPEG", margin, 20, 40, 40);
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(white.r, white.g, white.b);
  doc.text("Franchise", margin + 50, 42);
  doc.text("Opportunity Kit", margin + 50, 58);
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 240, 220);
  doc.text("Your complete guide to partnering with Zaply", margin + 50, 72);
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

  // PAGE 2 — BUSINESS MODEL & INVESTMENT
  doc.addPage();
  y = 25;
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

  // PAGE 3 — ROI & SUPPORT
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

  // PAGE 4 — TERRITORY & NEXT STEPS
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
    doc.setFillColor(orange.r, orange.g, orange.b);
    doc.circle(margin + 10, y + 2, 7, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(white.r, white.g, white.b);
    doc.text(step.num, margin + 10, y + 5, { align: "center" });
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
}
