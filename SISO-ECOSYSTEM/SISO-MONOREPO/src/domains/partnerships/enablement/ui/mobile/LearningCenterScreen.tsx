import { mockCourses } from "./course-fixtures";

const tabs = ["Courses", "In Progress", "Favorites"] as const;

export function LearningCenterScreen() {
  return (
    <section className="flex flex-1 flex-col gap-4 px-4 py-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-siso-text-primary">Learning Center</h1>
        <div className="flex items-center gap-2 text-siso-text-muted">
          <span role="img" aria-label="search">🔍</span>
          <span role="img" aria-label="calendar">📅</span>
        </div>
      </header>
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className="rounded-full border border-siso-border px-3 py-1 text-xs text-siso-text-muted"
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {mockCourses.map((course) => (
          <article key={course.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <h2 className="text-lg font-semibold text-siso-text-primary">{course.title}</h2>
            <p className="text-sm text-siso-text-muted">{course.description}</p>
            <div className="mt-3 h-2 w-full rounded-full bg-siso-bg-hover">
              <div className="h-2 rounded-full bg-siso-orange" style={{ width: `${course.progress}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
