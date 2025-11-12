import { Hash } from "lucide-react";

import { CommunitySection } from "@/domains/partnerships/community/ui/CommunitySection";

const MOCK_GUIDELINES = [
  "Ship daily updates and link client wins.",
  "Drop open questions with context to help HQ unblock fast.",
  "Use @captains when you need priority replies.",
];

export default function CommunityGeneralPage() {
  return (
    <CommunitySection
      title="#general"
      description="Program-wide chat for daily sync, rituals, and quick alignment."
      icon={<Hash className="h-5 w-5" />}
    >
      <div className="rounded-3xl border border-siso-border bg-siso-bg-secondary/40 p-4">
        <p className="text-xs uppercase tracking-[0.35em] text-siso-text-muted">Guidelines</p>
        <ul className="mt-2 space-y-1 text-sm text-siso-text-muted">
          {MOCK_GUIDELINES.map((item) => (
            <li key={item} className="flex items-start gap-2 text-left">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-siso-orange" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border border-dashed border-siso-border/60 bg-siso-bg-secondary/30 p-4 text-sm text-siso-text-muted">
        <p>
          The production build swaps this placeholder with the full `ChatViewport` + `ComposerBar` stack. We reuse the
          existing messaging timeline, pass the `#general` channel thread data, and surface the channel actions under the
          new three-dot menu.
        </p>
      </div>
    </CommunitySection>
  );
}
