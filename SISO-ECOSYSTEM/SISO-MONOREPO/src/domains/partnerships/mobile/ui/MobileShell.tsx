"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, type MouseEvent, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MobileNavigationProvider, useMobileNavigation } from "../application/navigation-store";
import { QUICK_ACTION_PATH_LOOKUP, QUICK_ACTION_DEFAULT_PATH } from "../application/quick-action-routes";
import { ScreenViewport } from "./components/ScreenViewport";
import { QuickActionsContent } from "./quick-actions/QuickActionsContent";
import { CampusDrawer, CampusHubScreen } from "@/domains/partnerships/workspace/ui/mobile";
import { LearningCenterScreen } from "@/domains/partnerships/enablement/ui/mobile";
import { MessagesScreen } from "@/domains/partnerships/communications/ui/mobile";
import { NotificationsScreen } from "@/domains/partnerships/notifications/ui/mobile";
import { LimelightNav, type NavItem } from "@/components/ui/limelight-nav";
import { Home, GraduationCap, Bell, MessagesSquare, MoreHorizontal } from "lucide-react";
import type { MobileTabId, QuickActionId } from "../types/navigation";

const TAB_ROUTE_MAP: Record<MobileTabId, string> = {
  campus: "/partners",
  learning: "/partners/learning",
  notifications: "/partners/inbox",
  messages: "/partners/messages",
  "quick-actions": QUICK_ACTION_DEFAULT_PATH,
};

const DEFAULT_QUICK_ACTION: QuickActionId = "settings";

const normalizePartnersPath = (pathname: string): string => {
  if (!pathname) return "/partners";
  const noTrailing = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const cleaned = noTrailing.replace(/\/\([^/]+\)/g, "");
  return cleaned || "/partners";
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
  return QUICK_ACTION_PATH_LOOKUP[normalized] ?? null;
};

function ShellContent({ children }: { children?: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/partners";
  const normalizedPath = useMemo(() => normalizePartnersPath(pathname), [pathname]);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const {
    activeTab,
    isImmersiveMode,
    setActiveTab,
    closeQuickActions,
    closeDrawer,
    isDrawerOpen,
    activeQuickAction,
    selectQuickAction,
  } = useMobileNavigation();

  const targetQuickAction = useMemo(() => getQuickActionFromPath(pathname), [pathname]);

  useEffect(() => {
    const nextTab = getTabFromPath(pathname);
    const defaultImmersive = nextTab === "messages";

    if (nextTab !== activeTab) {
      setActiveTab(nextTab, { immersive: defaultImmersive });
    }

    if (nextTab === "quick-actions") {
      const desiredQuickAction = targetQuickAction ?? activeQuickAction ?? DEFAULT_QUICK_ACTION;
      if (activeQuickAction !== desiredQuickAction) {
        selectQuickAction(desiredQuickAction);
      }
    } else if (activeTab === "quick-actions") {
      closeQuickActions();
    }

    if (nextTab !== "campus" && isDrawerOpen) {
      closeDrawer();
    }
  }, [
    pathname,
    activeTab,
    setActiveTab,
    activeQuickAction,
    selectQuickAction,
    closeQuickActions,
    isDrawerOpen,
    closeDrawer,
    targetQuickAction,
  ]);

  const navigateToTab = (tab: MobileTabId) => {
    const target = TAB_ROUTE_MAP[tab];
    if (!target) return;

    const normalizedTarget = normalizePartnersPath(target);
    if (normalizedTarget === normalizedPath && tab !== "quick-actions") {
      return;
    }

    if (tab !== "quick-actions") {
      closeQuickActions();
    }

    if (tab !== activeTab) {
      setActiveTab(tab, { immersive: tab === "messages" });
    }

    router.push(target);
  };

  const handleTabClick = (event: MouseEvent<HTMLAnchorElement>, tab: MobileTabId) => {
    event.preventDefault();
    navigateToTab(tab);
  };

  const handleQuickMenuClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateToTab("quick-actions");
  };

  const navItems: NavItem[] = [
    {
      id: "campus",
      icon: <Home />,
      label: "Campus",
      href: TAB_ROUTE_MAP.campus,
      onClick: (event) => handleTabClick(event, "campus"),
    },
    {
      id: "learning",
      icon: <GraduationCap />,
      label: "Learning",
      href: TAB_ROUTE_MAP.learning,
      onClick: (event) => handleTabClick(event, "learning"),
    },
    {
      id: "notifications",
      icon: <Bell />,
      label: "Inbox",
      href: TAB_ROUTE_MAP.notifications,
      onClick: (event) => handleTabClick(event, "notifications"),
    },
    {
      id: "messages",
      icon: <MessagesSquare />,
      label: "Messages",
      href: TAB_ROUTE_MAP.messages,
      onClick: (event) => handleTabClick(event, "messages"),
    },
    {
      id: "quick-actions",
      icon: <MoreHorizontal />,
      label: "More",
      href: TAB_ROUTE_MAP["quick-actions"],
      onClick: handleQuickMenuClick,
    },
  ];

  const activeIndex = navItems.findIndex((item) => item.id === activeTab);
  const navKey = navItems[Math.max(activeIndex, 0)]?.id ?? "campus";

  const shouldShowNav = (() => {
    if (activeTab === "campus") {
      return isDrawerOpen;
    }
    if (activeTab === "messages") {
      return !isImmersiveMode || isDrawerOpen;
    }
    return !isImmersiveMode || isDrawerOpen;
  })();

  useLayoutEffect(() => {
    const measure = () => {
      if (navContainerRef.current) {
        const height = navContainerRef.current.offsetHeight;
        document.documentElement.style.setProperty("--mobile-nav-height", `${height}`);
      } else {
        document.documentElement.style.removeProperty("--mobile-nav-height");
      }
    };
    if (shouldShowNav) {
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    document.documentElement.style.removeProperty("--mobile-nav-height");
    return () => undefined;
  }, [shouldShowNav]);


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
      {shouldShowNav && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[80]">
          <div ref={navContainerRef} className="pointer-events-auto border-t border-siso-border/70 bg-siso-bg-secondary/95 backdrop-blur-md shadow-[0_-18px_35px_rgba(0,0,0,0.4)] rounded-t-2xl">
            <div className="mx-auto flex max-w-md justify-center px-3.5 pt-2 pb-[calc(env(safe-area-inset-bottom,0px)+10px)]">
              <LimelightNav
                key={navKey}
                defaultActiveIndex={activeIndex >= 0 ? activeIndex : 0}
                className="pointer-events-auto w-full justify-between bg-transparent px-0 !border-transparent !h-11"
                iconContainerClassName="flex-1 !p-2"
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
