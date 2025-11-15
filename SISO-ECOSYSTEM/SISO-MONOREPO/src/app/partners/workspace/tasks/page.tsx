import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workspace Tasks • SISO Partners",
  description: "Centralized workspace tasks view (coming soon).",
};

export default function PartnersWorkspaceTasksPage() {
  return (
    <section className="space-y-4 p-6 text-sm text-white">
      <h1 className="text-2xl font-semibold">Workspace Tasks</h1>
      <p>This workspace route is reserved for the consolidated task manager experience.</p>
    </section>
  );
}
