import { UserPlus, PenLine, BarChart3, Download } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="h-6 w-6" />,
    step: "01",
    title: "Register Your Panchayat",
    description:
      "Sign up with your village details and get your dedicated financial management dashboard instantly.",
  },
  {
    icon: <PenLine className="h-6 w-6" />,
    step: "02",
    title: "Log Funds & Expenses",
    description:
      "Enter incoming grants, budgets, and every expense with category, date, and supporting documents.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    step: "03",
    title: "Monitor & Analyze",
    description:
      "View real-time dashboards, track fund utilization, and get insights on spending patterns across departments.",
  },
  {
    icon: <Download className="h-6 w-6" />,
    step: "04",
    title: "Generate Reports",
    description:
      "Export auto-generated financial summaries and reports for audits, reviews, and public transparency.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Simple Process
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            How GramBudget Works
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Get started in minutes. Our streamlined process makes digital
            village finance management effortless.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute top-16 left-0 hidden h-0.5 w-full bg-border lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-md">
                  {step.icon}
                </div>
                <span className="mb-2 font-display text-sm font-bold text-primary">
                  Step {step.step}
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
