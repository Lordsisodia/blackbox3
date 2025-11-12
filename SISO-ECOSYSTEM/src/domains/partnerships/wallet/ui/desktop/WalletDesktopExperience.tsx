"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/domains/shared/utils/cn";
import {
  walletActions,
  walletBalanceSnapshot,
  walletConnections,
  walletPendingTransfers,
  walletSummaryMetrics,
  walletTransactions,
  type WalletConnectionStatus,
} from "../fixtures";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Download,
  Link,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const connectionBadge: Record<WalletConnectionStatus, string> = {
  connected: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  pending: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  action_required: "border-rose-400/30 bg-rose-400/10 text-rose-100",
};

export function WalletDesktopExperience() {
  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">Financial Control</p>
          <h1 className="text-3xl font-bold text-siso-text-primary">Wallet &amp; Payouts</h1>
          <p className="text-sm text-siso-text-muted">
            Centralize partner balances, connect payout rails, and keep a clear audit trail of every withdrawal.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="border-siso-border text-siso-text-primary">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button className="bg-siso-orange text-black hover:bg-siso-orange/90">
            <Wallet className="mr-2 h-4 w-4" /> Request Withdrawal
          </Button>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {walletSummaryMetrics.map((metric) => (
              <Card key={metric.id} className="border-siso-border/60 bg-siso-bg-secondary/80 text-siso-text-primary">
                <CardHeader className="space-y-2 pb-2">
                  <CardTitle className="text-sm font-medium text-siso-text-muted">{metric.label}</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold">{metric.amount}</span>
                    {metric.trendLabel && metric.trendDirection && (
                      <span
                        className={cn(
                          "inline-flex items-center text-xs font-semibold",
                          metric.trendDirection === "up" ? "text-emerald-300" : "text-rose-300",
                        )}
                      >
                        {metric.trendDirection === "up" ? (
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-3 w-3" />
                        )}
                        {metric.trendLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-siso-text-muted">{metric.descriptor}</p>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-fit bg-siso-bg-tertiary/80 text-siso-text-muted">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">Ledger</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card className="border-siso-border/60 bg-siso-bg-secondary/90">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-siso-text-primary">Balance breakdown</CardTitle>
                  <p className="text-sm text-siso-text-muted">
                    Includes reward conversions and any compliance holds.
                  </p>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-siso-border/70 bg-siso-bg-tertiary/40 p-4">
                      <p className="text-xs text-siso-text-muted">Available</p>
                      <p className="text-3xl font-semibold text-siso-text-primary">{walletBalanceSnapshot.available}</p>
                      <p className="text-xs text-siso-text-muted">Last payout {walletBalanceSnapshot.lastPayout}</p>
                    </div>
                    <div className="rounded-2xl border border-siso-border/70 bg-siso-bg-tertiary/40 p-4">
                      <p className="text-xs text-siso-text-muted">Pending clearance</p>
                      <p className="text-2xl font-semibold text-siso-text-primary">{walletBalanceSnapshot.pending}</p>
                      <p className="text-xs text-siso-text-muted">On hold {walletBalanceSnapshot.onHold}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-siso-border/70 bg-gradient-to-br from-siso-bg-primary to-siso-bg-secondary p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-siso-text-primary">Next auto-payout</p>
                        <Clock className="h-4 w-4 text-siso-text-muted" />
                      </div>
                      <p className="text-3xl font-semibold text-siso-text-primary">
                        {walletBalanceSnapshot.autopayout.amount}
                      </p>
                      <p className="text-xs text-siso-text-muted">Scheduled {walletBalanceSnapshot.autopayout.date}</p>
                    </div>
                    <div className="rounded-2xl border border-siso-border/70 bg-siso-bg-tertiary/40 p-4">
                      <p className="text-xs text-siso-text-muted">Reward bank</p>
                      <p className="text-2xl font-semibold text-siso-text-primary">{walletBalanceSnapshot.rewardPoints}</p>
                      <p className="text-xs text-siso-text-muted">Convert to GBP or tokens</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <Card className="border-siso-border/60 bg-siso-bg-secondary/90">
                <CardHeader className="flex items-center justify-between pb-3">
                  <CardTitle className="text-base font-semibold text-siso-text-primary">Wallet ledger</CardTitle>
                  <Button variant="ghost" className="text-xs text-siso-text-muted">
                    Refresh
                  </Button>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs uppercase tracking-wide text-siso-text-muted">
                      <tr>
                        <th className="pb-2 pr-4 font-medium">Event</th>
                        <th className="pb-2 pr-4 font-medium">Channel</th>
                        <th className="pb-2 pr-4 font-medium">Status</th>
                        <th className="pb-2 text-right font-medium">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-siso-border/60 text-siso-text-primary">
                      {walletTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="py-3 pr-4">
                            <p className="font-semibold">{transaction.label}</p>
                            <p className="text-xs text-siso-text-muted">
                              {transaction.reference} · {transaction.date}
                            </p>
                          </td>
                          <td className="py-3 pr-4 text-sm text-siso-text-muted">{transaction.channel}</td>
                          <td className="py-3 pr-4">
                            <Badge
                              variant="outline"
                              className={cn(
                                "border-siso-border/60 px-2 py-0.5 text-[11px] font-semibold capitalize",
                                transaction.status === "paid" && "text-emerald-300",
                                transaction.status === "pending" && "text-amber-300",
                                transaction.status === "failed" && "text-rose-300",
                              )}
                            >
                              {transaction.status}
                            </Badge>
                          </td>
                          <td
                            className={cn(
                              "py-3 text-right text-base font-semibold",
                              transaction.direction === "in" ? "text-emerald-300" : "text-rose-300",
                            )}
                          >
                            {transaction.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-6">
          <Card className="border-siso-border/60 bg-siso-bg-secondary/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-siso-text-primary">Connected payout rails</CardTitle>
              <p className="text-xs text-siso-text-muted">Stripe, banks, wallets, and fintech partners.</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {walletConnections.map((connection) => (
                <div
                  key={connection.id}
                  className="rounded-2xl border border-siso-border/60 bg-siso-bg-tertiary/40 p-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-siso-text-primary">{connection.provider}</p>
                      <p className="text-xs text-siso-text-muted">{connection.descriptor}</p>
                      {connection.lastSync && (
                        <p className="text-[11px] text-siso-text-muted/80">{connection.lastSync}</p>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "border px-3 py-1 text-[10px] font-semibold uppercase tracking-wide",
                        connectionBadge[connection.status],
                      )}
                    >
                      {connection.status === "connected" && "Connected"}
                      {connection.status === "pending" && "Pending"}
                      {connection.status === "action_required" && "Action"}
                    </Badge>
                  </div>
                  {connection.badge && (
                    <p className="mt-2 text-[11px] uppercase tracking-wide text-siso-text-muted">
                      {connection.badge}
                    </p>
                  )}
                </div>
              ))}
              <Button variant="ghost" className="w-full text-siso-orange">
                <Link className="mr-2 h-4 w-4" /> Add payout method
              </Button>
            </CardContent>
          </Card>

          <Card className="border-siso-border/60 bg-siso-bg-secondary/80">
            <CardHeader className="flex items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold text-siso-text-primary">Pending &amp; holds</CardTitle>
              <ShieldCheck className="h-4 w-4 text-siso-text-muted" />
            </CardHeader>
            <CardContent className="space-y-3">
              {walletPendingTransfers.map((transfer) => (
                <div key={transfer.id} className="rounded-2xl border border-siso-border/60 bg-siso-bg-tertiary/30 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-siso-text-primary">{transfer.label}</p>
                      <p className="text-xs text-siso-text-muted">{transfer.eta}</p>
                      {transfer.note && <p className="text-[11px] text-siso-text-muted/90">{transfer.note}</p>}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        transfer.status === "awaiting_clearance" && "text-amber-300",
                        transfer.status === "scheduled" && "text-emerald-300",
                        transfer.status === "needs_review" && "text-rose-300",
                      )}
                    >
                      {transfer.amount}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-siso-border/60 bg-siso-bg-secondary/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-siso-text-primary">Automation playbook</CardTitle>
              <p className="text-xs text-siso-text-muted">Define payout thresholds &amp; manual overrides.</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {walletActions.map((action) => (
                <div key={action.id} className="rounded-2xl border border-siso-border/60 bg-siso-bg-tertiary/30 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-siso-text-primary">{action.title}</p>
                      <p className="text-xs text-siso-text-muted">{action.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-siso-border text-xs font-semibold text-siso-text-primary"
                    >
                      {action.ctaLabel}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  );
}
