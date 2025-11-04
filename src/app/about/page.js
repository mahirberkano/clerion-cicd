import Link from "next/link";

export const metadata = {
  title: "About | Clerion Launchpad",
  description:
    "Learn how Clerion brings together automation, visibility, and team rituals for seamless software delivery.",
};

const values = [
  {
    title: "Human-first automation",
    description:
      "We design the handoffs between people and systems to be intuitive, transparent, and collaborative.",
  },
  {
    title: "Flow over friction",
    description:
      "From integrations to insights, every interaction is tuned to keep teams in a state of momentum.",
  },
  {
    title: "Signals that matter",
    description:
      "We champion meaningful metrics that spark the right conversations instead of dashboard noise.",
  },
];

const milestones = [
  {
    year: "2021",
    label: "Blueprint",
    body: "A small team of platform engineers map the pain points across deployment tooling.",
  },
  {
    year: "2022",
    label: "Mission Control",
    body: "We launch a shared cockpit for release coordination, approvals, and postmortems.",
  },
  {
    year: "2023",
    label: "Insights",
    body: "Delivery intelligence arrives, surfacing DORA metrics and drift signals automatically.",
  },
  {
    year: "Today",
    label: "Launchpad",
    body: "Clerion powers teams shipping multiple times per day with calm confidence.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-20 text-slate-100">
      <section className="rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur">
        <div className="space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-sky-300/70">
            Our purpose
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Building calmer, more confident deployment cultures.
          </h1>
          <p className="max-w-3xl text-base text-slate-300">
            We are a collective of platform engineers, product thinkers, and
            designers obsessed with making continuous delivery approachable.
            Beyond tooling, we care about habits — the rituals that help teams
            respond quickly without burning out.
          </p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="glass-card rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-white">What we value</h2>
          <p className="mt-3 text-sm text-slate-300">
            These principles show up in every feature and conversation we have.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((value) => (
            <article
              key={value.title}
              className="glass-card rounded-3xl p-6 transition hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-white">
                {value.title}
              </h3>
              <p className="mt-3 text-sm text-slate-300">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-10 backdrop-blur">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-sky-300/60">
            From concept to launchpad
          </span>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            A timeline of our journey.
          </h2>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {milestones.map((milestone) => (
            <div
              key={milestone.year}
              className="glass-card relative rounded-3xl p-6"
            >
              <span className="text-xs uppercase tracking-[0.5em] text-sky-300/80">
                {milestone.year}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-white">
                {milestone.label}
              </h3>
              <p className="mt-3 text-sm text-slate-300">{milestone.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Ready to build the next era of delivery together?
            </h2>
            <p className="text-base text-slate-300">
              We collaborate with modern teams to roll out delightful delivery
              experiences. Let&apos;s explore how Clerion can plug into your
              stack, connect your rituals, and free your engineers to focus on
              what matters.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              className="gradient-border relative flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              Connect with us
            </Link>
            <a
              href="mailto:hello@clerion.dev"
              className="flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-sky-300/60 hover:text-white"
            >
              hello@clerion.dev
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
