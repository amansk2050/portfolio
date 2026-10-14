import Image from "next/image";

// Colours use the zinc ramp + accent tokens only, so the section reads correctly in both the
// dark theme and the light (Claude) preview, where the ramp is inverted in globals.css.

const FACTS = [
  { label: "Based in", value: "Birbhum, West Bengal · remote" },
  { label: "Experience", value: "5+ years" },
  { label: "Now", value: "Founding full-stack developer, Finanshels" },
  { label: "Education", value: "B.Tech, MAKAUT · 2016–2020" },
  { label: "Languages", value: "English, Hindi, Bengali" },
];

const PATH = [
  { stage: "Backend", note: "HRMS modules and a course system used by 1,000+ people at J&F." },
  { stage: "Web3", note: "Smart contract audits, ERC-4337 account abstraction, custodial wallets." },
  { stage: "AI", note: "Agent workflows on the Claude API, including a WhatsApp sales agent." },
  { stage: "Full-stack product", note: "Next.js and NestJS end to end; founding developer at Finanshels." },
];

export default function About() {
  return (
    <section id="about" className="py-28 relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-14">
          <p className="font-display text-sm font-medium text-accent-blue">About</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-100">
            Backend depth, full-stack range.
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="relative aspect-[4/5] max-w-sm rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
              <Image
                src="/profile.jpg"
                alt="Sheikh Aman"
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 384px, 100vw"
                className="object-cover"
              />
            </div>

            <dl className="mt-8 max-w-sm divide-y divide-zinc-800 border-y border-zinc-800">
              {FACTS.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="font-display text-sm text-zinc-500 shrink-0">{f.label}</dt>
                  <dd className="text-sm text-zinc-200 text-right">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="lg:col-span-8 max-w-2xl space-y-8">
            <p className="text-xl sm:text-2xl leading-relaxed text-zinc-100">
              I am a full-stack engineer with 5+ years of experience, building fintech and SaaS products with NestJS,
              Next.js, Node.js and PostgreSQL.
            </p>
            <p className="text-lg leading-relaxed text-zinc-400">
              I started in backend, spent a few years in blockchain and Web3, then moved into AI and full-stack product
              work. At Finanshels I am the founding full-stack developer: I make the architecture calls, build the
              in-house fintech CRM, and build the AI agents the team uses to pull client data without hopping between
              screens.
            </p>

            <blockquote className="border-l-2 border-accent-blue pl-6 text-xl italic leading-relaxed text-zinc-200">
              Not every problem needs blockchain or AI. Simple, well-built systems solve most of them.
            </blockquote>

            <div className="pt-4">
              <h3 className="font-display text-sm font-medium text-zinc-500 mb-6">How I got here</h3>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                {PATH.map((p, i) => (
                  <li key={p.stage} className="border-t border-zinc-800 pt-4">
                    <span className="font-mono text-xs text-accent-blue">0{i + 1}</span>
                    <p className="mt-1 font-display text-lg font-semibold text-zinc-100">{p.stage}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{p.note}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
