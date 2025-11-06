import type { ReactNode } from "react";
import { cn } from "@/domains/shared/utils/cn";

interface ScreenViewportProps {
  children: ReactNode;
  isImmersive?: boolean;
  hasBottomNav?: boolean;
}

export function ScreenViewport({ children, isImmersive, hasBottomNav }: ScreenViewportProps) {
  return (
    <main
      className={cn(
        "relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-siso-bg-primary",
        hasBottomNav ? "pb-24" : "pb-20",
        isImmersive && "pb-0",
      )}
    >
      {children}
    </main>
  );
}
