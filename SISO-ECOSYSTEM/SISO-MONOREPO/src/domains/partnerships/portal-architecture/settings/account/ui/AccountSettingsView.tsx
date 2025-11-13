"use client";

import { useState } from "react";
import Link from "next/link";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { SettingsGroupCallout } from "../../menu/SettingsGroupCallout";
import { IdCard, Edit3, ChevronLeft } from "lucide-react";
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
        srTitle="My Account"
      >
        <div className="account-settings-scope space-y-4 pb-32 text-siso-text-primary">
          {/* Account Header Card */}
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
              className="w-full pl-12 account-card"
              title="My Account"
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

        <section className="space-y-3">
          <SettingsGroupCallout
            icon={<IdCard className="h-4 w-4" />}
            title="Contact Details"
            subtitle="Keep your contact details up to date."
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
          <div className="space-y-1">
            <p className="text-base font-semibold text-siso-text-primary">Two-factor Authentication</p>
            <p className="text-xs text-siso-text-muted">Add an extra layer of security by enabling 2FA on your account.</p>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary px-4 py-5 text-sm text-siso-text-primary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            <p className="text-lg font-semibold text-siso-text-primary">Enable two-factor auth</p>
            <p className="text-sm text-siso-text-muted">Activate backup codes and time-based tokens so only you can access this workspace.</p>
          </div>

          <div className="divide-y divide-white/5 rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            {twoFactorActions.map((action) => (
              <div key={action.id} className="flex items-center gap-3 px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-siso-bg-tertiary/80 text-siso-orange">
                  <IdCard className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">{action.label}</p>
                  <p className="text-sm text-siso-text-primary">{action.description}</p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-siso-text-muted transition hover:border-siso-orange/70 hover:text-siso-orange"
                >
                  {action.ctaLabel}
                </button>
              </div>
            ))}
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
          </div>
        </div>
      </SettingsDetailLayout>
    </>
  );
}
