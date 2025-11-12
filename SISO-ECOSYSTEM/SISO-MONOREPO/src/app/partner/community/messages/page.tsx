import { redirect } from "next/navigation";

export default function PartnerCommunityMessagesRedirect() {
  // Legacy path alias → canonical route
  redirect("/partners/messages");
}

