import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { Link2 } from "lucide-react";

export function ConnectedDevicesScreen() {
  return (
    <SettingsDetailLayout
      title="Connected Devices"
      description="Manage logged-in sessions and trusted devices."
      icon={<Link2 className="h-5 w-5 text-siso-orange" />}
    >
      <p>Connected devices table coming soon.</p>
    </SettingsDetailLayout>
  );
}
