import { jsPDF } from "jspdf";

import { POSITIONS } from "./positionConfig";
import { COMPANIES, type CompanyConfig } from "./companyConfig";

export interface OfferLetterData {
  candidateName: string;
  candidateAddress: string;
  candidateEmail: string;
  dateOfJoining: string;
  salary: string;
  position: string;
  company: string;
}

export async function downloadOfferLetter(data: OfferLetterData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  const comp: CompanyConfig = COMPANIES[data.company] || COMPANIES["zaply"];
  const navy = comp.colors.primary;
  const orange = comp.colors.accent;
  const gray = { r: 80, g: 90, b: 100 };
  const white = { r: 255, g: 255, b: 255 };

  // --- HEADER BAR ---
  doc.setFillColor(navy.r, navy.g, navy.b);
  doc.rect(0, 0, pageWidth, 44, "F");
  doc.setFillColor(orange.r, orange.g, orange.b);
  doc.rect(0, 44, pageWidth, 3, "F");
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(white.r, white.g, white.b);
  doc.text(comp.name, margin, 16);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 215, 230);
  doc.text(comp.tagline, margin, 24);
  doc.text(comp.address, margin, 30);
  doc.text(`Email: ${comp.email}`, margin, 36);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  doc.setFontSize(10);
  doc.setTextColor(200, 215, 230);
  doc.text(`Date: ${dateStr}`, pageWidth - margin, 16, { align: "right" });

  let y = 60;

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

  // --- CANDIDATE ADDRESS ---
  addBoldLine(`To,`);
  addBoldLine(data.candidateName);
  addParagraph(data.candidateAddress);
  addParagraph(`Email: ${data.candidateEmail}`);
  y += 2;
  const posConfig = POSITIONS[data.position] || POSITIONS["digital-marketing-manager"];

  // --- GREETING ---
  addParagraph(`Dear ${data.candidateName},`);
  addParagraph(
    `We are pleased to extend this offer of employment to you for the position of ${posConfig.designation} at ${comp.name}. ` +
    "We were impressed with your skills and experience, and we believe you will be a valuable addition to our team."
  );

  // --- POSITION DETAILS ---
  y += 2;
  addSectionBar("Position Details");

  addKeyValue("Designation:", posConfig.designation);
  addKeyValue("Department:", posConfig.department);
  addKeyValue("Reporting To:", posConfig.reportingTo);
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

  // --- WORKING HOURS ---
  y += 4;
  addSectionBar("Working Hours & Schedule");

  addBullet("Reporting Time: All office employees (Head Office including Branches), other than Field Staff, must report before 10:30 AM.");
  addBullet("Working Hours: 10:30 AM to 7:30 PM.");
  addBullet("Lunch Break: 30 minutes.");
  addBullet("Working Days: 6 days a week.");
  addBullet("Delayed Reporting Policy: Every 3 instances of delayed reporting will be counted as 1 day absent.");


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
    `We are excited to welcome you to the ${comp.name} family and look forward to a mutually rewarding association. ` +
    "Please sign and return a copy of this letter as acceptance of this offer."
  );

  y += 6;
  addParagraph("Warm Regards,");
  y += 2;
  addBoldLine(`For ${comp.name}`);
  y += 4;
  addBoldLine(comp.signatory);
  addParagraph(comp.signatoryTitle);
  y += 4;
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(gray.r, gray.g, gray.b);
  if (y > pageHeight - 30) { doc.addPage(); y = 30; }
  doc.text("This is an Electronic document and doesn't require a Signature.", margin, y);
  y += 10;

  // --- FOOTER ---
  const addFooter = (pg: jsPDF) => {
    pg.setFillColor(navy.r, navy.g, navy.b);
    pg.rect(0, pageHeight - 12, pageWidth, 12, "F");
    pg.setFontSize(7.5);
    pg.setTextColor(200, 210, 220);
    pg.text(comp.footerText, pageWidth / 2, pageHeight - 4, { align: "center" });
  };

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc);
  }

  doc.save(`${comp.name.replace(/[\s.]+/g, "-")}-Offer-Letter-${data.candidateName.replace(/\s+/g, "-")}.pdf`);
}
