"use client";

import { useState } from "react";
import {
  Building,
  GraduationCap,
  Droplets,
  Heart,
  Truck,
  Lightbulb,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const useCases = [
  {
    id: "infrastructure",
    icon: <Building className="h-6 w-6" />,
    title: "Infrastructure Development",
    subtitle: "Roads, Bridges & Buildings",
    description:
      "Track infrastructure project budgets from allocation to completion. Monitor contractor payments, material costs, and project timelines with milestone-based fund releases.",
    benefits: [
      "Milestone-based fund disbursement tracking",
      "Contractor payment management with invoice matching",
      "Material cost tracking and vendor comparison",
      "Project timeline and completion status dashboard",
      "Photo documentation of work progress",
    ],
    stat: "45%",
    statLabel: "of village budgets go to infrastructure",
  },
  {
    id: "education",
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Education & Schools",
    subtitle: "School Maintenance & Supplies",
    description:
      "Manage education budgets including teacher salaries, school maintenance, supply purchases, and mid-day meal schemes with category-level visibility.",
    benefits: [
      "Teacher salary disbursement tracking",
      "School supply and equipment procurement logs",
      "Mid-day meal scheme fund monitoring",
      "Infrastructure maintenance for schools",
      "Scholarship and student aid fund allocation",
    ],
    stat: "20%",
    statLabel: "of funds allocated to education",
  },
  {
    id: "water",
    icon: <Droplets className="h-6 w-6" />,
    title: "Water Supply & Sanitation",
    subtitle: "Clean Water & Waste Management",
    description:
      "Monitor Swachh Bharat and Jal Jeevan Mission grants. Track borewell installations, pipeline repairs, toilet construction, and waste disposal expenses.",
    benefits: [
      "Jal Jeevan Mission grant utilization tracking",
      "Borewell installation and maintenance costs",
      "Pipeline repair and expansion expenses",
      "Swachh Bharat toilet construction progress",
      "Waste management service payments",
    ],
    stat: "15%",
    statLabel: "dedicated to water and sanitation",
  },
  {
    id: "health",
    icon: <Heart className="h-6 w-6" />,
    title: "Healthcare Services",
    subtitle: "PHC & Community Health",
    description:
      "Track Primary Health Centre operations, medicine procurement, vaccination drives, and community health worker payments under National Health Mission.",
    benefits: [
      "Medicine and equipment procurement tracking",
      "ASHA and ANM worker payment management",
      "Vaccination and health camp expense logging",
      "PHC maintenance and operational costs",
      "Emergency medical fund allocation",
    ],
    stat: "10%",
    statLabel: "of budget for healthcare",
  },
  {
    id: "mgnrega",
    icon: <Truck className="h-6 w-6" />,
    title: "MGNREGA Works",
    subtitle: "Employment Guarantee Scheme",
    description:
      "Complete tracking of MGNREGA projects from work demand registration to wage disbursement. Monitor project costs, labor days, and material expenses.",
    benefits: [
      "Wage disbursement and attendance tracking",
      "Project-wise material cost management",
      "Labor day calculation and reporting",
      "Demand registration and work allocation",
      "Compliance reporting for district offices",
    ],
    stat: "30%",
    statLabel: "of grants from MGNREGA",
  },
  {
    id: "energy",
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Energy & Electrification",
    subtitle: "Solar & Street Lighting",
    description:
      "Track solar panel installations, streetlight maintenance, and energy subsidy utilization under Deen Dayal Upadhyaya Gram Jyoti Yojana.",
    benefits: [
      "Solar panel installation cost tracking",
      "Streetlight installation and maintenance logs",
      "Electricity bill payments for public facilities",
      "Energy subsidy utilization and reporting",
      "LED conversion project management",
    ],
    stat: "8%",
    statLabel: "invested in energy projects",
  },
];

export function UseCases() {
  const [active, setActive] = useState("infrastructure");
  const activeCase = useCases.find((uc) => uc.id === active) ?? useCases[0];

  return (
    <section id="use-cases" className="py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Real-World Applications
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Use Cases Across Every Department
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            See how GramBudget transforms financial management across every
            area of village governance and development.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4">
            <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              {useCases.map((uc) => (
                <button
                  key={uc.id}
                  type="button"
                  onClick={() => setActive(uc.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all lg:w-full ${
                    active === uc.id
                      ? "border border-primary/20 bg-primary/5 text-foreground shadow-sm"
                      : "border border-transparent text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      active === uc.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {uc.icon}
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm font-semibold">{uc.title}</p>
                    <p className="text-xs text-muted-foreground">{uc.subtitle}</p>
                  </div>
                  <ChevronRight
                    className={`ml-auto hidden h-4 w-4 lg:block ${
                      active === uc.id ? "text-primary" : "text-transparent"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content Panel */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-border bg-background p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {activeCase.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {activeCase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {activeCase.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {activeCase.description}
                  </p>
                </div>

                {/* Stat Badge */}
                <div className="shrink-0 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-4 text-center">
                  <p className="font-display text-3xl font-bold text-primary">
                    {activeCase.stat}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {activeCase.statLabel}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-8">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  What GramBudget Tracks
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {activeCase.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-2.5 rounded-lg bg-muted/50 p-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
