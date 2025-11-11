import { getProspects } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";

export default async function PartnerProspectsPage() {
  const prospects = await getProspects();

  return (
    <main className="min-h-screen bg-[#050506] px-8 py-10 text-siso-text-primary">
      <header className="mb-8 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-siso-orange">Pipeline Ops</p>
        <h1 className="mt-2 text-4xl font-semibold text-white">My Prospects</h1>
        <p className="mt-2 text-base text-siso-text-muted">
          Track early-stage leads, see confidence at a glance, and jump into the next action without leaving the
          portal.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prospects.map((prospect) => (
          <article
            key={prospect.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_15px_35px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">{prospect.company}</h2>
                <p className="text-xs uppercase tracking-[0.25em] text-siso-text-muted">{prospect.stage}</p>
              </div>
              <span className="text-sm font-semibold text-white/80">
                {(prospect.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <dl className="mt-4 space-y-2 text-sm text-siso-text-secondary">
              <div className="flex justify-between">
                <dt className="text-white/60">Contact</dt>
                <dd className="text-white/90">{prospect.contactName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/60">Next action</dt>
                <dd className="text-white/90">{prospect.nextAction ?? "TBD"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/60">Owner</dt>
                <dd className="text-white/90">{prospect.owner}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/60">Updated</dt>
                <dd className="text-white/90">{new Date(prospect.updatedAt).toLocaleDateString()}</dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {prospect.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-white/80">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-3 text-sm">
              <button className="flex-1 rounded-2xl bg-siso-orange px-4 py-2 font-semibold text-black">Qualify</button>
              <button className="flex-1 rounded-2xl border border-white/20 px-4 py-2 font-semibold text-white">
                Schedule intro
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
