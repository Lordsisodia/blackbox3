import { MobileShell } from "@/domains/partnerships/mobile/ui/MobileShell";

interface ThreadPageProps {
  params: { threadId: string };
}

export default function PartnersMessageThreadPage({ params }: ThreadPageProps) {
  // TODO: plumb threadId into MessagesScreen once it accepts routing context.
  void params.threadId;

  return <MobileShell initialTab="messages" initialImmersiveMode />;
}
