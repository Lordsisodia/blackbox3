import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

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
  compactHeader?: boolean; // reduce default top padding and hide background pattern
  hideHeader?: boolean; // suppress visual header block
  srTitle?: string; // render visually-hidden h1 when header is hidden
  showBackground?: boolean; // show FallingPattern behind content
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
  compactHeader = false,
  hideHeader = false,
  srTitle,
  showBackground = true,
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

  const showHeader = !hideHeader && Boolean(title || description || icon || backHref);

  return (
    <section
      className={cn(
        "relative flex flex-1 flex-col gap-4 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] text-sm text-siso-text-secondary min-h-screen",
        compactHeader ? "pt-4" : "pt-8",
      )}
    >
      {showBackground && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
        </div>
      )}
      {showHeader ? (
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
            <h1 className="truncate whitespace-nowrap text-siso-text-primary uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]">{title}</h1>
          </div>
          <div className="h-1 rounded-full bg-gradient-to-r from-[var(--siso-red)] via-[var(--siso-orange)] to-[#ffd166] shadow-[0_0_12px_rgba(255,138,0,0.45)]" />
          {description ? <p className="text-xs text-siso-text-muted">{description}</p> : null}
        </header>
      ) : null}

      {hideHeader && (srTitle || title) ? <h1 className="sr-only">{srTitle || title}</h1> : null}

      <div className="relative z-10">
        {content}
      </div>
    </section>
  );
}
