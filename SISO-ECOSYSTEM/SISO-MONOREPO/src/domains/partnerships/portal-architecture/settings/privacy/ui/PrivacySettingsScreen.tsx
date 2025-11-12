"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Download, Trash2, Eye, EyeOff, Users, Database, ChevronRight, ChevronLeft } from "lucide-react";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5";

const privacyControls = [
  {
    id: "profileVisibility",
    label: "Profile Visibility",
    description: "Control who can see your profile information",
    icon: Users,
    currentValue: "Partners only",
    status: "Private"
  },
  {
    id: "dataCollection",
    label: "Data Collection",
    description: "Manage how we collect and use your data",
    icon: Database,
    currentValue: "Essential only",
    status: "Limited"
  },
  {
    id: "activityStatus",
    label: "Activity Status",
    description: "Show when you're active to partners",
    icon: Eye,
    currentValue: "Hidden",
    status: "Private"
  }
];

const privacyToggles = [
  {
    id: "analyticsTracking",
    label: "Analytics Tracking",
    description: "Help us improve the platform with usage analytics",
    enabled: false
  },
  {
    id: "marketingEmails",
    label: "Marketing Communications",
    description: "Receive updates about new features and opportunities",
    enabled: true
  },
  {
    id: "partnerDiscovery",
    label: "Partner Discovery",
    description: "Allow partners to find and connect with you",
    enabled: true
  }
];

export function PrivacySettingsScreen() {
  const [toggles, setToggles] = useState(
    Object.fromEntries(privacyToggles.map(toggle => [toggle.id, toggle.enabled]))
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
        .privacy-card [style*="background-image"] > div > div > div.my-4.h-px.w-full.bg-white\/20 {
          display: none !important;
        }
        .privacy-card [style*="background-image"] > div > div > div.flex.items-end.justify-between {
          display: none !important;
        }
        .privacy-card [style*="background-image"] > div > div > div.flex.h-full.flex-col.justify-between {
          justify-content: flex-start !important;
        }
        /* Alternative targeting */
        .privacy-card div[class*="my-4"] {
          display: none !important;
        }
        .privacy-card div[class*="items-end"] {
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
        {/* Privacy Header Card - moved to top as title */}
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
            className="w-full pl-12 privacy-card"
            title="Privacy"
            description="Control your data, visibility, and communication preferences"
            icon={<Shield className="h-5 w-5" />}
            metricValue=""
            metricLabel=""
            buttonText=""
            onButtonClick={() => {}}
          />
        </div>

        {/* Privacy Controls */}
        <section className="space-y-5">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">Privacy Controls</p>
            <p className="text-xs text-siso-text-muted">Manage your visibility and data sharing preferences.</p>
          </div>

          <div className="divide-y divide-white/5 rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            {privacyControls.map(({ id, label, description, icon: Icon, currentValue, status }) => (
              <div key={id} className="flex items-center gap-3 px-4 py-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-siso-text-primary">{label}</p>
                  <p className="text-xs text-siso-text-muted">{description}</p>
                  <p className="text-[11px] uppercase tracking-wide text-siso-orange/80">{currentValue}</p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-white/10 p-2 text-siso-text-muted transition hover:border-siso-orange/60 hover:text-siso-orange"
                  aria-label={`Configure ${label.toLowerCase()}`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy Preferences */}
        <section className="space-y-5">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">Privacy Preferences</p>
            <p className="text-xs text-siso-text-muted">Fine-tune your privacy and communication settings.</p>
          </div>

          <div className="divide-y divide-white/5 rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            {privacyToggles.map((toggle) => (
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

        {/* Data Management */}
        <section className="space-y-5">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">Data Management</p>
            <p className="text-xs text-siso-text-muted">Export your data or manage your account.</p>
          </div>

          <div className="space-y-3">
            <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-6 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                  <Download className="h-8 w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-siso-text-primary">Export Your Data</h3>
                  <p className="text-sm text-siso-text-muted mb-4">Download a copy of all your personal data and account information.</p>
                  <button
                    type="button"
                    className="rounded-full border border-siso-border/50 px-4 py-2 text-sm font-medium text-siso-text-muted transition hover:border-siso-orange/60 hover:text-siso-orange"
                  >
                    Request Export
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[26px] border border-red-500/20 bg-red-500/5 p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                  <Trash2 className="h-8 w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-red-500">Delete Account</h3>
                  <p className="text-sm text-siso-text-muted mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  <button
                    type="button"
                    className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/20"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SettingsDetailLayout>
    </>
  );
}
