"use client";

import { useState } from "react";
import Link from "next/link";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { SettingsGroupCallout } from "../../menu/SettingsGroupCallout";
import { IdCard, Edit3, ChevronLeft, Mail, Phone, Shield, Users } from "lucide-react";
import { TwoFactorCards } from "./components/TwoFactorCards";
import { useAccountSettings } from "../application/useAccountSettings";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";

export function AccountSettingsView() {
  const { contactFields, twoFactorActions, hero } = useAccountSettings();

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
        srTitle="Account"
      >
        <div className="account-settings-scope space-y-4 pb-32 text-siso-text-primary">
          {/* Account Header Card */}
          <div className="relative min-h-[128px]">
            <Link
              href="/partners/settings"
              className="absolute top-1/2 left-3 z-10 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
              aria-label="Back to settings"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <HighlightCard
              color="orange"
              className="w-full pl-12 account-card"
              title="Account"
              description="Manage your partner identity, security, and workspace identity"
              icon={<IdCard className="h-5 w-5" />}
              metricValue=""
              metricLabel=""
              buttonText=""
              onButtonClick={() => {}}
              hideDivider
              hideFooter
              titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
              descriptionClassName="text-xs"
            />
          </div>

          {/* Original Account Content */}
          <div className="space-y-8 pb-32 text-siso-text-primary">
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
                <p className="text-base font-semibold">{hero.username}</p>
                <button
                  type="button"
                  className="rounded-full border border-siso-border/60 p-1 text-siso-text-muted transition hover:border-siso-orange hover:text-siso-orange"
                  aria-label="Edit profile handle"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-xs text-siso-text-muted">{hero.accountId}</p>
            </div>
          </div>
        </div>

        {/* Account Status Card */}
        <div className="rounded-3xl border border-siso-border/60 bg-gradient-to-br from-siso-bg-secondary/80 via-siso-bg-tertiary/70 to-siso-bg-secondary px-4 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="space-y-3">
            {/* Account Type & Tier */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">Account Type</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full bg-siso-orange/20 text-siso-orange text-xs font-medium">Partner</span>
                <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">Pro</span>
              </div>
            </div>

            {/* Verification Status */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">Verification</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3 text-emerald-400"/>
                  <span className="text-xs text-emerald-400">Email</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-siso-text-muted"/>
                  <span className="text-xs text-siso-text-muted">Phone</span>
                </div>
              </div>
            </div>

            {/* Member Duration */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">Member Since</span>
              <span className="text-xs text-siso-text-primary">Oct 2024 • 2 months</span>
            </div>
          </div>
        </div>

        <section className="space-y-3">
          <SettingsGroupCallout
            icon={<IdCard className="h-4 w-4" />}
            title="Contact Details"
            subtitle="Keep your contact details up to date."
            showChevron={false}
          >
            <ScrimList ariaLabel="Contact details list">
              {contactFields.map(({ id, label, value, icon: Icon, helper }) => (
              <ScrimList.Row key={id}>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-siso-bg-tertiary/80 text-siso-orange">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">{label}</p>
                  <p className="truncate text-sm font-medium text-siso-text-primary">{value}</p>
                  {helper ? <p className="text-[11px] uppercase tracking-wide text-siso-orange/80">{helper}</p> : null}
                </div>
                <button
                  type="button"
                  className="rounded-full border border-white/10 p-2 text-siso-text-muted transition hover:border-siso-orange/60 hover:text-siso-orange"
                  aria-label={`Edit ${label.toLowerCase()}`}
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
              </ScrimList.Row>
              ))}
            </ScrimList>
          </SettingsGroupCallout>
        </section>

        <section className="space-y-5">
          <SettingsGroupCallout
            icon={<IdCard className="h-4 w-4" />}
            title="Two-factor Authentication"
            subtitle="Add an extra layer of security to your account."
            showChevron={false}
          >
            <div className="pt-1">
              <TwoFactorCards showBackup={true} />
            </div>
          </SettingsGroupCallout>

          {/* Account Security Section */}
          <SettingsGroupCallout
            icon={<Shield className="h-4 w-4" />}
            title="Account Security"
            subtitle="Emergency actions and recovery options"
            showChevron={false}
          >
            <ScrimList ariaLabel="Account security actions">
              <ScrimList.Row>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                  <Shield className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">Freeze Account</p>
                  <p className="truncate text-sm font-medium text-siso-text-primary">Lock account temporarily</p>
                </div>
                <button className="rounded-full border border-red-500/60 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                  Freeze
                </button>
              </ScrimList.Row>
            </ScrimList>
          </SettingsGroupCallout>

          {/* Removed bottom promotional callout to avoid duplication with top hero */}
        </section>
          </div>
        </div>
      </SettingsDetailLayout>
    </>
  );
}
