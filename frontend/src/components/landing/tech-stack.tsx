import {
  Code2,
  Server,
  Database,
  Palette,
  Shield,
  Smartphone,
} from "lucide-react";

const stack = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "React.js Frontend",
    description:
      "Modern, component-based UI built with React for fast rendering, seamless navigation, and interactive dashboards that work across all devices.",
    tags: ["React 19", "Responsive", "SPA"],
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Tailwind CSS Styling",
    description:
      "Utility-first CSS framework delivering a clean, professional design system with consistent spacing, typography, and theming across the application.",
    tags: ["Tailwind CSS", "Dark Mode", "Accessible"],
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: "Python Backend",
    description:
      "Robust Python backend handling API requests, business logic, data validation, and server-side processing with Flask/FastAPI for high performance.",
    tags: ["Python", "FastAPI", "REST API"],
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Secure Database",
    description:
      "Structured relational database storing all financial records, user data, and audit logs with encryption at rest and automated backups.",
    tags: ["PostgreSQL", "Encrypted", "Backups"],
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Security Layer",
    description:
      "End-to-end encryption, JWT authentication, role-based access control, and OWASP-compliant security practices protecting all financial data.",
    tags: ["JWT Auth", "RBAC", "HTTPS"],
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Responsive",
    description:
      "Fully optimized for smartphones and tablets. Progressive Web App capabilities allow offline access and native-like experience on any device.",
    tags: ["PWA", "Offline", "Cross-Platform"],
  },
];

export function TechStack() {
  return (
    <section id="tech" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Technology
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Built With Modern Tech Stack
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            React.js frontend paired with a Python backend and enterprise-grade
            security for a reliable and scalable platform.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {item.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
