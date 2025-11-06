export interface MessageThread {
  id: string;
  name: string;
  badge?: string;
  preview: string;
  unreadCount?: number;
}

export const mockThreads: MessageThread[] = [
  { id: "saved", name: "Saved Messages", preview: "Your personal space" },
  { id: "captain", name: "Rauzas | Captain", preview: "Check the new mission briefs" },
  { id: "guide", name: "HQ Guide", badge: "BOT", preview: "Ready for questions" },
];
