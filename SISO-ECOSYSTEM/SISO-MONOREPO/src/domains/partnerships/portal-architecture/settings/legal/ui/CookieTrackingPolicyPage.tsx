import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import SectionHeader from "@/domains/shared/ui/settings/SectionHeader";
import DownloadPdfButton from "@/components/ui/download-pdf-button";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";
import MarkdownDoc from "./MarkdownDoc";

export function CookieTrackingPolicyPage() {
  return (
    <SettingsDetailLayout
      wrapContent={false}
      backHref="/partners/settings/legal"
      compactHeader
      hideHeader={false}
      title="Cookie & Tracking Policy"
      description="Types of cookies and your choices"
    >
      <div className="space-y-4 pb-32 text-siso-text-primary">
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3">
          <div className="flex items-start justify-between gap-3">
            <SectionHeader title="Cookie & Tracking Policy" subtitle="Last updated: Nov 2024" />
            <DownloadPdfButton filename="cookie-tracking-policy.pdf" />
          </div>
          <div className="mt-3">
            {/* @ts-expect-error Async Server Component */}
            <MarkdownDoc filePath="src/domains/partnerships/portal-architecture/settings/legal/docs/cookie-tracking-policy.md" />
          </div>
        </div>
      </div>
    </SettingsDetailLayout>
  );
}
export default CookieTrackingPolicyPage;
