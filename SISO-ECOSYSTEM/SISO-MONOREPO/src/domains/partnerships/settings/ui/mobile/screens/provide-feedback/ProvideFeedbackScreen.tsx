"use client";

import { useState } from "react";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { MessageSquare, ArrowBigUp } from "lucide-react";
import { cn } from "@/domains/shared/utils/cn";

const feedbackArchive = [
  {
    id: "notifs",
    title: "Mute individual chat threads",
    description: "Let me pause pings from one partner but keep others live.",
    status: "Planned",
    votes: 42,
    tags: ["Messaging"],
  },
  {
    id: "wallet",
    title: "Payout preview",
    description: "Would love to see pending commission per client before payday.",
    status: "In review",
    votes: 31,
    tags: ["Wallet"],
  },
  {
    id: "mobile",
    title: "Offline mode",
    description: "Cache playbooks so I can keep working on flights.",
    status: "Researching",
    votes: 24,
    tags: ["Mobile"],
  },
];

export function ProvideFeedbackScreen() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("Messaging");
  const [email, setEmail] = useState("");

  return (
    <SettingsDetailLayout
      title="Provide Feedback"
      description="Send ideas, issues, and kudos straight to the product team."
      icon={<MessageSquare className="h-6 w-6 text-siso-orange" />}
    >
      <section className="space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-siso-text-muted">
            <span>Top requests</span>
            <span className="text-[11px] tracking-[0.25em] text-siso-text-primary">Upvote ideas</span>
          </div>
          <ul className="space-y-3">
            {feedbackArchive.map((item) => (
              <li key={item.id} className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/70 p-3 shadow-[0_18px_35px_rgba(0,0,0,0.35)]">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    className="flex flex-col items-center rounded-2xl border border-siso-border/70 px-3 py-2 text-xs font-semibold text-siso-text-primary hover:border-siso-orange"
                  >
                    <ArrowBigUp className="h-4 w-4" />
                    {item.votes}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold tracking-[0.05em] text-siso-text-primary">{item.title}</p>
                      <span className="rounded-full border border-siso-orange/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-siso-orange">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-siso-text-muted">{item.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-siso-text-muted">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-siso-border/60 px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form className="space-y-3 rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/70 p-4 shadow-[0_18px_35px_rgba(0,0,0,0.35)]">
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-siso-text-muted">Category</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {["Messaging", "Wallet", "Mobile", "Design"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCategory(option)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-[11px] tracking-[0.2em]",
                    category === option
                      ? "border-siso-orange text-siso-orange"
                      : "border-siso-border/60 text-siso-text-muted",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-siso-text-muted">Idea or bug</label>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
              placeholder="Share context, steps to reproduce, or desired outcome."
              className="mt-1 w-full rounded-2xl border border-siso-border/60 bg-siso-bg-primary px-3 py-2 text-sm text-siso-text-primary placeholder:text-siso-text-muted focus:border-siso-orange focus:outline-none"
            />
            <div className="text-right text-[11px] text-siso-text-muted">{message.length}/400 characters</div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-siso-text-muted">Contact (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@studio.com"
              className="mt-1 w-full rounded-2xl border border-siso-border/60 bg-siso-bg-primary px-3 py-2 text-sm text-siso-text-primary placeholder:text-siso-text-muted focus:border-siso-orange focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl border border-siso-orange bg-siso-orange/20 px-4 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-siso-orange transition hover:bg-siso-orange/30"
          >
            Submit feedback
          </button>
        </form>
      </section>
    </SettingsDetailLayout>
  );
}
