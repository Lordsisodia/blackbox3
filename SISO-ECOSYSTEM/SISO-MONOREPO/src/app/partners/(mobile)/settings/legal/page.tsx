import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";
import { FileText } from "lucide-react";

export default function SettingsLegalPage() {
  return (
    <SettingsDetailLayout
      title="Legal"
      description="Contracts, terms of service, and compliance documents."
      icon={<FileText className="h-6 w-6 text-siso-orange" />}
    >
      <p className="text-sm text-siso-text-muted">Route placeholder — plug in the document viewer once the legal CMS lands.</p>
    </SettingsDetailLayout>
  );
}
