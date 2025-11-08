"use client";

import { ElectricCard } from "@/components/ui/electric-card";
import { HighlightCard } from "@/components/ui/card-5";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { IdCard, AtSign, Mail, Phone, KeyRound, Edit3, List, LockKeyhole } from "lucide-react";

const accountFields = [
  { id: "username", label: "Username", value: "SISOagency", icon: AtSign, helper: "@SISOagency" },
  { id: "email", label: "Email address", value: "sam.geracitano19@gmail.com", icon: Mail, helper: "Unverified" },
  { id: "phone", label: "Phone number", value: "Not set", icon: Phone },
  { id: "password", label: "Password", value: "••••••••", icon: KeyRound },
] as const;

export function AccountSettingsScreen() {
  return (
    <SettingsDetailLayout
      title="My Account"
      description="Manage your partner identity, security, and workspace identity."
      icon={<IdCard className="h-5 w-5 text-siso-orange" />}
      wrapContent={false}
    >
      <ElectricCard frameOnly className="w-full" contentClassName="space-y-8 pb-32 text-siso-text-primary">
          <div className="rounded-3xl border border-siso-border/60 bg-gradient-to-br from-siso-bg-secondary/80 via-siso-bg-tertiary/70 to-siso-bg-secondary px-4 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-siso-bg-tertiary text-lg font-semibold">SA</div>
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-siso-orange text-xs text-siso-bg-primary">
                  <IdCard className="h-3 w-3" />
                </span>
              </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold">@SISOagency</p>
                <button type="button" className="rounded-full border border-siso-border/60 p-1 text-siso-text-muted transition hover:border-siso-orange hover:text-siso-orange" aria-label="Edit profile handle">
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-xs text-siso-text-muted">01JV0EY9FHYKJ08PNC5BMHTJBT</p>
            </div>
          </div>
        </div>

        <section className="space-y-3">
          <ElectricCard frameOnly
            className="w-full"
            width="100%"
            aspectRatio="auto"
            badge="Identity"
            title="Account Information"
            contentClassName="space-y-3"
          >
            <p className="text-xs text-siso-text-muted">Keep your contact details up to date.</p>
            <div className="divide-y divide-white/5 rounded-3xl border border-[#f6b75e]/60 bg-siso-bg-secondary/80">
              {accountFields.map(({ id, label, value, icon: Icon, helper }) => (
                <div key={id} className="flex items-center gap-3 px-4 py-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-siso-bg-tertiary/80 text-siso-orange">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">{label}</p>
                    <p className="truncate text-sm font-medium text-siso-text-primary">{value}</p>
                    {helper ? <p className="text-[11px] uppercase tracking-wide text-siso-orange/80">{helper}</p> : null}
                  </div>
                  <button type="button" className="rounded-full border border-white/10 p-2 text-siso-text-muted transition hover:border-siso-orange/60 hover:text-siso-orange" aria-label={`Edit ${label.toLowerCase()}`}>
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </ElectricCard>
        </section>

        <section className="space-y-5">
          <div className="space-y-1">
            <p className="text-base font-semibold text-siso-text-primary">Two-factor Authentication</p>
            <p className="text-xs text-siso-text-muted">Add an extra layer of security by enabling 2FA on your account.</p>
          </div>

          <div className="rounded-3xl border border-[#f6b75e]/60 bg-siso-bg-secondary/80 px-4 py-5 text-sm text-siso-text-primary">
            <p className="text-lg font-semibold text-siso-text-primary">Enable two-factor auth</p>
            <p className="text-sm text-siso-text-muted">Activate backup codes and time-based tokens so only you can access this workspace.</p>
          </div>

          <div className="divide-y divide-white/5 rounded-3xl border border-[#f6b75e]/60 bg-siso-bg-secondary/80">
            <div className="flex items-center gap-3 px-4 py-4">
              <List className="h-4 w-4 text-siso-orange" />
              <div className="flex-1 space-y-1">
                <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">Generate backup codes</p>
                <p className="text-sm text-siso-text-primary">Get ready to use 2FA by setting a backup method.</p>
              </div>
              <button type="button" className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-siso-text-muted transition hover:border-siso-orange/70 hover:text-siso-orange">
                Setup
              </button>
            </div>
            <div className="flex items-center gap-3 px-4 py-4">
              <LockKeyhole className="h-4 w-4 text-siso-orange" />
              <div className="flex-1 space-y-1">
                <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">Add authenticator</p>
                <p className="text-sm text-siso-text-primary">Set up time-based one-time password (TOTP).</p>
              </div>
              <button type="button" className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-siso-text-muted transition hover:border-siso-orange/70 hover:text-siso-orange">
                Connect
              </button>
            </div>
          </div>

          <HighlightCard
            color="orange"
            className="w-full"
            title="Ready for a profile glow-up?"
            description="Update your avatar, status, and hero copy so partners always see the latest version of you."
            metricValue="Profile"
            metricLabel="/partners/settings/profile"
            buttonText="Go to profile"
            icon={<IdCard className="h-5 w-5" />}
            onButtonClick={() => (window.location.href = "/partners/settings/profile")}
          />
        </section>
      </ElectricCard>
    </SettingsDetailLayout>
  );
}
