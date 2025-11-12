import { Cog, LogOut, Menu as MenuIcon, Shield, Plug } from "lucide-react";
import { SETTINGS_MENU_ITEMS, type SettingsMenuItem } from "./settings-menu.config";
import { SettingsGroupCallout } from "./SettingsGroupCallout";
import { HighlightCard } from "@/components/ui/card-5";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import { SettingMenuItem } from "./SettingMenuItem";
import { GlowDivider } from "@/domains/shared/components/GlowDivider";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";

export function SettingsPanel() {
  const { openDrawer } = useMobileNavigation();
  const byId = Object.fromEntries(SETTINGS_MENU_ITEMS.map(i => [i.id, i] as const));
  const pick = (ids: string[]): SettingsMenuItem[] => ids.map(id => byId[id]).filter(Boolean);
  const basicsAndAccount = pick(["settings-general","settings-account","settings-profile","settings-devices"]);
  const safetyCompliance = pick(["settings-security","settings-privacy","settings-legal"]);
  const toolsAndMoney   = pick(["settings-integrations","wallet","checklist"]);
  return (
    <section className="relative flex flex-1 flex-col gap-6 px-4 pt-8 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] text-sm text-siso-text-secondary min-h-screen">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>
      <div className="relative z-10">
      <header className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <HighlightCard
              color="orange"
              className="w-full"
              title="Settings"
              description="Workspace essentials in one place."
              icon={<Cog className="h-5 w-5" />}
              metricValue=""
              metricLabel=""
              buttonText=""
              onButtonClick={() => {}}
            />
          </div>
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-black/40 text-neutral-300 transition hover:text-white hover:bg-neutral-900 hover:border-neutral-700"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-5 mt-1">
        {/* Basics & Account */}
        {basicsAndAccount.length > 0 && (
          <SettingsGroupCallout
            icon={<Cog className="h-4 w-4" />}
            title="Basics & Account"
            subtitle="General preferences, identity and devices"
          >
            <div className="flex flex-col divide-y divide-white/5 rounded-[20px] border border-white/10 bg-white/5">
              {basicsAndAccount.map((item) => (
                <SettingMenuItem key={`basics-${item.id}`} label={item.label} icon={item.icon} href={item.path} meta={item.meta} />
              ))}
            </div>
          </SettingsGroupCallout>
        )}

        {/* Safety & Compliance */}
        {safetyCompliance.length > 0 && (
          <SettingsGroupCallout
            icon={<Shield className="h-4 w-4" />}
            title="Safety & Compliance"
            subtitle="Security, privacy and legal policies"
          >
            <div className="flex flex-col divide-y divide-white/5 rounded-[20px] border border-white/10 bg-white/5">
              {safetyCompliance.map((item) => (
                <SettingMenuItem key={`safety-${item.id}`} label={item.label} icon={item.icon} href={item.path} meta={item.meta} />
              ))}
            </div>
          </SettingsGroupCallout>
        )}

        {/* Tools & Money */}
        {toolsAndMoney.length > 0 && (
          <SettingsGroupCallout
            icon={<Plug className="h-4 w-4" />}
            title="Tools & Money"
            subtitle="Connected apps and payouts"
          >
            <div className="flex flex-col divide-y divide-white/5 rounded-[20px] border border-white/10 bg-white/5">
              {toolsAndMoney.map((item) => (
                <SettingMenuItem key={`tools-${item.id}`} label={item.label} icon={item.icon} href={item.path} meta={item.meta} />
              ))}
            </div>
          </SettingsGroupCallout>
        )}
      </div>

      <button
        type="button"
        className="mt-4 flex items-center justify-center gap-2 rounded-3xl border border-siso-red/60 bg-siso-bg-secondary px-4 py-3 text-center text-sm font-semibold text-siso-red transition hover:border-siso-red hover:bg-siso-red/5"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
      </div>
    </section>
  );
}
