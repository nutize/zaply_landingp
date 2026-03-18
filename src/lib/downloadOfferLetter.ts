import { jsPDF } from "jspdf";

import { POSITIONS } from "./positionConfig";
import { COMPANIES, type CompanyConfig } from "./companyConfig";

export interface OfferLetterData {
  candidateName: string;
  candidateAddress: string;
  candidateEmail: string;
  letterDate: string;
  dateOfJoining: string;
  salary: string;
  position: string;
  company: string;
  probationPeriod: string;
  salaryIncrement: string;
}

export function generateOfferLetterPDF(data: OfferLetterData): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  const footerHeight = 16;
  const bottomLimit = pageHeight - footerHeight - 20;

  const comp: CompanyConfig = COMPANIES[data.company] || COMPANIES["zaply"];
  const navy = comp.colors.primary;
  const orange = comp.colors.accent;
  const gray = { r: 80, g: 90, b: 100 };
  const white = { r: 255, g: 255, b: 255 };

  let y = 0;

  // --- HEADER ---
  const drawHeader = (showDate: boolean) => {
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
    if (showDate) {
      doc.setFontSize(10);
      doc.setTextColor(200, 215, 230);
      doc.text(`Date: ${data.letterDate}`, pageWidth - margin, 16, { align: "right" });
    }
  };

  // --- FOOTER ---
  const drawFooter = () => {
    doc.setFillColor(navy.r, navy.g, navy.b);
    doc.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, "F");
    doc.setFontSize(7.5);
    doc.setTextColor(200, 210, 220);
    doc.text(comp.footerText, pageWidth / 2, pageHeight - 5, { align: "center" });
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > bottomLimit) {
      doc.addPage();
      drawHeader(false);
      y = 56;
    }
  };

  // --- BODY HELPERS ---
  const addParagraph = (text: string) => {
    doc.setFontSize(10.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(gray.r, gray.g, gray.b);
    const lines: string[] = doc.splitTextToSize(text, contentWidth);
    const lineHeight = 5.5;
    for (let i = 0; i < lines.length; i++) {
      ensureSpace(lineHeight + 2);
      doc.text(lines[i], margin, y);
      y += lineHeight;
    }
    y += 4;
  };

  const addBoldLine = (text: string) => {
    doc.setFontSize(10.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(navy.r, navy.g, navy.b);
    ensureSpace(7);
    doc.text(text, margin, y);
    y += 7;
  };

  const addKeyValue = (key: string, value: string) => {
    doc.setFontSize(10.5);
    const keyWidth = 58;
    const valueWidth = contentWidth - keyWidth - 8;
    doc.setFont("helvetica", "normal");
    const valueLines: string[] = doc.splitTextToSize(value, valueWidth);
    const lineHeight = 5.5;
    // Print line by line, keeping key on first line
    for (let i = 0; i < valueLines.length; i++) {
      ensureSpace(lineHeight + 2);
      if (i === 0) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(navy.r, navy.g, navy.b);
        doc.text(key, margin + 4, y);
      }
      doc.setFont("helvetica", "normal");
      doc.setTextColor(gray.r, gray.g, gray.b);
      doc.text(valueLines[i], margin + 4 + keyWidth, y);
      y += lineHeight;
    }
    y += 2;
  };

  const addBullet = (text: string) => {
    doc.setFontSize(10.5);
    doc.setFont("helvetica", "normal");
    const lines: string[] = doc.splitTextToSize(text, contentWidth - 14);
    const lineHeight = 5.5;
    for (let i = 0; i < lines.length; i++) {
      ensureSpace(lineHeight + 2);
      if (i === 0) {
        doc.setFillColor(orange.r, orange.g, orange.b);
        doc.circle(margin + 5, y - 1.5, 1.5, "F");
      }
      doc.setTextColor(gray.r, gray.g, gray.b);
      doc.text(lines[i], margin + 11, y);
      y += lineHeight;
    }
    y += 3;
  };

  const addSectionBar = (title: string) => {
    ensureSpace(22);
    doc.setFillColor(orange.r, orange.g, orange.b);
    doc.roundedRect(margin, y - 4, 4, 14, 2, 2, "F");
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(navy.r, navy.g, navy.b);
    doc.text(title, margin + 10, y + 5);
    y += 18;
  };

  // ===== PAGE 1 HEADER =====
  drawHeader(true);
  y = 60;

  // --- TITLE ---
  doc.setFillColor(255, 248, 240);
  doc.roundedRect(margin, y - 4, contentWidth, 16, 3, 3, "F");
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(navy.r, navy.g, navy.b);
  doc.text("OFFER OF EMPLOYMENT", pageWidth / 2, y + 7, { align: "center" });
  y += 22;

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
  const probationLabel = Number(data.probationPeriod) === 1 ? "1 Month" : `${data.probationPeriod} Months`;
  addKeyValue("Probation Period:", `${probationLabel} from the date of joining`);

  // --- SALARY ---
  y += 6;
  addSectionBar("Compensation & Benefits");
  addKeyValue("Monthly Salary:", `₹${data.salary}/- (Rupees ${data.salary} Only)`);
  addKeyValue("Increment on Probation:", `₹${data.salaryIncrement}/- per month upon successful completion of probation`);
  addParagraph(
    `Upon successful completion of the ${probationLabel} probation period, your monthly salary will be revised to ₹${data.salary} + ₹${data.salaryIncrement}. Additionally, you will be eligible for the following benefits:`
  );
  addBullet("Group Insurance Coverage");
  addBullet("Performance-based Incentives");
  addBullet("Salary revision based on performance review");

  // --- JOB RESPONSIBILITIES ---
  y += 4;
  addSectionBar("Key Responsibilities");
  posConfig.responsibilities.forEach((resp) => {
    addBullet(resp);
  });

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
  ensureSpace(60);
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
  ensureSpace(10);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(gray.r, gray.g, gray.b);
  doc.text("This is an Electronic document and doesn't require a Signature.", margin, y);
  y += 10;

  // --- ADD FOOTERS TO ALL PAGES ---
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawFooter();
  }

  return doc;
}

export function getOfferLetterFileName(data: OfferLetterData): string {
  const comp: CompanyConfig = COMPANIES[data.company] || COMPANIES["zaply"];
  return `${comp.name.replace(/[\s.]+/g, "-")}-Offer-Letter-${data.candidateName.replace(/\s+/g, "-")}.pdf`;
}

export async function downloadOfferLetter(data: OfferLetterData) {
  const doc = generateOfferLetterPDF(data);
  doc.save(getOfferLetterFileName(data));
}
