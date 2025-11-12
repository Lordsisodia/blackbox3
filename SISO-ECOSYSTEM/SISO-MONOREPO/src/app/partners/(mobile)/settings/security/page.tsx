import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";
import { Lock } from "lucide-react";

export default function SettingsSecurityPage() {
  return (
    <SettingsDetailLayout
      title="Security"
      description="2FA, backup codes, and session management surface."
      icon={<Lock className="h-6 w-6 text-siso-orange" />}
    >
      <p className="text-sm text-siso-text-muted">Security controls will render here soon. The route exists so you can test navigation.</p>
    </SettingsDetailLayout>
  );
}
