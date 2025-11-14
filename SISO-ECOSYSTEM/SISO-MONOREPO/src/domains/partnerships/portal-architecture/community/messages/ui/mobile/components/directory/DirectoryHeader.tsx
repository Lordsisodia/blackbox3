import { MessageCircle, MoreVertical } from "lucide-react";
import type { DirectoryPanel } from "../DirectoryOverlay";

type DirectoryHeaderProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onSelectPanel: (panel: DirectoryPanel) => void;
};

const menuOptions: Array<{ label: string; panel: DirectoryPanel }> = [
  { label: "All Friends", panel: "all" },
  { label: "Outgoing", panel: "outgoing" },
  { label: "Blocked Users", panel: "blocked" },
];

export function DirectoryHeader({ isMenuOpen, onToggleMenu, onSelectPanel }: DirectoryHeaderProps) {
  return (
    <div className="mb-4 rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-siso-orange">
            <MessageCircle className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-primary">
              Messages & Friends
            </p>
            <p className="text-xs text-siso-text-muted">Channels, DMs, and requests</p>
          </div>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={onToggleMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-siso-text-muted transition hover:border-siso-border hover:text-siso-orange"
            aria-label="Directory actions"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl border border-siso-border bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.25)] z-[130]">
              {menuOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  className="w-full px-4 py-2 text-left text-sm text-siso-text-primary transition hover:bg-siso-bg-hover"
                  onClick={() => onSelectPanel(option.panel)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
