
import { Mail, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/grambudget-logo.jpg"
                alt="GramBudget Logo"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-display text-xl font-bold text-foreground">
                GramBudget
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Improving transparency and accountability in village finances.
              Built for Indian village governance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-foreground">
              Quick Links
            </h4>
            <ul className="mt-4 flex flex-col gap-2">
              {[
                { label: "Features", href: "#features" },
                { label: "Budget Management", href: "#budgets" },
                { label: "Expense Tracking", href: "#expenses" },
                { label: "Use Cases", href: "#use-cases" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Technology", href: "#tech" },
                { label: "Team", href: "#team" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-foreground">
              Contact Us
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="mailto:grambudget@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  grambudget@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.grambudget.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Globe className="h-4 w-4" />
                  www.grambudget.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {"© 2026 GramBudget. Built with care by LJ University students."}
          </p>
          <p className="text-sm text-muted-foreground">
            Designed for Gram Panchayats across India
          </p>
        </div>
      </div>
    </footer>
  );
}
