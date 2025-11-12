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
    <section className="flex flex-1 flex-col gap-5 px-4 py-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">Financial</p>
        <h2 className="text-2xl font-semibold text-siso-text-primary">Partner Wallet</h2>
        <p className="text-sm text-siso-text-muted">
          Connect payout rails, monitor balances, and trigger withdrawals without leaving the quick launcher.
        </p>
      </header>

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

      <article className="space-y-3 rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-siso-text-primary">Cash-out controls</p>
            <p className="text-xs text-siso-text-muted">Trigger manual withdrawals or automate thresholds.</p>
          </div>
          <Clock className="h-4 w-4 text-siso-text-muted" />
        </header>
        {walletActions.map((action) => (
          <div key={action.id} className="rounded-2xl border border-siso-border/80 bg-siso-bg-tertiary/40 p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-siso-text-primary">{action.title}</p>
                <p className="text-xs text-siso-text-muted">{action.description}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-siso-border px-3 py-1 text-xs font-semibold text-siso-text-primary hover:border-siso-orange hover:text-siso-orange"
              >
                {action.ctaLabel}
              </button>
            </div>
          </div>
        ))}
      </article>

      <article className="space-y-3 rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-siso-text-primary">Connected payout rails</p>
            <p className="text-xs text-siso-text-muted">Stripe, banks, and wallets you can cash out to.</p>
          </div>
          <Link className="h-4 w-4 text-siso-text-muted" />
        </header>
        <ul className="space-y-2">
          {walletConnections.map((connection) => (
            <li
              key={connection.id}
              className="flex items-center justify-between rounded-2xl border border-siso-border/80 bg-siso-bg-tertiary/30 px-3 py-2"
            >
              <div>
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
            </li>
          ))}
        </ul>
      </article>

      <article className="space-y-3 rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-siso-text-primary">Pending &amp; holds</p>
            <p className="text-xs text-siso-text-muted">See what still needs clearance.</p>
          </div>
          <ShieldCheck className="h-4 w-4 text-siso-text-muted" />
        </header>
        <ul className="space-y-2">
          {walletPendingTransfers.map((transfer) => (
            <li
              key={transfer.id}
              className="flex items-center justify-between rounded-2xl border border-siso-border/70 bg-siso-bg-tertiary/20 px-3 py-2"
            >
              <div>
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
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
        <header className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-siso-text-primary">Recent activity</p>
            <p className="text-xs text-siso-text-muted">All wallet debits &amp; credits</p>
          </div>
          <button type="button" className="text-xs font-semibold text-siso-orange">
            View ledger
          </button>
        </header>
        <ul className="space-y-2">
          {walletTransactions.slice(0, 4).map((transaction) => (
            <li key={transaction.id} className="flex items-center justify-between rounded-2xl bg-siso-bg-tertiary/30 px-3 py-2">
              <div>
                <p className="text-sm font-semibold text-siso-text-primary">{transaction.label}</p>
                <p className="text-xs text-siso-text-muted">
                  {transaction.reference} · {transaction.channel}
                </p>
                <p className="text-[11px] text-siso-text-muted/80">{transaction.date}</p>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    "font-semibold",
                    transaction.direction === "in" ? "text-emerald-300" : "text-rose-300",
                  )}
                >
                  {transaction.amount}
                </p>
                <p className="text-xs text-siso-text-muted">{transaction.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
