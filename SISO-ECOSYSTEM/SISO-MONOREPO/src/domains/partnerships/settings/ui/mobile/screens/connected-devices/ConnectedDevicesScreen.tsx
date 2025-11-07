import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { Link2, Monitor, Smartphone, Tablet, LogOut } from "lucide-react";

type DeviceType = "desktop" | "phone" | "tablet";

const deviceIcons: Record<DeviceType, JSX.Element> = {
  desktop: <Monitor className="h-5 w-5" />, 
  phone: <Smartphone className="h-5 w-5" />, 
  tablet: <Tablet className="h-5 w-5" />, 
};

const devices = [
  { id: "ios", label: "iOS Safari", type: "phone" as DeviceType, lastActive: "Now", isCurrent: true },
  { id: "desk-1", label: "Desktop", type: "desktop" as DeviceType, lastActive: "39 days ago" },
  { id: "phone", label: "Pixel 7", type: "phone" as DeviceType, lastActive: "112 days ago" },
  { id: "desk-2", label: "Studio Desktop", type: "desktop" as DeviceType, lastActive: "174 days ago" },
  { id: "tablet", label: "Onboarding iPad", type: "tablet" as DeviceType, lastActive: "179 days ago" },
];

export function ConnectedDevicesScreen() {
  return (
    <SettingsDetailLayout
      title="Connected Devices"
      description="Keep track of active sessions across hardware."
      icon={<Link2 className="h-6 w-6 text-siso-orange" />}
    >
      <header className="flex items-center justify-between rounded-2xl border border-siso-border/70 bg-siso-bg-secondary/70 px-4 py-3 text-xs uppercase tracking-[0.35em] text-siso-text-primary">
        <div>
          <p className="text-[11px] tracking-[0.25em] text-siso-text-muted">Connected Devices</p>
          <p className="text-[12px] font-semibold tracking-[0.3em] text-siso-text-primary">5 / 10 active</p>
        </div>
        <span className="text-[11px] tracking-[0.3em] text-siso-text-muted">Manage access</span>
      </header>

      <ul className="space-y-3">
        {devices.map((device) => (
          <li
            key={device.id}
            className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/50 p-4 text-siso-text-primary shadow-[0_18px_35px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-siso-border/50 bg-siso-bg-tertiary/80 text-siso-text-primary">
                {deviceIcons[device.type]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold tracking-[0.08em]">{device.label}</p>
                <p className="text-xs text-siso-text-muted">Last active: {device.lastActive}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-siso-border/60 p-2 text-siso-text-muted transition hover:border-siso-orange hover:text-siso-orange"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
            {device.isCurrent ? (
              <span className="mt-3 inline-flex items-center rounded-full border border-siso-orange/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-orange">
                Current device
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </SettingsDetailLayout>
  );
}
