import { ArrowDownRight, ArrowUpRight, Clock, Link, ShieldCheck, Wallet } from "lucide-react";
import {
  walletActions,
  walletBalanceSnapshot,
  walletConnections,
  walletPendingTransfers,
  walletSummaryMetrics,
  walletTransactions,
  type WalletConnectionStatus,
  type WalletPendingTransfer,
} from "./wallet-fixtures";
import { cn } from "@/domains/shared/utils/cn";
import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";
import SectionHeader from "@/domains/shared/ui/settings/SectionHeader";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";
import { HighlightCard } from "@/components/ui/card-5-static";

const trendAccent: Record<"up" | "down", string> = {
  up: "text-emerald-300",
  down: "text-rose-300",
};

const pendingAccent: Record<WalletPendingTransfer["status"], string> = {
  awaiting_clearance: "text-amber-300",
  scheduled: "text-emerald-300",
  needs_review: "text-rose-300",
};

const connectionAccent: Record<WalletConnectionStatus, string> = {
  connected: "text-emerald-300",
  pending: "text-amber-300",
  action_required: "text-rose-300",
};

export function WalletPanel() {
  return (
    <SettingsDetailLayout
      wrapContent={false}
      compactHeader
      hideHeader
      srTitle="Wallet"
    >
      <div className="space-y-5">
        {/* Orange hero card (consistent across settings) */}
        <div className="relative min-h-[112px]">
          <HighlightCard
            color="orange"
            className="w-full pl-10"
            title="Wallet"
            description="Connect payout rails, monitor balances, and trigger withdrawals."
            icon={<Wallet className="h-5 w-5" />}
            metricValue=""
            metricLabel=""
            buttonText=""
            onButtonClick={() => {}}
            hideDivider
            hideFooter
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {walletSummaryMetrics.map((metric) => (
            <article
              key={metric.id}
            className="rounded-3xl border border-siso-border bg-siso-bg-secondary/80 p-4 shadow-inner shadow-black/10"
          >
            <div className="text-[11px] uppercase tracking-wide text-siso-text-muted">{metric.label}</div>
            <p className="mt-1 text-xl font-semibold text-siso-text-primary">{metric.amount}</p>
            <p className="text-xs text-siso-text-muted">{metric.descriptor}</p>
            {metric.trendLabel && metric.trendDirection && (
              <span className={cn("mt-2 flex items-center gap-1 text-xs font-medium", trendAccent[metric.trendDirection])}>
                {metric.trendDirection === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {metric.trendLabel}
              </span>
            )}
          </article>
        ))}
        </div>

        <article className="rounded-3xl border border-siso-border bg-gradient-to-br from-siso-bg-secondary to-siso-bg-tertiary p-4">
          <div className="flex items-center gap-3 text-sm text-siso-text-muted">
            <Wallet className="h-4 w-4 text-siso-orange" />
            <span>In-app balance includes holds and reward conversions.</span>
          </div>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-2xl font-semibold text-siso-text-primary">{walletBalanceSnapshot.available}</p>
            <p className="text-xs text-siso-text-muted">Available</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-siso-text-primary">{walletBalanceSnapshot.pending}</p>
            <p className="text-xs text-siso-text-muted">Pending</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-siso-text-primary">{walletBalanceSnapshot.rewardPoints}</p>
            <p className="text-xs text-siso-text-muted">Reward bank</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-2xl bg-siso-bg-primary/60 px-3 py-2 text-xs text-siso-text-muted">
          <span>Next auto-payout {walletBalanceSnapshot.autopayout.date}</span>
          <span className="font-semibold text-siso-text-primary">{walletBalanceSnapshot.autopayout.amount}</span>
        </div>
        </article>

        {/* Cash-out controls (double callout) */}
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          <SectionHeader icon={<Clock className="h-5 w-5" />} title="Cash-out controls" subtitle="Trigger manual withdrawals or automate thresholds." />
          <ScrimList className="mt-3" ariaLabel="Cash-out actions">
            {walletActions.map((action) => (
              <ScrimList.Row key={action.id}>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-siso-text-primary">{action.title}</p>
                  <p className="text-xs text-siso-text-muted">{action.description}</p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-siso-border px-3 py-1 text-xs font-semibold text-siso-text-primary hover:border-siso-orange hover:text-siso-orange"
                >
                  {action.ctaLabel}
                </button>
              </ScrimList.Row>
            ))}
          </ScrimList>
        </div>

        {/* Connected payout rails (double callout) */}
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          <SectionHeader icon={<Link className="h-5 w-5" />} title="Connected payout rails" subtitle="Stripe, banks, and wallets you can cash out to." />
          <ScrimList className="mt-3" ariaLabel="Connected payout rails">
            {walletConnections.map((connection) => (
              <ScrimList.Row key={connection.id}>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-siso-text-primary">{connection.provider}</p>
                  <p className="text-xs text-siso-text-muted">{connection.descriptor}</p>
                  {connection.lastSync && <p className="text-[11px] text-siso-text-muted/80">{connection.lastSync}</p>}
                </div>
                <div className="text-right text-xs">
                  {connection.badge && (
                    <div className="mb-1 inline-flex rounded-full border border-siso-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-siso-text-muted">
                      {connection.badge}
                    </div>
                  )}
                  <span className={cn("font-semibold", connectionAccent[connection.status])}>
                    {connection.status === "connected" && "Connected"}
                    {connection.status === "pending" && "Pending"}
                    {connection.status === "action_required" && "Action required"}
                  </span>
                </div>
              </ScrimList.Row>
            ))}
          </ScrimList>
        </div>

        {/* Pending & holds (double callout) */}
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          <SectionHeader icon={<ShieldCheck className="h-5 w-5" />} title="Pending & holds" subtitle="See what still needs clearance." />
          <ScrimList className="mt-3" ariaLabel="Pending transfers">
            {walletPendingTransfers.map((transfer) => (
              <ScrimList.Row key={transfer.id}>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-siso-text-primary">{transfer.label}</p>
                  <p className="text-xs text-siso-text-muted">{transfer.eta}</p>
                  {transfer.note && <p className="text-[11px] text-siso-text-muted/85">{transfer.note}</p>}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-siso-text-primary">{transfer.amount}</p>
                  <p className={cn("text-xs font-semibold", pendingAccent[transfer.status])}>
                    {transfer.status === "awaiting_clearance" && "Awaiting clearance"}
                    {transfer.status === "scheduled" && "Scheduled"}
                    {transfer.status === "needs_review" && "Needs review"}
                  </p>
                </div>
              </ScrimList.Row>
            ))}
          </ScrimList>
        </div>

        {/* Recent activity (double callout) */}
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          <SectionHeader icon={<Wallet className="h-5 w-5" />} title="Recent activity" subtitle="All wallet debits & credits" />
          <ScrimList className="mt-3" ariaLabel="Recent transactions">
            {walletTransactions.slice(0, 4).map((transaction) => (
              <ScrimList.Row key={transaction.id}>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-siso-text-primary">{transaction.label}</p>
                  <p className="text-xs text-siso-text-muted">{transaction.reference} · {transaction.channel}</p>
                  <p className="text-[11px] text-siso-text-muted/80">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className={cn("font-semibold", transaction.direction === "in" ? "text-emerald-300" : "text-rose-300")}>{transaction.amount}</p>
                  <p className="text-xs text-siso-text-muted">{transaction.status}</p>
                </div>
              </ScrimList.Row>
            ))}
          </ScrimList>
          <div className="mt-3 flex justify-end">
            <button type="button" className="text-xs font-semibold text-siso-orange">View ledger</button>
          </div>
        </div>
      </div>
    </SettingsDetailLayout>
  );
}
