import { Cog, LogOut } from "lucide-react";
import { SETTINGS_MENU_ITEMS } from "./settings-menu.config";
import { SettingMenuItem } from "../components/SettingMenuItem";
import { GlowDivider } from "@/domains/shared/components/GlowDivider";
import { ElectricCardShell } from "@/components/ui/electric-card-shell";

export function SettingsPanel() {
  return (
    <section className="flex flex-1 flex-col gap-5 px-4 py-6 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] text-sm text-siso-text-secondary">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <Cog className="h-6 w-6 text-siso-orange drop-shadow-[0_0_12px_rgba(255,138,0,0.35)]" />
          <h2 className="text-xl font-semibold uppercase tracking-[0.35em] text-siso-text-primary">Settings</h2>
        </div>
        <GlowDivider />
        <p className="text-xs text-siso-text-muted">Workspace essentials in one place.</p>
      </header>

      <ElectricCardShell className="w-full" contentClassName="p-4">
        <div className="relative overflow-hidden rounded-[26px] bg-siso-bg-secondary/60 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-lg">
          <div className="pointer-events-none absolute inset-y-4 left-0 w-[1px] rounded-full bg-gradient-to-b from-[var(--siso-orange)] via-[var(--siso-red)] to-transparent opacity-60" />
          <div className="flex flex-col">
            {SETTINGS_MENU_ITEMS.map((item) => (
              <SettingMenuItem key={item.id} label={item.label} icon={item.icon} href={item.path} meta={item.meta} />
            ))}
          </div>
        </div>
      </ElectricCardShell>

      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-3xl border border-siso-red/60 bg-siso-bg-secondary/60 px-4 py-3 text-center text-sm font-semibold text-siso-red transition hover:border-siso-red hover:bg-siso-red/5"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
    </section>
  );
}
