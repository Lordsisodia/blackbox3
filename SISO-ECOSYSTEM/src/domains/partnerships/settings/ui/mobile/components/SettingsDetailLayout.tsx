import type { ReactNode } from "react";

interface SettingsDetailLayoutProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function SettingsDetailLayout({ title, description, children }: SettingsDetailLayoutProps) {
  return (
    <section className="flex flex-1 flex-col gap-5 px-4 py-6 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] text-sm text-siso-text-secondary">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-siso-text-primary">{title}</h1>
        {description ? <p className="text-xs text-siso-text-muted">{description}</p> : null}
      </header>
      <article className="rounded-3xl border border-siso-border bg-siso-bg-secondary/60 p-4 text-sm text-siso-text-muted">
        {children ?? <p>Configuration coming soon.</p>}
      </article>
    </section>
  );
}
