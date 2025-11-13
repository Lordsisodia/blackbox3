"use client";

import Link from "next/link";
import { useState } from "react";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Plug, ChevronLeft, ExternalLink, Check, X } from "lucide-react";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";

const availableIntegrations = [
  {
    id: "notion",
    name: "Notion",
    description: "Sync tasks and documents with your Notion workspace",
    icon: "📝",
    category: "Productivity",
    connected: true,
    color: "text-gray-800"
  },
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Access files and documents from Google Drive",
    icon: "📁",
    category: "Storage",
    connected: false,
    color: "text-blue-600"
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get notifications and send messages to Slack channels",
    icon: "💬",
    category: "Communication",
    connected: true,
    color: "text-purple-600"
  },
  {
    id: "calendar",
    name: "Google Calendar",
    description: "Sync meetings and events with your calendar",
    icon: "📅",
    category: "Scheduling",
    connected: false,
    color: "text-green-600"
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Send templated notifications and receive partner replies",
    icon: "📲",
    category: "Messaging",
    connected: false,
    color: "text-emerald-500"
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Enable cash-outs and payout visibility",
    icon: "💳",
    category: "Payments",
    connected: false,
    color: "text-indigo-500"
  },
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect an EVM wallet for crypto payouts",
    icon: "🦊",
    category: "Crypto Wallets",
    connected: false,
    color: "text-orange-400"
  },
  {
    id: "phantom",
    name: "Phantom Wallet",
    description: "Connect a Solana wallet for crypto payouts",
    icon: "👻",
    category: "Crypto Wallets",
    connected: false,
    color: "text-violet-400"
  },
  {
    id: "github",
    name: "GitHub",
    description: "Link repositories and track development activity",
    icon: "🐙",
    category: "Development",
    connected: false,
    color: "text-gray-900"
  },
  {
    id: "figma",
    name: "Figma",
    description: "Access design files and prototypes",
    icon: "🎨",
    category: "Design",
    connected: false,
    color: "text-purple-500"
  }
];

export function IntegrationsSettingsScreen() {
  const [integrations, setIntegrations] = useState(availableIntegrations);
  const [filter, setFilter] = useState("all");

  const filteredIntegrations = filter === "all"
    ? integrations
    : integrations.filter(integration => integration.category.toLowerCase() === filter.toLowerCase());

  const toggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  const connectedCount = integrations.filter(i => i.connected).length;

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
        srTitle="Integrations Settings"
      >
        <div className="integrations-settings-scope space-y-4 pb-32 text-siso-text-primary">
          {/* Integrations Header Card */}
          <div className="relative min-h-[128px]">
            <Link
              href="/partners/settings"
              className="absolute top-1/2 left-3 z-10 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
              aria-label="Back to settings"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <HighlightCard
              color="green"
              className="w-full pl-12 integrations-card"
              title="Integrations"
              description="Connect your favorite tools and services"
              icon={<Plug className="h-5 w-5" />}
              metricValue={`${connectedCount}`}
              metricLabel="connected"
              buttonText=""
              onButtonClick={() => {}}
              hideDivider
              hideFooter
              titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
              descriptionClassName="text-xs"
            />
          </div>

          {/* Integrations Content */}
          <div className="space-y-8 pb-32 text-siso-text-primary">
            {/* Connection Overview */}
            <section className="space-y-5">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">Connection Overview</p>
                <p className="text-xs text-siso-text-muted">Manage your connected apps and services</p>
              </div>
              <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                <ScrimList className="m-3" divided={false} ariaLabel="Connection overview">
                  <div className="px-1 py-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-siso-text-primary">Connected Services</p>
                        <p className="text-xs text-siso-text-muted">Currently active integrations</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-400">{connectedCount}</p>
                        <p className="text-xs text-siso-text-muted">of {integrations.length} available</p>
                      </div>
                    </div>
                  </div>
                </ScrimList>
              </div>
            </section>

            {/* Category Filter */}
            <section className="space-y-5">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">Categories</p>
                <p className="text-xs text-siso-text-muted">Filter integrations by category</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["all", "productivity", "storage", "communication", "messaging", "scheduling", "payments", "crypto wallets", "development", "design"].map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFilter(category)}
                    className={`rounded-full px-3 py-1 text-xs border transition capitalize ${
                      filter === category
                        ? "border-emerald-400 text-emerald-400"
                        : "border-siso-border/60 text-siso-text-muted hover:text-siso-text-primary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>

            {/* Available Integrations */}
            <section className="space-y-5">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">Available Integrations</p>
                <p className="text-xs text-siso-text-muted">Connect apps to enhance your workflow</p>
              </div>
              <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                <ScrimList className="m-3" ariaLabel="Available integrations list">
                  {filteredIntegrations.map((integration) => (
                    <ScrimList.Row key={integration.id}>
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            integration.id === 'notion' ? '/logos/integrations/notion.svg' :
                            integration.id === 'google-drive' ? '/logos/integrations/google-drive.svg' :
                            integration.id === 'slack' ? '/logos/integrations/slack.svg' :
                            integration.id === 'calendar' ? '/logos/integrations/calendar-svgrepo-com.svg' :
                            integration.id === 'whatsapp' ? '/logos/integrations/whatsapp.svg' :
                            integration.id === 'stripe' ? '/logos/integrations/stripe.svg' :
                            integration.id === 'metamask' ? '/logos/integrations/MetaMask_Fox.svg' :
                            integration.id === 'phantom' ? '/logos/integrations/Phantom_idLwowjNJZ_0.svg' :
                            ''
                          }
                          alt=""
                          className="h-5 w-5 object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-siso-text-primary">{integration.name}</p>
                        <p className="text-xs text-siso-text-muted">{integration.description}</p>
                        <p className="text-[11px] uppercase tracking-wide text-emerald-400/80">
                          {integration.connected ? "Connected" : "Available"} • {integration.category}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleIntegration(integration.id)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                          integration.connected ? "bg-emerald-400/80" : "bg-siso-border/60"
                        }`}
                        role="switch"
                      aria-checked={integration.connected}
                      aria-label={`${integration.name} integration ${integration.connected ? 'connected' : 'available'}`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                            integration.connected ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </ScrimList.Row>
                  ))}
                </ScrimList>
              </div>
            </section>

            {/* Help Section */}
            <section className="space-y-5">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">Need Help?</p>
                <p className="text-xs text-siso-text-muted">Learn more about integrations</p>
              </div>
              <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                <ScrimList className="m-3" divided={false} ariaLabel="Integrations help">
                  <ScrimList.Row className="px-3 py-3">
                    <div className="h-10 w-10 rounded-xl bg-white/5 text-emerald-400 flex items-center justify-center">
                      <ExternalLink className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-siso-text-primary">Integration Documentation</p>
                      <p className="text-xs text-siso-text-muted">Detailed guides and troubleshooting</p>
                    </div>
                  <ChevronLeft className="h-4 w-4 text-siso-text-muted rotate-180" aria-hidden="true" />
                  </ScrimList.Row>
                </ScrimList>
              </div>
            </section>
          </div>
        </div>
      </SettingsDetailLayout>
    </>
  );
}
