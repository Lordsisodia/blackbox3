import { Cog, LogOut } from "lucide-react";
import { SETTINGS_MENU_ITEMS } from "./settings-menu.config";
import { SettingMenuItem } from "./SettingMenuItem";
import { GlowDivider } from "@/domains/shared/components/GlowDivider";

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

      <div className="flex flex-col divide-y divide-white/5 rounded-[26px] border border-white/10 bg-siso-bg-secondary/70 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
        {SETTINGS_MENU_ITEMS.map((item) => (
          <SettingMenuItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            href={item.path}
            meta={item.meta}
          />
        ))}
      </div>

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
