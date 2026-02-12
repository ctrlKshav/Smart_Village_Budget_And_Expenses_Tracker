import { Building2, UserCheck, Users, ClipboardCheck } from "lucide-react";

const audiences = [
  {
    icon: <Building2 className="h-7 w-7" />,
    title: "Gram Panchayats",
    description:
      "Digital-first budget management for village councils to track every rupee transparently.",
  },
  {
    icon: <UserCheck className="h-7 w-7" />,
    title: "Village Secretaries",
    description:
      "Streamline your daily financial workflows with automated logging and instant report generation.",
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "Local Administrations",
    description:
      "Oversee multiple village budgets with centralized dashboards and real-time financial visibility.",
  },
  {
    icon: <ClipboardCheck className="h-7 w-7" />,
    title: "Community Auditors",
    description:
      "Access complete audit trails, auto-generated reports, and transparent financial records anytime.",
  },
];

export function Audience() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Who Is This For?
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Built for Village Governance
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            GramBudget is designed for everyone involved in village-level
            financial management and oversight.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {audience.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground">
                {audience.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
