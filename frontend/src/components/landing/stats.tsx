import {
  IndianRupee,
  Building2,
  FileCheck,
  Clock,
  Users,
  Percent,
} from "lucide-react";

const stats = [
  {
    icon: <Building2 className="h-6 w-6" />,
    value: "2,50,000+",
    label: "Gram Panchayats in India",
    note: "Target Market",
  },
  {
    icon: <IndianRupee className="h-6 w-6" />,
    value: "2.3 Lakh Cr",
    label: "Annual Rural Budget",
    note: "Government Allocation",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    value: "74%",
    label: "Time Saved on Reports",
    note: "vs Manual Process",
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    value: "100%",
    label: "Audit Trail Coverage",
    note: "Every Transaction Tracked",
  },
  {
    icon: <Users className="h-6 w-6" />,
    value: "6.4 Lakh",
    label: "Elected Village Representatives",
    note: "Potential Users",
  },
  {
    icon: <Percent className="h-6 w-6" />,
    value: "0%",
    label: "Data Loss Risk",
    note: "Cloud-Backed Storage",
  },
];

export function Stats() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Impact at Scale
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            The Numbers Speak
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center transition-all hover:shadow-md"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {stat.icon}
              </div>
              <span className="font-display text-xl font-bold text-foreground lg:text-2xl">
                {stat.value}
              </span>
              <span className="mt-1 text-xs font-medium text-foreground">
                {stat.label}
              </span>
              <span className="mt-0.5 text-xs text-muted-foreground">
                {stat.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
