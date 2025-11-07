import Link from "next/link";

export default function Home() {
  const highlights = [
    {
      stat: "Deploy in 4 minutes!",
      description: "Blueprinted pipelines ship every merge automatically.",
    },
    {
      stat: "Teams ship 35% faster",
      description: "Release guardrails keep everyone confident and aligned.",
    },
  ];

  const features = [
    {
      title: "Blueprint Pipelines",
      description:
        "Compose visual pipelines with reusable stages, smart caching, and instant previews for every branch.",
    },
    {
      title: "Mission Control",
      description:
        "A single command center to observe deploy status, rollout health, and upcoming releases without context-switching.",
    },
    {
      title: "Delivery Insights",
      description:
        "Surface lead-time metrics, DORA insights, and drift alerts right where engineers already collaborate.",
    },
  ];

  const timeline = [
    {
      title: "Plan",
      description:
        "Kick off with a scenario template tailored to your stack and cloud provider.",
    },
    {
      title: "Automate",
      description:
        "Wire automated checks, ephemeral environments, and approvals without YAML sprawl.",
    },
    {
      title: "Release",
      description:
        "Progressively roll out to production and automatically capture post-release learnings.",
    },
  ];

  return (
    <div className="space-y-20">
      <section className="grid gap-12 rounded-3xl border border-white/5 bg-white/5 p-10 text-slate-100 shadow-2xl shadow-black/40 backdrop-blur lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-slate-200">
            CI/CD without friction
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Launch production-ready builds with confidence and flow.
          </h1>
          <p className="max-w-xl text-lg text-slate-300">
            Clerion orchestrates releases, approvals, and insights into one
            fluid experience. No more brittle scripts — just cohesive delivery
            for teams who ship continuously.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="gradient-border relative flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              Start a conversation
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-sky-300/60 hover:text-white"
            >
              See the vision
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {highlights.map((item) => (
            <div
              key={item.stat}
              className="glass-card animate-float rounded-2xl p-6 text-left"
            >
              <p className="text-2xl font-semibold text-white">{item.stat}</p>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 text-left">
          <span className="text-sm font-semibold uppercase tracking-[0.45em] text-sky-300/80">
            Why teams choose clerion
          </span>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            A delivery cockpit your engineers will actually enjoy.
          </h2>
          <p className="max-w-3xl text-base text-slate-300">
            From the first merge to post-release retros, Clerion guides the
            entire journey. Each feature is tuned to make high-velocity delivery
            feel calm, discoverable, and transparent.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="glass-card rounded-2xl p-6 text-left transition hover:-translate-y-1 hover:border-white/25"
            >
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/5 bg-gradient-to-r from-white/10 via-white/5 to-transparent p-10 backdrop-blur">
        <div className="flex flex-col gap-4 text-left">
          <span className="text-sm font-semibold uppercase tracking-[0.45em] text-sky-300/70">
            Delivery in motion
          </span>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            A guided loop for every release cycle.
          </h2>
          <p className="max-w-2xl text-base text-slate-300">
            Pair intuitive automation with human-centric checkpoints. Clerion
            keeps velocity high while ensuring nothing slips through the cracks.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {timeline.map((item, index) => (
            <div
              key={item.title}
              className="glass-card relative rounded-2xl p-6 text-left"
            >
              <span className="absolute -top-5 left-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-emerald-400 text-sm font-semibold text-white shadow-lg shadow-sky-900/40">
                {index + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
