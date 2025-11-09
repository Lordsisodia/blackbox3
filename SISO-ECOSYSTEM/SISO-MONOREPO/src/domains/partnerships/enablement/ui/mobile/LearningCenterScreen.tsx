import { GraduationCap, MoreHorizontal } from "lucide-react";

import { GlowDivider } from "@/domains/shared/components/GlowDivider";

import { mockCourses } from "./course-fixtures";

const tabs = ["Courses", "In Progress", "Favorites"] as const;

export function LearningCenterScreen() {
  return (
    <section className="flex flex-1 flex-col gap-5 px-4 py-6">
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-siso-orange" />
            <h1 className="text-xl font-semibold uppercase tracking-[0.35em] text-siso-text-primary">Learning Center</h1>
          </div>
          <button
            type="button"
            aria-label="Learning center menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-siso-border text-siso-text-muted"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        <GlowDivider />
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
