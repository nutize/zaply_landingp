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
  "telecaller": {
    designation: "Telecaller",
    department: "Sales & Customer Support",
    reportingTo: "Team Lead / Sales Manager",
    responsibilities: [
      "Outbound Calling — making calls to prospective customers to generate leads, promote products/services, and drive sales",
      "Inbound Call Handling — attending incoming calls, resolving customer queries, and providing product/service information",
      "Lead Follow-up — following up on enquiries, leads from marketing campaigns, and converting them into sales opportunities",
      "Customer Database Management — updating and maintaining customer records, call logs, and interaction history in the CRM",
      "Product Knowledge — maintaining thorough knowledge of all company products, services, brands, and ongoing offers",
      "Feedback Collection — gathering customer feedback, complaints, and suggestions and escalating them to the relevant teams",
      "Target Achievement — meeting daily, weekly, and monthly call targets and sales conversion goals",
      "Reporting — preparing daily call reports, lead status updates, and sharing them with the team lead",
      "Any other tasks assigned by the management from time to time",
    ],
  },
};

export const POSITION_OPTIONS = Object.entries(POSITIONS).map(([key, config]) => ({
  value: key,
  label: config.designation,
}));
