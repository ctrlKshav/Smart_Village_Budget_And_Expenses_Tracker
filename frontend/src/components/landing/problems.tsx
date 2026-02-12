import { AlertTriangle, Clock, EyeOff } from "lucide-react";

const problems = [
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Outdated Manual Budget Tracking",
    description:
      "Most village administrations still rely on paper-based registers and manual calculations, leading to errors, lost records, and inefficient budget management.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Delayed & Inefficient Grant Management",
    description:
      "Government grants and scheme funds often go underutilized due to slow tracking, missed deadlines, and a lack of proper allocation systems.",
  },
  {
    icon: <EyeOff className="h-6 w-6" />,
    title: "Lack of Financial Transparency",
    description:
      "Citizens have limited visibility into how their village funds are being spent, creating trust gaps between the community and local administration.",
  },
];

export function Problems() {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            The Challenge
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Financial Challenges at Local Government
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Village-level financial management faces critical problems that
            affect governance quality and community trust.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-destructive/60 transition-all group-hover:bg-destructive" />
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                {problem.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {problem.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
