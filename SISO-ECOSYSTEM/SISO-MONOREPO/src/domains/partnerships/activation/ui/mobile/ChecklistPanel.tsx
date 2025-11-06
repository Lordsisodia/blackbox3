import { mockChecklist, ChecklistTask } from "./checklist-fixtures";

export function ChecklistPanel() {
  const grouped = mockChecklist.reduce<Record<string, ChecklistTask[]>>(
    (acc, task) => {
      if (!acc[task.group]) {
        acc[task.group] = [];
      }
      acc[task.group].push(task);
      return acc;
    },
    {}
  );

  return (
    <section className="flex flex-1 flex-col gap-4 px-4 py-6">
      <header>
        <h2 className="text-2xl font-semibold text-siso-text-primary">Checklist</h2>
        <p className="text-sm text-siso-text-muted">Automation driven onboarding tasks mapped to Activate.</p>
      </header>
      <div className="space-y-4">
        {Object.entries(grouped).map(([group, tasks]) => (
          <article key={group} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <header className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-siso-text-primary">{group}</h3>
              <button className="rounded-full border border-siso-border px-3 py-1 text-xs text-siso-text-muted">
                Create Group
              </button>
            </header>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between rounded-2xl bg-siso-bg-tertiary px-3 py-2 text-sm"
                >
                  <div>
                    <p className="text-siso-text-primary">{task.title}</p>
                    <p className="text-xs text-siso-text-muted">{task.cadence}</p>
                  </div>
                  <span>{task.isComplete ? '✅' : '⬜️'}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
