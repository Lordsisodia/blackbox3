import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { GlowDivider } from "@/domains/shared/components/GlowDivider";
import { cn } from "@/domains/shared/utils/cn";

interface SettingsDetailLayoutProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  wrapContent?: boolean;
  contentClassName?: string;
  backHref?: string | null;
  backLabel?: string;
}

export function SettingsDetailLayout({
  title,
  description,
  icon,
  children,
  wrapContent = true,
  contentClassName,
  backHref = "/partners/settings",
  backLabel = "Back to settings",
}: SettingsDetailLayoutProps) {
  const content = wrapContent ? (
    <article
      className={cn(
        "rounded-3xl border border-siso-border bg-siso-bg-secondary/60 p-4 text-sm text-siso-text-muted",
        contentClassName,
      )}
    >
      {children ?? <p>Configuration coming soon.</p>}
    </article>
  ) : (
    children ?? (
      <article
        className={cn(
          "rounded-3xl border border-siso-border bg-siso-bg-secondary/60 p-4 text-sm text-siso-text-muted",
          contentClassName,
        )}
      >
        Configuration coming soon.
      </article>
    )
  );

  return (
    <section className="flex flex-1 flex-col gap-4 px-4 py-6 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] text-sm text-siso-text-secondary">
      <header className="space-y-2">
	<div className="flex items-center gap-3">
	  {backHref ? (
	    <Link
	      href={backHref}
	      className="inline-flex h-8 w-8 items-center justify-center text-siso-text-muted transition hover:text-siso-text-primary"
	      aria-label={backLabel}
	    >
	      <ChevronLeft className="h-5 w-5" />
	    </Link>
	  ) : null}
	  {icon}
	  <h1 className="text-xl font-semibold uppercase tracking-[0.35em] text-siso-text-primary">{title}</h1>
	</div>
        <GlowDivider />
        {description ? <p className="text-xs text-siso-text-muted">{description}</p> : null}
      </header>

      {content}
    </section>
  );
}
