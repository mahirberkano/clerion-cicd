import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clerion Launchpad",
  description:
    "Concept front-end for a modern CI/CD workflow with a playful yet professional aesthetic.",
};

export default function RootLayout({ children }) {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white`}
      >
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-10 top-[-10%] h-72 w-72 rounded-full bg-gradient-to-br from-sky-500/40 via-cyan-400/30 to-transparent blur-3xl sm:h-[22rem] sm:w-[22rem]" />
            <div className="absolute bottom-[-15%] right-[-15%] h-80 w-80 rounded-full bg-gradient-to-tr from-purple-500/30 via-fuchsia-500/20 to-transparent blur-3xl sm:h-[26rem] sm:w-[26rem]" />
          </div>

          <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-12 pt-10 sm:px-12">
            <header className="flex flex-col gap-6 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur md:flex-row md:items-center md:justify-between">
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-white transition-colors hover:text-sky-200"
              >
                Clerion<span className="text-sky-300">.</span>
              </Link>
              <nav>
                <ul className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-200">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="rounded-full px-4 py-2 transition-all hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href="mailto:hello@clerion.dev"
                className="w-full rounded-full border border-white/10 bg-gradient-to-r from-sky-500/80 via-cyan-500/70 to-teal-400/70 px-5 py-2 text-center text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition hover:scale-[1.02] hover:shadow-sky-900/40 md:w-auto"
              >
                Book a demo
              </a>
            </header>

            <main className="flex-1 py-12">{children}</main>

            <footer className="rounded-3xl border border-white/5 bg-white/5 px-6 py-4 text-sm text-slate-300 backdrop-blur">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} Clerion Labs. All rights reserved.</p>
                <p className="text-slate-400">
                  Crafted with care for continuous delivery teams...
                </p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
