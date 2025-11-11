import { getRecruitmentInvites } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";

export default async function PartnerRecruitmentPage() {
  const invites = await getRecruitmentInvites();

  return (
    <main className="min-h-screen bg-[#050409] px-8 py-10 text-white">
      <header className="mb-8 max-w-2xl space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-siso-orange">Pipeline Ops</p>
        <h1 className="text-4xl font-semibold">Recruitment Overrides</h1>
        <p className="text-base text-white/70">
          Track incentive links sent to potential partner recruiters and monitor override splits in one place.
        </p>
      </header>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/10 text-xs uppercase tracking-[0.2em] text-white/60">
            <tr>
              <th className="px-5 py-3">Partner</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Reward (bps)</th>
              <th className="px-5 py-3">Sent</th>
            </tr>
          </thead>
          <tbody>
            {invites.map((invite) => (
              <tr key={invite.id} className="border-t border-white/5">
                <td className="px-5 py-4 text-white">{invite.partnerName}</td>
                <td className="px-5 py-4 text-white/80">{invite.email}</td>
                <td className="px-5 py-4">
                  <span
                    className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wide"
                  >
                    {invite.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-white">{invite.rewardShareBps}</td>
                <td className="px-5 py-4 text-white/80">{new Date(invite.sentAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
