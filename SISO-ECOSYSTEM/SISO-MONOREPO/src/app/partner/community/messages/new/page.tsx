import { redirect } from "next/navigation";

export default function PartnerCommunityMessagesNewRedirect() {
  // No separate composer route yet — send to messages hub
  redirect("/partners/messages");
}

