import Plan from "@/components/ui/agent-plan";

export function ChecklistPanel() {
  return (
    <section className="flex flex-1 flex-col gap-4 px-4 py-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.35em] text-siso-text-muted">Activate</p>
        <h2 className="text-2xl font-semibold text-siso-text-primary">Partner Checklist</h2>
        <p className="text-sm text-siso-text-muted">
          Track onboarding, payout readiness, and enablement tasks powered by the new agent plan view.
        </p>
      </header>
      <div className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/60 p-2">
        <Plan />
      </div>
    </section>
  );
}
