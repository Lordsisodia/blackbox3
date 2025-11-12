import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { GlowDivider } from "@/domains/shared/components/GlowDivider";
import { cn } from "@/domains/shared/utils/cn";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";

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
    <section className="relative flex flex-1 flex-col gap-4 px-4 pt-8 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] text-sm text-siso-text-secondary min-h-screen">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>
      <header className="relative z-10 space-y-3">
	<div className="flex min-w-0 items-center gap-3">
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
	  <h1 className="truncate whitespace-nowrap text-xl font-semibold uppercase tracking-[0.2em] text-siso-text-primary">{title}</h1>
	</div>
        <GlowDivider />
        {description ? <p className="text-xs text-siso-text-muted">{description}</p> : null}
      </header>

      <div className="relative z-10">
        {content}
      </div>
    </section>
  );
}
