import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Audience } from "@/components/landing/audience";
import { Problems } from "@/components/landing/problems";
import { Features } from "@/components/landing/features";
import { BudgetOverview } from "@/components/landing/budget-overview";
import { ExpenseTracker } from "@/components/landing/expense-tracker";
import { Stats } from "@/components/landing/stats";
import { UseCases } from "@/components/landing/use-cases";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TechStack } from "@/components/landing/tech-stack";
import { Team } from "@/components/landing/team";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Audience />
      <Problems />
      <Features />
      <BudgetOverview />
      <ExpenseTracker />
      <Stats />
      <UseCases />
      <HowItWorks />
      <TechStack />
      <Team />
      <CTA />
      <Footer />
    </main>
  );
}
