import { mockNotifications } from "./notification-fixtures";

const filters = ["All", "Chats", "Learning", "Unread"] as const;

type FilterKey = (typeof filters)[number];

export function NotificationsScreen() {
  return (
    <section className="flex flex-1 flex-col gap-4 px-4 py-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-siso-text-primary">Notifications</h1>
        <div className="flex items-center gap-2 text-siso-text-muted">
          <span role="img" aria-label="filter">⚙</span>
          <span role="img" aria-label="bell">🔔</span>
        </div>
      </header>
      <div className="flex gap-2 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            className="whitespace-nowrap rounded-full border border-siso-border px-3 py-1 text-xs text-siso-text-muted"
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {mockNotifications.map((notification) => (
          <article key={notification.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <header className="mb-1 flex items-center justify-between text-xs text-siso-text-muted">
              <span>{notification.channel}</span>
              <span>{notification.timestamp}</span>
            </header>
            <h2 className="text-sm font-semibold text-siso-text-primary">{notification.title}</h2>
            <p className="text-sm text-siso-text-muted">{notification.preview}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
