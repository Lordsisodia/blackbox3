import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import {
  Link2,
  Monitor,
  Smartphone,
  Tablet,
  LogOut,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Wifi,
  SignalHigh,
  Ellipsis,
} from "lucide-react";

type DeviceType = "desktop" | "phone" | "tablet";

type DeviceRisk = "trusted" | "flagged" | "standard";

type ConnectedDevice = {
  id: string;
  label: string;
  type: DeviceType;
  lastActive: string;
  location: string;
  network: string;
  isCurrent?: boolean;
  risk: DeviceRisk;
  requiresMfa?: boolean;
};

const deviceIcons: Record<DeviceType, JSX.Element> = {
  desktop: <Monitor className="h-5 w-5" />,
  phone: <Smartphone className="h-5 w-5" />,
  tablet: <Tablet className="h-5 w-5" />,
};

const devices: ConnectedDevice[] = [
  {
    id: "ios",
    label: "iOS Safari",
    type: "phone",
    lastActive: "Just now",
    location: "London, UK",
    network: "5G · SISO",
    isCurrent: true,
    risk: "trusted",
    requiresMfa: true,
  },
  {
    id: "desk-1",
    label: "Studio Desktop",
    type: "desktop",
    lastActive: "39 days ago",
    location: "HQ · Pod Room",
    network: "LAN · Secure",
    risk: "standard",
  },
  {
    id: "phone",
    label: "Pixel 7",
    type: "phone",
    lastActive: "112 days ago",
    location: "Lisbon, PT",
    network: "Hotel Wi-Fi",
    risk: "flagged",
  },
  {
    id: "desk-2",
    label: "Desktop",
    type: "desktop",
    lastActive: "174 days ago",
    location: "Unknown",
    network: "Unknown",
    risk: "standard",
  },
  {
    id: "tablet",
    label: "Onboarding iPad",
    type: "tablet",
    lastActive: "179 days ago",
    location: "Remote kits",
    network: "LTE",
    risk: "trusted",
    requiresMfa: true,
  },
];

const MAX_DEVICES = 10;
const lastForcedLogout = "12 days ago";

export function ConnectedDevicesScreen() {
  const activeCount = devices.length;
  const usagePercent = Math.min(Math.round((activeCount / MAX_DEVICES) * 100), 100);

  return (
    <SettingsDetailLayout
      title="Connected Devices"
      description="Keep track of active sessions across hardware."
      icon={<Link2 className="h-6 w-6 text-siso-orange" />}
    >
      <div className="space-y-5">
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#161720] via-[#11121b] to-[#08090f] p-4 text-siso-text-primary shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/55">Connected devices</p>
              <p className="text-3xl font-semibold text-white">
                {activeCount}
                <span className="text-sm font-normal text-white/60"> / {MAX_DEVICES}</span>
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition hover:text-siso-orange"
            >
              Manage access
              <SignalHigh className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/60">
                <span>Usage</span>
                <span>{usagePercent}%</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--siso-red)] via-[var(--siso-orange)] to-[#ffd166]"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-white/70">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> MFA on {devices.filter((d) => d.requiresMfa).length} devices
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-1.5">
                <AlertTriangle className="h-4 w-4 text-amber-300" /> Forced logout {lastForcedLogout}
              </div>
            </div>
          </div>
        </section>

        <ul className="space-y-4">
          {devices.map((device) => {
            const isFlagged = device.risk === "flagged";
            const isTrusted = device.risk === "trusted";

            const chips: Array<{ label: string; className: string }> = [];
            if (isFlagged) {
              chips.push({ label: "Flagged", className: "border-amber-400/60 text-amber-300" });
            } else if (device.isCurrent) {
              chips.push({ label: "Current", className: "border-siso-orange/70 text-siso-orange" });
            }
            if (device.requiresMfa && chips.length < 2) {
              chips.push({ label: "MFA", className: "border-emerald-400/60 text-emerald-300" });
            }
            if (isTrusted && chips.length < 2 && !device.isCurrent) {
              chips.push({ label: "Trusted", className: "border-white/20 text-siso-text-muted" });
            }

            return (
              <li key={device.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-siso-text-primary shadow-[0_15px_25px_rgba(0,0,0,0.35)]">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-siso-bg-primary/40 text-white">
                    {deviceIcons[device.type]}
                  </span>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold tracking-[0.05em] text-siso-text-primary">{device.label}</p>
                        <div className="text-[11px] text-siso-text-muted">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" /> {device.location}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="inline-flex items-center gap-1">
                            <Wifi className="h-3.5 w-3.5" /> {device.network}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-full border border-white/10 p-2 text-siso-text-muted transition hover:border-siso-orange hover:text-siso-orange"
                        aria-label="More"
                      >
                        <Ellipsis className="h-4 w-4" />
                      </button>
                    </div>

                    {chips.length ? (
                      <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase">
                        {chips.map((chip) => (
                          <span key={chip.label} className={`rounded-full border px-2.5 py-0.5 tracking-[0.2em] ${chip.className}`}>
                            {chip.label}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-siso-text-muted">
                      <span>Last active: {device.lastActive}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded-full bg-siso-orange/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0d0d10] shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
                        >
                          Require sign-in
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-white/10 p-2 text-siso-text-muted transition hover:border-red-500/60 hover:text-red-400"
                          aria-label="Sign out"
                        >
                          <LogOut className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="text-[11px] font-semibold uppercase tracking-[0.25em] text-siso-text-muted transition hover:text-siso-orange"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {isTrusted && !chips.some((chip) => chip.label === "Trusted") ? (
                  <p className="mt-2 text-[11px] text-siso-text-muted">Marked as trusted hardware.</p>
                ) : null}
              </li>
            );
          })}
        </ul>

        <section className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-siso-text-muted shadow-[0_15px_25px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-siso-text-primary">Session hygiene</p>
              <p className="text-xs">Lock things down before travel or loaners.</p>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-siso-text-primary"
            >
              Add device
            </button>
          </div>
          <ul className="mt-3 space-y-1.5 text-xs">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Force logouts after off-site demos.
            </li>
            <li className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-300" /> Flag devices idle &gt;90 days to review owners.
            </li>
            <li className="flex items-center gap-2">
              <SignalHigh className="h-4 w-4 text-siso-orange" /> Require MFA on any shared tablets.
            </li>
          </ul>
        </section>
      </div>
    </SettingsDetailLayout>
  );
}
