/**
 * Certifications. Rendered as styled text badges — no vendor logos are used,
 * to avoid unlicensed trademark usage.
 */

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  status: "Earned" | "In progress";
};

export const certifications: Certification[] = [
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    date: "Mar 2026",
    status: "Earned",
  },
  {
    name: "AWS Certified Solutions Architect – Associate (SAA-C03)",
    issuer: "Amazon Web Services",
    date: "Exam scheduled Sep 2026",
    status: "In progress",
  },
  {
    name: "SnowPro Core Certification",
    issuer: "Snowflake",
    date: "Jul 2025",
    status: "Earned",
  },
  {
    name: "Databricks Certified Machine Learning Associate",
    issuer: "Databricks",
    date: "Feb 2025",
    status: "Earned",
  },
];
