export interface CompanyColors {
  primary: { r: number; g: number; b: number };
  accent: { r: number; g: number; b: number };
}

export interface CompanyConfig {
  key: string;
  name: string;
  tagline: string;
  address: string;
  email: string;
  signatory: string;
  signatoryTitle: string;
  colors: CompanyColors;
  footerText: string;
}

export const COMPANIES: Record<string, CompanyConfig> = {
  "zaply": {
    key: "zaply",
    name: "Zaply.Apps Webtech LLP",
    tagline: "Brands: Zaply · Nutize · SastaDukan · eDigicom",
    address: "14, Dhakuria Kalibari Lane, Ground Floor, Kolkata - 700 031, WB",
    email: "hr@nutize.co.in",
    signatory: "K R Ghosh",
    signatoryTitle: "Authorized Signatory",
    colors: {
      primary: { r: 35, g: 55, b: 80 },
      accent: { r: 230, g: 140, b: 20 },
    },
    footerText: "© 2026 Zaply.Apps Webtech LLP  •  hr@nutize.co.in  •  Confidential",
  },
  "nutize-foods": {
    key: "nutize-foods",
    name: "Nutize Foods & Dairy",
    tagline: "Quality Food Products & Dairy Solutions",
    address: "14, Dhakuria Kalibari Lane, Ground Floor, Kolkata - 700 031, WB",
    email: "hr@nutize.co.in",
    signatory: "K R Ghosh",
    signatoryTitle: "Authorized Signatory",
    colors: {
      primary: { r: 27, g: 94, b: 50 },
      accent: { r: 234, g: 170, b: 30 },
    },
    footerText: "© 2026 Nutize Foods & Dairy  •  hr@nutize.co.in  •  Confidential",
  },
  "nutize-packaging": {
    key: "nutize-packaging",
    name: "Nutize Packaging Udyog",
    tagline: "Packaging Solutions for Modern Businesses",
    address: "14, Dhakuria Kalibari Lane, Ground Floor, Kolkata - 700 031, WB",
    email: "hr@nutize.co.in",
    signatory: "K R Ghosh",
    signatoryTitle: "Authorized Signatory",
    colors: {
      primary: { r: 20, g: 70, b: 100 },
      accent: { r: 0, g: 170, b: 160 },
    },
    footerText: "© 2026 Nutize Packaging Udyog  •  hr@nutize.co.in  •  Confidential",
  },
  "sasta-dukan": {
    key: "sasta-dukan",
    name: "Sasta Dukan Pvt. Ltd.",
    tagline: "Affordable Shopping for Everyone",
    address: "14, Dhakuria Kalibari Lane, Ground Floor, Kolkata - 700 031, WB",
    email: "hr@nutize.co.in",
    signatory: "K R Ghosh",
    signatoryTitle: "Authorized Signatory",
    colors: {
      primary: { r: 120, g: 20, b: 30 },
      accent: { r: 220, g: 60, b: 50 },
    },
    footerText: "© 2026 Sasta Dukan Pvt. Ltd.  •  hr@nutize.co.in  •  Confidential",
  },
};

export const COMPANY_OPTIONS = Object.values(COMPANIES).map((c) => ({
  value: c.key,
  label: c.name,
}));
