"use client";

import { useState } from "react";
import {
  Wallet,
  Receipt,
  FileBarChart,
  Database,
  Eye,
  Landmark,
  ShieldCheck,
  Bell,
  Users,
  Smartphone,
  Globe,
  Lock,
  PieChart,
  CalendarDays,
  FileDown,
  Layers,
  SearchCheck,
  History,
} from "lucide-react";

const categories = [
  { id: "all", label: "All Features" },
  { id: "budget", label: "Budget" },
  { id: "expense", label: "Expense" },
  { id: "reporting", label: "Reporting" },
  { id: "security", label: "Security" },
  { id: "access", label: "Access" },
];

const features = [
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Fund & Grant Entry",
    description:
      "Record budgets and incoming grants digitally with structured categories, source tracking, and timestamps for complete audit trails.",
    category: "budget",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Multi-Source Budget Allocation",
    description:
      "Allocate funds across departments like education, healthcare, infrastructure, and sanitation with per-category budget caps and utilization meters.",
    category: "budget",
  },
  {
    icon: <CalendarDays className="h-6 w-6" />,
    title: "Fiscal Year Planning",
    description:
      "Create and manage annual budget plans with quarterly milestones, carryover balances, and year-over-year comparison dashboards.",
    category: "budget",
  },
  {
    icon: <Landmark className="h-6 w-6" />,
    title: "Grant & Scheme Tracking",
    description:
      "Monitor government grants from schemes like MGNREGA, Swachh Bharat, PMAY with dedicated tracking for allocations, usage, and compliance deadlines.",
    category: "budget",
  },
  {
    icon: <Receipt className="h-6 w-6" />,
    title: "Expense Logging & Categorization",
    description:
      "Log every transaction with category, date, vendor, amount, and proof attachments. Auto-categorize recurring expenses with smart tagging.",
    category: "expense",
  },
  {
    icon: <SearchCheck className="h-6 w-6" />,
    title: "Receipt & Invoice Scanning",
    description:
      "Upload photos of receipts and invoices. The system extracts amount, vendor, and date automatically, reducing manual entry errors.",
    category: "expense",
  },
  {
    icon: <History className="h-6 w-6" />,
    title: "Transaction History & Search",
    description:
      "Full searchable history of all transactions with filters by date range, category, amount, vendor, and approval status.",
    category: "expense",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Overspend Alerts & Limits",
    description:
      "Set spending limits per category and receive instant alerts when expenses approach or exceed budgeted amounts to prevent overruns.",
    category: "expense",
  },
  {
    icon: <FileBarChart className="h-6 w-6" />,
    title: "Auto-Generated Reports",
    description:
      "One-click financial summaries with income vs expense breakdowns, fund utilization percentages, and variance analysis for any period.",
    category: "reporting",
  },
  {
    icon: <PieChart className="h-6 w-6" />,
    title: "Visual Analytics Dashboard",
    description:
      "Interactive bar charts, pie charts, and trend lines showing spending patterns, budget health, and grant utilization across all departments.",
    category: "reporting",
  },
  {
    icon: <FileDown className="h-6 w-6" />,
    title: "PDF & Excel Export",
    description:
      "Export reports in PDF and Excel formats for audits, gram sabha presentations, and submission to district administration offices.",
    category: "reporting",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Real-Time Financial Visibility",
    description:
      "Live dashboards display current balances, pending approvals, recent transactions, and fund flow status updated in real time.",
    category: "reporting",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Role-Based Access Control",
    description:
      "Assign roles like Sarpanch, Secretary, Accountant, and Auditor with granular permissions controlling who can view, edit, or approve transactions.",
    category: "security",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Tamper-Proof Audit Trail",
    description:
      "Every action is logged with user identity, timestamp, and change details. Records cannot be altered or deleted, ensuring complete accountability.",
    category: "security",
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Secure Cloud Storage",
    description:
      "All financial data is encrypted and stored on secure cloud servers with automatic daily backups and 99.9% uptime guarantee.",
    category: "security",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile-First Design",
    description:
      "Fully responsive interface optimized for smartphones. Log expenses, approve transactions, and check budgets on the go from any device.",
    category: "access",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Multi-Language Support",
    description:
      "Interface available in Hindi, Gujarati, Marathi, Tamil, and other regional languages to ensure accessibility for all village administrators.",
    category: "access",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Public Transparency Portal",
    description:
      "Citizen-facing read-only portal showing fund allocations and expenditures, promoting community oversight and trust in local governance.",
    category: "access",
  },
];

export function Features() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? features
      : features.filter((f) => f.category === active);

  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Comprehensive Platform
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Everything Your Village Needs
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            18 powerful features covering budgets, expenses, reporting, security,
            and accessibility -- purpose-built for Gram Panchayat finance.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                active === cat.id
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {feature.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
