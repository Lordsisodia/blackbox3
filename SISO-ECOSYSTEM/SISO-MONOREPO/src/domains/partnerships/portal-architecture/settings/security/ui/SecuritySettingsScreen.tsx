"use client";

import { useState } from "react";
import Link from "next/link";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Lock, Key, Shield, Smartphone, ChevronLeft, ChevronRight } from "lucide-react";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";
import ToggleRow from "@/domains/shared/ui/settings/ToggleRow";

const securityFeatures = [
  {
    id: "password",
    title: "Password Management",
    description: "Change your password and set security requirements",
    icon: Key,
    currentValue: "Strong password",
    status: "Updated 2 weeks ago"
  },
  {
    id: "2fa",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account",
    icon: Lock,
    currentValue: "Enabled",
    status: "Active"
  },
  {
    id: "sessions",
    title: "Active Sessions",
    description: "Manage devices and sessions logged into your account",
    icon: Smartphone,
    currentValue: "3 devices",
    status: "Review needed"
  }
];

const securityToggles = [
  {
    id: "loginAlerts",
    label: "Login Alerts",
    description: "Get notified when someone logs into your account",
    enabled: true
  },
  {
    id: "sessionTimeout",
    label: "Auto-logout",
    description: "Automatically log out after 30 minutes of inactivity",
    enabled: false
  }
];

export function SecuritySettingsScreen() {
  const [toggles, setToggles] = useState(
    Object.fromEntries(securityToggles.map(toggle => [toggle.id, toggle.enabled]))
  );

  const toggleSetting = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <style jsx global>{``}</style>
      <SettingsDetailLayout
        title=""
        description=""
        wrapContent={false}
        backHref={null}
        compactHeader
        hideHeader
        srTitle="Security Settings"
      >
        <div className="security-settings-scope space-y-4 pb-32 text-siso-text-primary">
          {/* Security Header Card */}
          <div className="relative min-h-[128px]">
            <Link
              href="/partners/settings"
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
              aria-label="Back to settings"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <HighlightCard
              color="orange"
              className="w-full pl-12 security-card"
              title="Security"
              description="Password, 2FA, and session management"
              hideDivider
              hideFooter
              titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
              descriptionClassName="text-xs"
              icon={<Lock className="h-5 w-5" />}
              metricValue=""
              metricLabel=""
              buttonText=""
              onButtonClick={() => {}}
            />
          </div>

          {/* Security Features */}
          <section className="space-y-5">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">Security Features</p>
              <p className="text-xs text-siso-text-muted">Manage authentication and protect your account</p>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              <ScrimList className="m-3" ariaLabel="Security features list">
                {securityFeatures.map(({ id, title, description, icon: Icon, currentValue }) => (
                  <ScrimList.Row key={id}>
                    <div className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-siso-text-primary">{title}</p>
                      <p className="text-xs text-siso-text-muted">{description}</p>
                      <p className="text-[11px] uppercase tracking-wide text-siso-orange/80">{currentValue}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-siso-text-muted" aria-hidden="true" />
                  </ScrimList.Row>
                ))}
              </ScrimList>
            </div>
          </section>

          {/* Security Preferences */}
          <section className="space-y-5">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">Security Preferences</p>
              <p className="text-xs text-siso-text-muted">Configure security alerts and behaviors</p>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              <ScrimList className="m-3" ariaLabel="Security preferences list">
                {securityToggles.map((toggle) => (
                  <ToggleRow
                    key={toggle.id}
                    id={toggle.id}
                    label={toggle.label}
                    description={toggle.description}
                    checked={toggles[toggle.id]}
                    onChange={toggleSetting}
                  />
                ))}
              </ScrimList>
            </div>
          </section>
        </div>
      </SettingsDetailLayout>
    </>
  );
}
