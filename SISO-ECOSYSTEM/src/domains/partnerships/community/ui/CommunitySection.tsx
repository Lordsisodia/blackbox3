"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { GlowDivider } from "@/domains/shared/components/GlowDivider";
import { cn } from "@/domains/shared/utils/cn";

interface CommunitySectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}

const NAV_LINKS = [
  { href: "/partners/community", label: "Hub" },
  { href: "/partners/community/channels", label: "Channels" },
  { href: "/partners/community/messages", label: "Messages" },
  { href: "/partners/community/help", label: "Help" },
];

export function CommunitySection({ title, description, icon, children, actions }: CommunitySectionProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/partners/community") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <section className="flex flex-1 flex-col gap-5 px-4 py-6">
      <header className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {icon ? <span className="text-siso-orange">{icon}</span> : null}
            <div>
              <h1 className="text-xl font-semibold uppercase tracking-[0.35em] text-siso-text-primary">{title}</h1>
              {description ? <p className="text-xs text-siso-text-muted">{description}</p> : null}
            </div>
          </div>
          {actions}
        </div>
        <GlowDivider />
      </header>

      <nav className="flex flex-wrap items-center gap-2 text-xs font-medium">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-full border px-4 py-1.5 tracking-wide transition",
              isActive(link.href)
                ? "border-siso-orange/70 bg-siso-orange/10 text-siso-text-primary"
                : "border-siso-border text-siso-text-muted hover:text-siso-text-primary",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}
