import type { ConversationMessage } from "../../fixtures/conversation-fixtures";
import { cn } from "@/domains/shared/utils/cn";

interface ConversationTimelineProps {
  messages: ConversationMessage[];
}

export function ConversationTimeline({ messages }: ConversationTimelineProps) {
  return (
    <div className="flex-1 space-y-2.5 overflow-y-auto pr-0" style={{ paddingBottom: 16 }}>
      {messages.map((message) => {
        const isOutgoing = message.direction === "outgoing";
        return (
          <div key={message.id} className={cn("flex items-start gap-2", isOutgoing ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold uppercase",
                isOutgoing ? "order-2" : "order-1",
                isOutgoing
                  ? "border-siso-orange/40 bg-siso-orange/20 text-siso-text-primary"
                  : "border-siso-orange/20 bg-siso-orange/15 text-siso-orange",
              )}
            >
              {message.authorInitials}
            </div>
            <div
              className={cn(
                "flex max-w-[78%] flex-col gap-1",
                isOutgoing ? "items-end order-1 text-right" : "items-start order-2 text-left",
              )}
            >
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-siso-text-muted">
                <span className="font-semibold text-siso-text-primary">{message.authorName}</span>
                <span>{message.timestamp}</span>
              </div>
              <div
                className={cn(
                  "rounded-3xl px-4 py-1.5 text-sm",
                  isOutgoing
                    ? "rounded-br bg-siso-orange/25 text-siso-orange/90"
                    : "rounded-bl bg-white/5 text-siso-text-primary",
                )}
              >
                {message.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
