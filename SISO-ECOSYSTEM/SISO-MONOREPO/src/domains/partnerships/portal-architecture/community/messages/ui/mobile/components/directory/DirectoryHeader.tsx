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
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-siso-text-primary">
        <MessageCircle className="h-5 w-5 text-siso-orange" />
        <h2 className="text-base font-black uppercase tracking-[0.08em] leading-tight text-siso-text-primary/90">
          Messages & Friends
        </h2>
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={onToggleMenu}
          className="rounded-full p-2 text-siso-text-muted transition hover:text-siso-orange"
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
  );
}
