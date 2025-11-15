import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workspace Files • SISO Partners",
  description: "Private workspace file vault placeholder.",
};

export default function PartnersWorkspaceMyFilesPage() {
  return (
    <section className="space-y-4 p-6 text-sm text-white">
      <h1 className="text-2xl font-semibold">Workspace My Files</h1>
      <p>This path will host the personal file manager inside the partner workspace.</p>
    </section>
  );
}
