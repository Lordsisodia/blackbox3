import { demoChannelCategories } from "@/domains/partnerships/workspace/application/demo-channel-registry";
import { WorkspaceDemoClient } from "@/domains/partnerships/workspace/ui/WorkspaceDemoClient";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";

export default function PartnersWorkspacePage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "workspace" }}>
      <WorkspaceDemoClient categories={demoChannelCategories} />
    </PartnersPageShell>
  );
}
