import { getActiveDeals } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";

const stageAccent: Record<string, string> = {
  proposal: "text-sky-300",
  negotiation: "text-amber-300",
  won: "text-emerald-300",
  lost: "text-rose-300",
};

export default async function PartnerActiveDealsPage() {
  const deals = await getActiveDeals();

  return (
    <main className="min-h-screen bg-[#040305] px-8 py-10 text-white">
      <header className="mb-8 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-siso-orange">Pipeline Ops</p>
        <h1 className="mt-2 text-4xl font-semibold">Active Deals</h1>
        <p className="mt-2 text-base text-white/70">
          Kanban-ready list of in-flight opportunities with quick signals for aging, health, and next activity.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {deals.map((deal) => (
          <article key={deal.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">{deal.company}</h2>
                <p className={`text-xs uppercase tracking-[0.3em] ${stageAccent[deal.stage] ?? "text-white/60"}`}>
                  {deal.stage}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/60">Value</p>
                <p className="text-2xl font-semibold">${deal.amount.toLocaleString()}</p>
              </div>
            </div>

            <dl className="mt-4 grid gap-3 text-sm text-white/80">
              <div className="flex justify-between">
                <dt>Aging</dt>
                <dd>{deal.agingDays} days</dd>
              </div>
              <div className="flex justify-between">
                <dt>Last activity</dt>
                <dd>{new Date(deal.lastActivityAt).toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Health</dt>
                <dd className={deal.health === "risk" ? "text-rose-300" : "text-emerald-300"}>{deal.health}</dd>
              </div>
            </dl>

            <div className="mt-5 flex gap-3">
              <button className="flex-1 rounded-2xl bg-siso-orange px-4 py-2 text-sm font-semibold text-black">
                Advance stage
              </button>
              <button className="flex-1 rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-white">
                Log activity
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
