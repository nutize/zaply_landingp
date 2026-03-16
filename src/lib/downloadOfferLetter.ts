import { jsPDF } from "jspdf";


export interface OfferLetterData {
  candidateName: string;
  dateOfJoining: string;
  salary: string;
}

export async function downloadOfferLetter(data: OfferLetterData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  const orange = { r: 230, g: 140, b: 20 };
  const navy = { r: 35, g: 55, b: 80 };
  const gray = { r: 80, g: 90, b: 100 };
  const white = { r: 255, g: 255, b: 255 };

  const logoBase64 = await loadImage(zaplyLogo);

  // --- HEADER BAR ---
  doc.setFillColor(navy.r, navy.g, navy.b);
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setFillColor(orange.r, orange.g, orange.b);
  doc.rect(0, 40, pageWidth, 3, "F");
  doc.addImage(logoBase64, "JPEG", margin, 6, 28, 28);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(white.r, white.g, white.b);
  doc.text("ZAPLY", margin + 34, 22);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 215, 230);
  doc.text("Quick Commerce · Franchise · Technology", margin + 34, 30);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  doc.setFontSize(10);
  doc.setTextColor(200, 215, 230);
  doc.text(`Date: ${dateStr}`, pageWidth - margin, 24, { align: "right" });

  let y = 56;

  // --- TITLE ---
  doc.setFillColor(255, 248, 240);
  doc.roundedRect(margin, y - 4, contentWidth, 16, 3, 3, "F");
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(navy.r, navy.g, navy.b);
  doc.text("OFFER OF EMPLOYMENT", pageWidth / 2, y + 7, { align: "center" });
  y += 22;

  // --- BODY HELPERS ---
  const addParagraph = (text: string) => {
    doc.setFontSize(10.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(gray.r, gray.g, gray.b);
    const lines = doc.splitTextToSize(text, contentWidth);
    if (y + lines.length * 5.5 > pageHeight - 30) { doc.addPage(); y = 30; }
    doc.text(lines, margin, y);
    y += lines.length * 5.5 + 4;
  };

  const addBoldLine = (text: string) => {
    doc.setFontSize(10.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(navy.r, navy.g, navy.b);
    if (y > pageHeight - 30) { doc.addPage(); y = 30; }
    doc.text(text, margin, y);
    y += 7;
  };

  const addKeyValue = (key: string, value: string) => {
    if (y > pageHeight - 30) { doc.addPage(); y = 30; }
    doc.setFontSize(10.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(navy.r, navy.g, navy.b);
    doc.text(key, margin + 4, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.text(value, margin + 65, y);
    y += 7;
  };

  const addBullet = (text: string) => {
    if (y > pageHeight - 30) { doc.addPage(); y = 30; }
    doc.setFillColor(orange.r, orange.g, orange.b);
    doc.circle(margin + 5, y - 1.5, 1.5, "F");
    doc.setFontSize(10.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(gray.r, gray.g, gray.b);
    const lines = doc.splitTextToSize(text, contentWidth - 14);
    doc.text(lines, margin + 11, y);
    y += lines.length * 5.5 + 3;
  };

  const addSectionBar = (title: string) => {
    if (y > pageHeight - 40) { doc.addPage(); y = 30; }
    doc.setFillColor(orange.r, orange.g, orange.b);
    doc.roundedRect(margin, y - 4, 4, 14, 2, 2, "F");
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(navy.r, navy.g, navy.b);
    doc.text(title, margin + 10, y + 5);
    y += 18;
  };

  // --- GREETING ---
  addParagraph(`Dear ${data.candidateName},`);
  addParagraph(
    "We are pleased to extend this offer of employment to you for the position of Digital Marketing Manager at Zaply. " +
    "We were impressed with your skills and experience, and we believe you will be a valuable addition to our team."
  );

  // --- POSITION DETAILS ---
  y += 2;
  addSectionBar("Position Details");

  addKeyValue("Designation:", "Digital Marketing Manager");
  addKeyValue("Department:", "Marketing & Business Development");
  addKeyValue("Reporting To:", "Founder / Head of Operations");
  addKeyValue("Date of Joining:", data.dateOfJoining);
  addKeyValue("Location:", "As assigned by the Company");
  addKeyValue("Probation Period:", "2 Months from the date of joining");

  // --- SALARY ---
  y += 6;
  addSectionBar("Compensation & Benefits");

  addKeyValue("Monthly Salary:", `₹${data.salary}/- (Rupees ${data.salary} Only)`);
  addParagraph(
    "Upon successful completion of the probation period, you will be eligible for the following additional benefits:"
  );
  addBullet("Group Insurance Coverage");
  addBullet("Performance-based Incentives");
  addBullet("Salary revision based on performance review");

  // --- JOB RESPONSIBILITIES ---
  y += 4;
  addSectionBar("Key Responsibilities");

  const responsibilities = [
    "Social Media Management — strategy, content creation, scheduling, and engagement across all platforms (Instagram, Facebook, LinkedIn, X, etc.)",
    "Marketplace Listing & Management — product listing, optimization, and day-to-day management on e-commerce and quick-commerce marketplaces",
    "Digital Platform Handling — managing and optimizing the company's digital platforms, websites, and applications",
    "AI Integration — leveraging AI tools for marketing automation, content generation, analytics, and campaign optimization",
    "WhatsApp Marketing & Follow-ups — designing and executing WhatsApp marketing campaigns, customer engagement, and timely follow-ups",
    "Lead Generation & Follow-ups — implementing lead generation strategies through digital channels and ensuring systematic follow-up processes",
    "Business Development — identifying new business opportunities, partnerships, and growth channels to expand Zaply's market presence",
    "Campaign Analytics & Reporting — tracking, analyzing, and reporting on all digital marketing KPIs and campaign performance",
    "Any other tasks assigned by the management from time to time",
  ];
  responsibilities.forEach((r) => addBullet(r));

  // --- TERMS ---
  y += 4;
  addSectionBar("General Terms");

  addBullet("This offer is subject to verification of your documents and background check.");
  addBullet("During the probation period, either party may terminate the employment with 15 days' written notice.");
  addBullet("Post probation, a notice period of 30 days will be applicable.");
  addBullet("You shall maintain strict confidentiality of all company information during and after employment.");
  addBullet("You shall adhere to all company policies, rules, and regulations as amended from time to time.");

  // --- ACCEPTANCE ---
  y += 6;
  if (y > pageHeight - 70) { doc.addPage(); y = 30; }
  addParagraph(
    "We are excited to welcome you to the Zaply team and look forward to a mutually rewarding association. " +
    "Please sign and return a copy of this letter as acceptance of this offer."
  );

  y += 6;
  addParagraph("Warm Regards,");
  y += 2;
  addBoldLine("For Zaply");
  y += 12;
  doc.setDrawColor(180, 180, 180);
  doc.line(margin, y, margin + 60, y);
  y += 5;
  addParagraph("Authorized Signatory");

  y += 14;
  if (y > pageHeight - 50) { doc.addPage(); y = 30; }
  addBoldLine("Acceptance by Candidate:");
  y += 8;
  addKeyValue("Name:", data.candidateName);
  addKeyValue("Signature:", "_______________________________");
  addKeyValue("Date:", "_______________________________");

  // --- FOOTER ---
  const addFooter = (pg: jsPDF) => {
    pg.setFillColor(navy.r, navy.g, navy.b);
    pg.rect(0, pageHeight - 12, pageWidth, 12, "F");
    pg.setFontSize(7.5);
    pg.setTextColor(200, 210, 220);
    pg.text("© 2026 Zaply  •  portal.zaply.app  •  Confidential", pageWidth / 2, pageHeight - 4, { align: "center" });
  };

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc);
  }

  doc.save(`Zaply-Offer-Letter-${data.candidateName.replace(/\s+/g, "-")}.pdf`);
}
