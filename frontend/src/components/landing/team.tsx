const teamMembers = [
  {
    name: "Anshul Mankad",
    initials: "AM",
  },
  {
    name: "Keshav Mittal",
    initials: "KM",
  },
  {
    name: "Krina Limbachiya",
    initials: "KL",
  },
  {
    name: "Krisha Vaghela",
    initials: "KV",
  },
  {
    name: "Vedant Baria",
    initials: "VB",
  },
];

const colors = [
  "bg-primary text-primary-foreground",
  "bg-accent text-foreground",
  "bg-primary/80 text-primary-foreground",
  "bg-accent/80 text-foreground",
  "bg-primary/60 text-primary-foreground",
];

export function Team() {
  return (
    <section id="team" className="py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Team
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Built by Students of LJ University
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A passionate team of students building technology for better village
            governance across India.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="group flex w-44 flex-col items-center rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold ${colors[index % colors.length]}`}
              >
                {member.initials}
              </div>
              <h3 className="font-display text-center text-sm font-bold text-foreground">
                {member.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
