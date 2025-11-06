export interface NotificationItem {
  id: string;
  channel: string;
  category: "All" | "Chats" | "Learning" | "Unread";
  title: string;
  preview: string;
  timestamp: string;
}

export const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    channel: "#daily-investing",
    category: "Learning",
    title: "Crypto Investing Analysis Daily Video",
    preview: "5th November 2025 ~ SEND IT TO ZERO Pt.2",
    timestamp: "Today 3:37 PM",
  },
  {
    id: "2",
    channel: "#product-ideas",
    category: "Chats",
    title: "Car Key Holder",
    preview: "Ad link + creative feedback to share",
    timestamp: "Today 1:47 PM",
  },
  {
    id: "3",
    channel: "#daily-lesson",
    category: "Unread",
    title: "Scaling offer frameworks",
    preview: "Drop recap and action plan",
    timestamp: "Today 10:05 AM",
  },
];
