/**
 * Professional history. Content is drawn from Michael Miller Jr.'s resume and is
 * intentionally focused on scope and impact rather than exhaustive task lists.
 */

export type Role = {
  company: string;
  title: string;
  /** Group or practice within the company, shown next to the company name. */
  organization?: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  focus: string;
};

export const careerSummary =
  "Ten-plus years spanning data analytics, machine learning, and enterprise AI. I started by building and deploying production ML systems, then led a data science team, then worked customer-facing at Snowflake designing generative and agentic AI solutions. Today I work on generative and agentic AI in Accenture's Center for Advanced AI. The through-line has stayed the same: translate a business problem into an architecture teams can actually adopt, and be honest about what it takes to run it safely once it leaves the demo.";

export const roles: Role[] = [
  {
    // Current role. Keep this to the role description: no client names,
    // internal initiatives, or outcomes until they are real and public.
    company: "Accenture",
    title: "Manager, Advanced AI Solutions",
    organization: "Center for Advanced AI",
    location: "Remote (Cincinnati, OH)",
    start: "Nov 2026",
    end: "Present",
    focus: "Generative AI · Agentic AI · Enterprise solution architecture",
    summary:
      "Focused on helping enterprises design, build, and adopt Generative AI and Agentic AI solutions, combining enterprise solution architecture, hands-on engineering, and technical leadership to connect advanced AI capabilities with practical business outcomes.",
    highlights: [],
    technologies: [],
  },
  {
    company: "Snowflake",
    title: "Senior Solutions Engineer",
    location: "Remote — Cincinnati, OH",
    start: "Apr 2025",
    end: "Dec 2025",
    focus: "Technical presales · Generative & agentic AI",
    summary:
      "Customer-facing technical lead for enterprise accounts. I owned the solution strategy across sales cycles, designed generative and agentic AI use cases, and ran the enablement that turned them into adopted, growing workloads.",
    highlights: [
      "Owned the technical strategy across enterprise sales cycles with Account Executives, identifying new workloads and guiding validated solution designs from discovery through adoption. Helped drive 20%+ YOY consumption growth across every account in the portfolio.",
      "Led end-to-end solution design for high-priority generative AI use cases, including RAG, intelligent document processing and extraction, and AI agents, covering ingestion, retrieval, orchestration, application integration, security, scalability, and cost.",
      "Advised enterprise customers on data and AI strategy, mapping business priorities, technical constraints, and security requirements to reference architectures and sequenced adoption roadmaps.",
      "Led enterprise proofs of concept and delivered 25+ customer-specific demos, hands-on labs, and enablement sessions using customer data across Cortex AI, Document AI, and Snowflake ML.",
      "Contributed to $5M in renewal ACV through technical risk assessments, architecture reviews, and executive presentations that connected platform capabilities to business value.",
      "Architected agentic systems using Cortex Agents, tool calling, and multi-step LLM orchestration, with semantic models for NL-to-SQL and Snowflake-managed MCP servers that securely connected enterprise data and tools to external AI agents.",
    ],
    technologies: [
      "Snowflake",
      "Cortex AI",
      "Cortex Agents",
      "RAG",
      "MCP",
      "Snowflake ML",
      "Python",
    ],
  },
  {
    company: "The E.W. Scripps Company",
    title: "Senior Manager, Data Science",
    location: "Cincinnati, OH",
    start: "Feb 2024",
    end: "Mar 2025",
    focus: "Team leadership · AI strategy · MLOps",
    summary:
      "Led a data science team and advised senior leadership on AI strategy, governance, and where machine learning could move the business.",
    highlights: [
      "Managed a team of 4 data scientists and analysts delivering AI/ML models that generated $20M+ in revenue across sales, operations, and customer engagement.",
      "Advised senior leadership on AI strategy and established best practices for model monitoring, governance, and MLOps.",
      "Led enterprise-wide AI initiatives spanning data governance, third-party technology evaluations, and data monetization strategy.",
    ],
    technologies: ["Azure Databricks", "Snowflake", "MLflow", "Python", "MLOps"],
  },
  {
    company: "The E.W. Scripps Company",
    title: "Senior Data Scientist",
    location: "Cincinnati, OH",
    start: "Jun 2021",
    end: "Feb 2024",
    focus: "Production ML · Forecasting · Real-time scoring",
    summary:
      "Built and deployed the forecasting and optimization models behind audience and advertising decisions, and modernized how models reached production.",
    highlights: [
      "Built audience forecasting and programmatic ad-optimization systems that increased prediction accuracy by 400% and drove $15M in incremental revenue.",
      "Led the transition from batch inference to real-time scoring, improving model efficiency by 60% and giving business teams faster access to outputs.",
      "Designed ML pipelines in Azure Databricks, Snowflake, and MLflow that standardized deployment and established a repeatable MLOps foundation.",
    ],
    technologies: [
      "Azure Databricks",
      "Snowflake",
      "MLflow",
      "Python",
      "XGBoost",
      "scikit-learn",
    ],
  },
  {
    company: "First Financial Bank",
    title: "Analytics Manager",
    location: "Cincinnati, OH",
    start: "Oct 2020",
    end: "Jun 2021",
    focus: "Analytics leadership · Decision frameworks",
    summary:
      "Defined the metrics and analyses that digital product and marketing teams used to make decisions.",
    highlights: [
      "Defined KPIs for digital products and built data-driven decision frameworks adopted across multiple business lines.",
      "Built customer segmentation analyses that improved marketing targeting and conversion across key segments.",
      "Partnered cross-functionally to embed data insights into day-to-day business operations.",
    ],
    technologies: ["SQL", "Python", "Tableau"],
  },
  {
    company: "Worldpay",
    title: "Senior Data Analyst",
    location: "Cincinnati, OH",
    start: "Sep 2018",
    end: "Oct 2020",
    focus: "Fraud analytics · BI for enterprise clients",
    summary:
      "Used analytics and BI to trace fraud and deliver decision tools to some of the largest retailers in the country.",
    highlights: [
      "Used Random Forest feature importance and Tableau to pinpoint the origin of fraudulent activity across enterprise portfolios, informing a mitigation strategy that cut fraud losses by $2M per month.",
      "Built interactive BI applications for Fortune 500 retailers including Walmart, Kroger, and Nordstrom using R and Shiny.",
    ],
    technologies: ["R", "Shiny", "Tableau", "SQL"],
  },
];

export type Education = {
  school: string;
  degrees: string[];
};

export const education: Education[] = [
  {
    school: "University of Toledo",
    degrees: ["M.A., Economics — 2016", "B.A., Economics — 2015"],
  },
];
