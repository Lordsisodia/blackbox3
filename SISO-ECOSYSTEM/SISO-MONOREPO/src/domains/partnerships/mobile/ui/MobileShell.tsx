"use client";

import { useEffect, useMemo, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MobileNavigationProvider, useMobileNavigation } from "../application/navigation-store";
import { QuickActionsSheet } from "./components/QuickActionsSheet";
import { ScreenViewport } from "./components/ScreenViewport";
import { QuickActionsContent } from "./quick-actions/QuickActionsContent";
import { CampusDrawer, CampusHubScreen } from "@/domains/partnerships/workspace/ui/mobile";
import { LearningCenterScreen } from "@/domains/partnerships/enablement/ui/mobile";
import { NotificationsScreen, MessagesScreen } from "@/domains/partnerships/communications/ui/mobile";
import { LimelightNav, type NavItem } from "@/components/ui/limelight-nav";
import { Home, GraduationCap, Bell, MessagesSquare, Sparkles } from "lucide-react";
import type { MobileTabId, QuickActionId } from "../types/navigation";

const TAB_ROUTE_MAP: Record<MobileTabId, string> = {
  campus: "/partners",
  learning: "/partners/learning",
  notifications: "/partners/inbox",
  messages: "/partners/messages",
  "quick-actions": "/partners/quick",
};

const DEFAULT_QUICK_ACTION: QuickActionId = "settings";

const QUICK_ACTION_ROUTE_MAP: Record<string, QuickActionId> = {
  "/partners/quick": "settings",
  "/partners/settings": "settings",
  "/partners/profile": "profile",
  "/partners/wallet": "wallet",
  "/partners/checklist": "checklist",
};

const normalizePartnersPath = (pathname: string): string => {
  if (!pathname) return "/partners";
  const trimmed = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  return trimmed || "/partners";
};

const getTabFromPath = (pathname: string): MobileTabId => {
  const normalized = normalizePartnersPath(pathname);

  if (normalized === "/partners" || normalized === "/partners/campus") {
    return "campus";
  }

  if (normalized.startsWith("/partners/learning")) {
    return "learning";
  }

  if (normalized.startsWith("/partners/inbox") || normalized.startsWith("/partners/notifications")) {
    return "notifications";
  }

  if (normalized.startsWith("/partners/messages")) {
    return "messages";
  }

  if (normalized.startsWith("/partners/quick")
      || normalized.startsWith("/partners/settings")
      || normalized.startsWith("/partners/profile")
      || normalized.startsWith("/partners/wallet")
      || normalized.startsWith("/partners/checklist")) {
    return "quick-actions";
  }

  return "campus";
};

const getQuickActionFromPath = (pathname: string): QuickActionId | null => {
  const normalized = normalizePartnersPath(pathname);
  for (const [route, action] of Object.entries(QUICK_ACTION_ROUTE_MAP)) {
    if (normalized === route) {
      return action;
    }
  }
  return null;
};

