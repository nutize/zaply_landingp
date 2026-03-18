export interface PositionConfig {
  designation: string;
  department: string;
  reportingTo: string;
  responsibilities: string[];
}

export const POSITIONS: Record<string, PositionConfig> = {
  "digital-marketing-manager": {
    designation: "Digital Marketing cum Brand Promotion Manager",
    department: "Marketing & Business Development",
    reportingTo: "Founder / Head of Operations",
    responsibilities: [
      "Social Media Management — strategy, content creation, scheduling, and engagement across all platforms (Instagram, Facebook, LinkedIn, X, etc.)",
      "Marketplace Listing & Management — product listing, optimization, and day-to-day management on e-commerce and quick-commerce marketplaces",
      "Digital Platform Handling — managing and optimizing the company's digital platforms, websites, and applications",
      "AI Integration — leveraging AI tools for marketing automation, content generation, analytics, and campaign optimization",
      "WhatsApp Marketing & Follow-ups — designing and executing WhatsApp marketing campaigns, customer engagement, and timely follow-ups",
      "Lead Generation & Follow-ups — implementing lead generation strategies through digital channels and ensuring systematic follow-up processes",
      "Business Development — identifying new business opportunities, partnerships, and growth channels to expand Zaply's market presence",
      "Campaign Analytics & Reporting — tracking, analyzing, and reporting on all digital marketing KPIs and campaign performance",
      "Any other tasks assigned by the management from time to time",
    ],
  },
  "sales-coordinator": {
    designation: "Sales Coordinator",
    department: "Sales & Business Development",
    reportingTo: "Sales Manager / Head of Operations",
    responsibilities: [
      "Sales Support — assisting the sales team with day-to-day coordination, order processing, and client communication",
      "Client Relationship Management — maintaining strong relationships with existing clients and ensuring timely follow-ups",
      "Order Management — processing sales orders, tracking deliveries, and coordinating with logistics and warehouse teams",
      "MIS & Reporting — preparing daily, weekly, and monthly sales reports, dashboards, and performance trackers",
      "Lead Management — maintaining and updating the lead database, assigning leads to the sales team, and tracking conversion status",
      "Invoice & Payment Coordination — coordinating with finance for invoice generation, payment follow-ups, and reconciliation",
      "Market Research — gathering market intelligence, competitor analysis, and customer feedback to support sales strategy",
      "Cross-functional Coordination — liaising with marketing, operations, and supply chain teams to ensure smooth sales operations",
      "Any other tasks assigned by the management from time to time",
    ],
  },
  "receptionist": {
    designation: "Receptionist",
    department: "Administration & Front Office",
    reportingTo: "Office Manager / Head of Operations",
    responsibilities: [
      "Front Desk Management — greeting and welcoming visitors, clients, and guests in a professional and courteous manner",
      "Call Management — handling incoming and outgoing calls, transferring calls to the appropriate departments, and taking messages",
      "Visitor Coordination — maintaining a visitor log, issuing visitor passes, and coordinating with internal teams for appointments",
      "Correspondence Handling — managing incoming and outgoing mail, courier services, and email correspondence",
      "Office Coordination — assisting with office supplies, housekeeping coordination, and maintaining a clean and organized reception area",
      "Appointment Scheduling — managing calendars, scheduling meetings, and coordinating conference room bookings",
      "Data Entry & Record Keeping — maintaining accurate records, databases, and filing systems as required",
      "Support to Management — providing administrative support to management and other departments as needed",
      "Any other tasks assigned by the management from time to time",
    ],
  },
};

export const POSITION_OPTIONS = Object.entries(POSITIONS).map(([key, config]) => ({
  value: key,
  label: config.designation,
}));
