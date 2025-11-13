import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import SectionHeader from "@/domains/shared/ui/settings/SectionHeader";
import DownloadPdfButton from "@/components/ui/download-pdf-button";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";
import MarkdownDoc from "./MarkdownDoc";

export function PartnerAgreementPage() {
  return (
    <SettingsDetailLayout
      wrapContent={false}
      backHref="/partners/settings/legal"
      compactHeader
      hideHeader={false}
      title="Partner Agreement"
      description="Program terms, responsibilities, and payouts"
    >
      <div className="space-y-4 pb-32 text-siso-text-primary">
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3">
          <div className="flex items-start justify-between gap-3">
            <SectionHeader title="Partner Agreement" subtitle="Required for all partners" />
            <DownloadPdfButton filename="partner-agreement.pdf" />
          </div>
          <div className="mt-3">
            {/* Render markdown from src folder */}
            {/* path must be workspace-relative */}
            {/* @ts-expect-error Async Server Component */}
            <MarkdownDoc filePath="src/domains/partnerships/portal-architecture/settings/legal/docs/partner-agreement.md" />
          </div>
        </div>
      </div>
    </SettingsDetailLayout>
  );
}
export default PartnerAgreementPage;
