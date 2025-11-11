import { SubmitClientForm } from "@/domains/partnerships/portal-architecture/pipeline-ops/ui/SubmitClientForm";

export default function PartnerSubmitClientPage() {
  return (
    <main className="min-h-screen bg-[#030307] px-8 py-10 text-white">
      <header className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-siso-orange">Pipeline Ops</p>
        <h1 className="mt-2 text-4xl font-semibold">Submit a Client</h1>
        <p className="mt-2 text-base text-white/70">
          Fast intake for partners: log a new opportunity, route it to the right pod, and get an SLA instantly.
        </p>
      </header>

      <section className="mx-auto max-w-2xl rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_35px_80px_rgba(0,0,0,0.55)]">
        <SubmitClientForm />
      </section>
    </main>
  );
}
