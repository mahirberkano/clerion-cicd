export const metadata = {
  title: "Contact | Clerion Launchpad",
  description:
    "Reach out to the Clerion team to explore partnerships, demos, or tailored enablement.",
};

const contactChannels = [
  {
    title: "Talk to product",
    detail: "hello@clerion.dev",
    description:
      "Schedule a walkthrough of pipelines, dashboards, and integrations tailored to your stack.",
  },
  {
    title: "Support hotline",
    detail: "+1 (415) 555-2180",
    description:
      "Hyper-responsive support for production teams operating around the clock.",
  },
  {
    title: "Join the community",
    detail: "community.clerion.dev",
    description:
      "Swap tips, templates, and stories with fellow operators in our private forum.",
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-16 text-slate-100">
      <section className="rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-sky-300/70">
            Let&apos;s collaborate
          </span>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            We&apos;re excited to hear about your next launch.
          </h1>
          <p className="max-w-3xl text-base text-slate-300">
            Tell us a little about your team, desired automations, and how
            you&apos;re shipping today. A real human reads every message and
            will respond within two business days.
          </p>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <form className="glass-card rounded-3xl p-8 shadow-2xl shadow-black/40">
          <h2 className="text-2xl font-semibold text-white">
            Drop us a message
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Share a few details and we&apos;ll tailor our response.
          </p>
          <div className="mt-8 grid gap-6">
            <label className="space-y-2 text-sm">
              <span className="text-slate-200">Full name</span>
              <input
                type="text"
                placeholder="Jordan Rivers"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-200">Work email</span>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-200">What&apos;s top of mind?</span>
              <textarea
                rows={4}
                placeholder="Tell us about your pipelines, release process, and what you want to improve."
                className="w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
              />
            </label>
          </div>
          <button
            type="button"
            className="mt-8 w-full rounded-full border border-white/10 bg-gradient-to-r from-sky-500/80 via-cyan-500/70 to-teal-400/80 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition hover:scale-[1.01]"
          >
            Send message
          </button>
        </form>

        <div className="space-y-6">
          {contactChannels.map((channel) => (
            <article
              key={channel.title}
              className="glass-card rounded-3xl p-6 transition hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-white">
                {channel.title}
              </h3>
              <p className="mt-2 text-sm text-sky-200">{channel.detail}</p>
              <p className="mt-2 text-sm text-slate-300">{channel.description}</p>
            </article>
          ))}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm text-slate-300">
              Prefer a quick chat? We host weekly office hours for teams exploring
              their next evolution in CI/CD. Bring your questions, challenges, or
              just curiosity — we&apos;d love to connect.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
