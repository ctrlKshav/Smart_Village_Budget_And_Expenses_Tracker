import React from "react"
import { ArrowRight, BarChart3, Shield, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-accent/8 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Built for Indian Village Governance
            </span>
          </div>

          <h1 className="font-display max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-7xl text-balance">
            Smart Village Budget{" "}
            <span className="text-primary">{"&"} Expense</span>{" "}
            Management
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
            Improving transparency and accountability in village finances.
            Digitize budgets, track expenses, and generate insightful reports
            for your Gram Panchayat.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2 text-base px-8 rounded-full">
              <a href="#budgets">
                Start Tracking
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="gap-2 text-base px-8 bg-transparent rounded-full"
            >
              <a href="#features">Explore Features</a>
            </Button>
          </div>

          <div className="mt-14 w-full max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-accent/60" />
                <div className="h-3 w-3 rounded-full bg-primary/60" />
                <span className="ml-2 text-xs text-muted-foreground">
                  grambudget.com/dashboard
                </span>
              </div>
              <img
                src="/hero-dashboard.jpg"
                alt="GramBudget Dashboard showing village financial management interface with charts and expense tracking"
                width={1200}
                height={675}
                className="w-full"
                
              />
            </div>
          </div>

          <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
            <StatCard
              icon={<IndianRupee className="h-5 w-5 text-primary" />}
              value="74%"
              label="Faster Fund Tracking"
            />
            <StatCard
              icon={<BarChart3 className="h-5 w-5 text-primary" />}
              value="Real-Time"
              label="Financial Visibility"
            />
            <StatCard
              icon={<Shield className="h-5 w-5 text-primary" />}
              value="100%"
              label="Transparent Records"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <span className="font-display text-2xl font-bold text-foreground">
        {value}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
