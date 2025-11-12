import { redirect } from "next/navigation";

type ThreadParams = {
  params: { threadId: string };
};

export default function PartnerCommunityMessageThreadRedirect({ params }: ThreadParams) {
  const { threadId } = params;
  redirect(`/partners/messages/${encodeURIComponent(threadId)}`);
}

