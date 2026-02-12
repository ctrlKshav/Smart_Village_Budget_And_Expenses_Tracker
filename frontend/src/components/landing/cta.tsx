import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-center lg:p-20">
          {/* Decorative circles */}
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary-foreground/5" />
          <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-primary-foreground/5" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
              Ready to Digitize Your Village Finances?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
              Join GramBudget today and bring transparency, efficiency, and
              smart governance to your Gram Panchayat.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="gap-2 text-base px-8"
              >
                <a href="https://www.grambudget.com" target="_blank" rel="noopener noreferrer">
                  Visit grambudget.com
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="gap-2 border-primary-foreground/30 text-base text-primary-foreground px-8 hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
              >
                <a href="mailto:grambudget@gmail.com">Email Us</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
