import { CommunityMessagesView } from "@/domains/partnerships/community/ui/CommunityMessagesView";

interface ThreadPageProps {
  params: { threadId: string };
}

export default function CommunityThreadPage({ params }: ThreadPageProps) {
  return <CommunityMessagesView initialThreadId={params.threadId} />;
}
