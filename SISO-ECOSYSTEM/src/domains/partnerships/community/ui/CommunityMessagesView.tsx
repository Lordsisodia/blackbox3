"use client";

import { MessagesScreen } from "@/domains/partnerships/communications/ui/mobile";
import { MobileNavigationProvider } from "@/domains/partnerships/mobile/application/navigation-store";

interface CommunityMessagesViewProps {
  initialThreadId?: string;
}

const DEFAULT_NAV_STATE = {
  activeTab: "messages" as const,
  previousTab: "messages" as const,
  isQuickActionsOpen: false,
  isDrawerOpen: false,
  activeQuickAction: null,
  isImmersiveMode: true,
};

export function CommunityMessagesView({ initialThreadId }: CommunityMessagesViewProps) {
  return (
    <MobileNavigationProvider initialState={DEFAULT_NAV_STATE}>
      <MessagesScreen initialThreadId={initialThreadId} />
    </MobileNavigationProvider>
  );
}
