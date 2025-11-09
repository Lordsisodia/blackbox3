import { CertificationsSection } from "../sections";
import { certificationBadges } from "../data";

export function CertificationsPage() {
  return (
    <div className="space-y-6 p-4">
      <CertificationsSection badges={certificationBadges} />
    </div>
  );
}
