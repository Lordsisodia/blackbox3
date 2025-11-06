import { demoChannelCategories } from "@/domains/partnerships/workspace/application/demo-channel-registry";
import { WorkspaceDemoClient } from "@/domains/partnerships/workspace/ui/WorkspaceDemoClient";

export default function PartnersWorkspacePage() {
  return <WorkspaceDemoClient categories={demoChannelCategories} />;
}
