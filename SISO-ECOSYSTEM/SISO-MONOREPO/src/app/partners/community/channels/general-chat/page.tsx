import type { Metadata } from "next";
import { CommunityChannelTemplate } from "@/domains/partnerships/community/ui/CommunityChannelTemplate";
import { communityChannels } from "@/domains/partnerships/community/data/channelPresets";

export const metadata: Metadata = {
  title: "# general-chat • SISO Partner Community",
  description: "Program-wide channel for quick wins, questions, and updates.",
};

export default function PartnersCommunityGeneralChatPage() {
  return <CommunityChannelTemplate channel={communityChannels.general} />;
}
