import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import SectionHeader from "@/domains/shared/ui/settings/SectionHeader";
import DownloadPdfButton from "@/components/ui/download-pdf-button";
import MarkdownDoc from "./MarkdownDoc";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";

export function TermsOfServicePage() {
  return (
    <SettingsDetailLayout
      wrapContent={false}
      backHref="/partners/settings/legal"
      compactHeader
      hideHeader={false}
      title="Terms of Service"
      description="Usage rules for the SISO Platform"
    >
      <div className="space-y-4 pb-32 text-siso-text-primary">
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3">
          <div className="flex items-start justify-between gap-3">
            <SectionHeader title="Terms of Service" subtitle="Last updated: Jan 2024" />
            <DownloadPdfButton filename="terms-of-service.pdf" />
          </div>
          <div className="mt-3">
            {/* @ts-expect-error Async Server Component */}
            <MarkdownDoc filePath="src/domains/partnerships/portal-architecture/settings/legal/docs/terms-of-service.md" />
          </div>
        </div>
      </div>
    </SettingsDetailLayout>
  );
}
export default TermsOfServicePage;
