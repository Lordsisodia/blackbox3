"use client";

import { useState } from "react";
import Link from "next/link";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5";
import { Lock, Key, Shield, Smartphone, ChevronLeft, ChevronRight } from "lucide-react";

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
      <style jsx global>{`
        div[aria-hidden="true"] {
          display: none !important;
        }
        /* Match top padding to side padding */
        section[class*="flex flex-1 flex-col gap-4 px-4 pt-8"] {
          padding-top: 1rem !important;
        }
        /* Hide HighlightCard divider and bottom section when empty */
        .security-card [style*="background-image"] > div > div > div.my-4.h-px.w-full.bg-white\/20 {
          display: none !important;
        }
        .security-card [style*="background-image"] > div > div > div.flex.items-end.justify-between {
          display: none !important;
        }
        .security-card [style*="background-image"] > div > div > div.flex.h-full.flex-col.justify-between {
          justify-content: flex-start !important;
        }
        /* Alternative targeting */
        .security-card div[class*="my-4"] {
          display: none !important;
        }
        .security-card div[class*="items-end"] {
          display: none !important;
        }
      `}</style>
      <SettingsDetailLayout
        title=""
        description=""
        wrapContent={false}
        backHref={null}
      >
        <div className="space-y-4 pb-32 text-siso-text-primary">
          {/* Security Header Card */}
          <div className="relative">
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

            <div className="divide-y divide-white/5 rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              {securityFeatures.map(({ id, title, description, icon: Icon, currentValue, status }) => (
                <div key={id} className="flex items-center gap-3 px-4 py-4">
                  <div className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-siso-text-primary">{title}</p>
                    <p className="text-xs text-siso-text-muted">{description}</p>
                    <p className="text-[11px] uppercase tracking-wide text-siso-orange/80">{currentValue}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-siso-text-muted" />
                </div>
              ))}
            </div>
          </section>

          {/* Security Preferences */}
          <section className="space-y-5">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">Security Preferences</p>
              <p className="text-xs text-siso-text-muted">Configure security alerts and behaviors</p>
            </div>

            <div className="divide-y divide-white/5 rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              {securityToggles.map((toggle) => (
                <div key={toggle.id} className="flex items-start justify-between gap-4 px-4 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-siso-text-primary">{toggle.label}</p>
                    <p className="text-xs text-siso-text-muted">{toggle.description}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={toggles[toggle.id]}
                    onClick={() => toggleSetting(toggle.id)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                      toggles[toggle.id] ? "bg-siso-orange/80" : "bg-siso-border/60"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        toggles[toggle.id] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </SettingsDetailLayout>
    </>
  );
}