function ShellContent({ children }: { children?: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/partners";
  const {
    activeTab,
    isImmersiveMode,
    setActiveTab,
    toggleQuickActions,
    closeQuickActions,
    closeDrawer,
    isQuickActionsOpen,
    isDrawerOpen,
    activeQuickAction,
    selectQuickAction,
  } = useMobileNavigation();

  const targetQuickAction = useMemo(() => getQuickActionFromPath(pathname), [pathname]);

  useEffect(() => {
    const nextTab = getTabFromPath(pathname);
    const immersive = nextTab === "messages";
    if (nextTab !== activeTab || immersive !== isImmersiveMode) {
      setActiveTab(nextTab, { immersive });
    }

    if (nextTab === "quick-actions") {
      const desiredQuickAction = targetQuickAction ?? activeQuickAction ?? DEFAULT_QUICK_ACTION;

      if (!isQuickActionsOpen) {
        toggleQuickActions(desiredQuickAction);
      } else if (activeQuickAction !== desiredQuickAction) {
        selectQuickAction(desiredQuickAction);
      }
    } else if (isQuickActionsOpen) {
      closeQuickActions();
    }

    if (nextTab !== "campus" && isDrawerOpen) {
      closeDrawer();
    }
  }, [
    pathname,
    activeTab,
    isImmersiveMode,
    setActiveTab,
    isQuickActionsOpen,
    toggleQuickActions,
    activeQuickAction,
    selectQuickAction,
    closeQuickActions,
    isDrawerOpen,
    closeDrawer,
    targetQuickAction,
  ]);

  const handleNavigate = (tab: MobileTabId) => {
    const target = TAB_ROUTE_MAP[tab];
    if (target) {
      router.push(target);
    }
  };

  const navItems: NavItem[] = [
    {
      id: "campus",
      icon: <Home />,
      label: "Campus",
      onClick: () => handleNavigate("campus"),
    },
    {
      id: "learning",
      icon: <GraduationCap />,
      label: "Learning",
      onClick: () => handleNavigate("learning"),
    },
    {
      id: "notifications",
      icon: <Bell />,
      label: "Inbox",
      onClick: () => handleNavigate("notifications"),
    },
    {
      id: "messages",
      icon: <MessagesSquare />,
      label: "Messages",
      onClick: () => handleNavigate("messages"),
    },
    {
      id: "quick-actions",
      icon: <Sparkles />,
      label: "Quick",
      onClick: () => handleNavigate("quick-actions"),
    },
  ];

  const activeIndex = navItems.findIndex((item) => item.id === activeTab);
  const navKey = navItems[Math.max(activeIndex, 0)]?.id ?? "campus";

  const shouldShowNav = (!isImmersiveMode && activeTab !== "campus") || isDrawerOpen;

  const renderActiveTab = () => {
    switch (activeTab) {
      case "campus":
        return <CampusHubScreen />;
      case "learning":
        return <LearningCenterScreen />;
      case "notifications":
        return <NotificationsScreen />;
      case "messages":
        return <MessagesScreen />;
      case "quick-actions":
      default:
        return <QuickActionsContent />;
    }
  };

  return (
    <>
      <CampusDrawer />
      <ScreenViewport isImmersive={isImmersiveMode} hasBottomNav={shouldShowNav}>
        {renderActiveTab()}
      </ScreenViewport>
      <QuickActionsSheet />
      {shouldShowNav && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70]">
          <div className="pointer-events-auto border-t border-siso-border/70 bg-siso-bg-secondary/95 backdrop-blur-md shadow-[0_-18px_35px_rgba(0,0,0,0.4)] rounded-t-2xl">
            <div className="mx-auto flex max-w-md justify-center px-4 pt-2 pb-[calc(env(safe-area-inset-bottom,0px)+8px)]">
              <LimelightNav
                key={navKey}
                defaultActiveIndex={activeIndex >= 0 ? activeIndex : 0}
                className="pointer-events-auto w-full justify-between bg-transparent px-0 !border-transparent !h-12"
                iconContainerClassName="flex-1 !p-2.5"
                items={navItems}
              />
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}

type MobileShellProps = {
  children?: ReactNode;
  initialTab?: MobileTabId;
  initialQuickAction?: QuickActionId | null;
  initialImmersiveMode?: boolean;
};

export function MobileShell({
  children,
  initialTab = "campus",
  initialQuickAction = null,
  initialImmersiveMode,
}: MobileShellProps) {
  const initialState = useMemo(
    () => ({
      activeTab: initialTab,
      previousTab: initialTab,
      isQuickActionsOpen: initialTab === "quick-actions" && Boolean(initialQuickAction),
      isDrawerOpen: false,
      activeQuickAction: initialQuickAction,
      isImmersiveMode: initialImmersiveMode ?? (initialTab === "messages"),
    }),
    [initialImmersiveMode, initialQuickAction, initialTab],
  );

  return (
    <MobileNavigationProvider initialState={initialState}>
      <ShellContent>{children}</ShellContent>
    </MobileNavigationProvider>
  );
}
