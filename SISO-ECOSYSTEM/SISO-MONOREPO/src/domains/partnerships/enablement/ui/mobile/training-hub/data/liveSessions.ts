export type SessionStatus = "open" | "rsvp" | "replay";

export interface LiveSession {
  id: string;
  title: string;
  date: string;
  time: string;
  presenters: string;
  status: SessionStatus;
  location: "Zoom" | "Teams" | "Discord";
}

export const upcomingSessions: LiveSession[] = [
  {
    id: "session-demo",
    title: "Product Demo Deep Dive",
    date: "Nov 14, 2025",
    time: "10:00 AM PT",
    presenters: "Avery Shaw",
    status: "open",
    location: "Zoom",
  },
  {
    id: "session-objection",
    title: "Objection Handling Lab",
    date: "Nov 19, 2025",
    time: "1:00 PM PT",
    presenters: "Jordan West",
    status: "rsvp",
    location: "Discord",
  },
  {
    id: "session-playback",
    title: "Ops Kickoff Replay",
    date: "Nov 2, 2025",
    time: "On-demand",
    presenters: "Ops Guild",
    status: "replay",
    location: "Zoom",
  },
];
