"use client";

import type { ReactNode } from "react";
import { MobileNavigationProvider, useMobileNavigation } from "../application/navigation-store";
import { QuickActionsSheet } from "./components/QuickActionsSheet";
import { ScreenViewport } from "./components/ScreenViewport";
import { QuickActionsContent } from "./quick-actions/QuickActionsContent";
import { CampusDrawer, CampusHubScreen } from "@/domains/partnerships/workspace/ui/mobile";
import { LearningCenterScreen } from "@/domains/partnerships/enablement/ui/mobile";
import { NotificationsScreen, MessagesScreen } from "@/domains/partnerships/communications/ui/mobile";
import { LimelightNav, type NavItem } from "@/components/ui/limelight-nav";
import { Home, GraduationCap, Bell, MessagesSquare, Sparkles } from "lucide-react";
import type { MobileTabId } from "../types/navigation";

function ShellContent({ children }: { children?: ReactNode }) {
  const {
    activeTab,
    isImmersiveMode,
    setActiveTab,
    toggleQuickActions,
    closeQuickActions,
    closeDrawer,
    isQuickActionsOpen,
    isDrawerOpen,
  } = useMobileNavigation();

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

  const goToTab = (tab: MobileTabId, options?: { immersive?: boolean }) => {
    setActiveTab(tab, options);
    closeQuickActions();
    if (tab !== "campus") {
      closeDrawer();
    }
  };

  const shouldShowNav = !isImmersiveMode && activeTab !== "campus" || isDrawerOpen;

  const navItems: NavItem[] = [
    {
      id: "campus",
      icon: <Home />,
      label: "Campus",
      onClick: () => {
        goToTab("campus", { immersive: false });
        closeDrawer();
      },
    },
    {
      id: "learning",
      icon: <GraduationCap />,
      label: "Learning",
      onClick: () => goToTab("learning"),
    },
    {
      id: "notifications",
      icon: <Bell />,
      label: "Inbox",
      onClick: () => goToTab("notifications"),
    },
    {
      id: "messages",
      icon: <MessagesSquare />,
      label: "Messages",
      onClick: () => goToTab("messages", { immersive: true }),
    },
    {
      id: "quick-actions",
      icon: <Sparkles />,
      label: "Quick",
      onClick: () => {
        setActiveTab("quick-actions", { immersive: false });
        closeDrawer();
        if (isQuickActionsOpen) {
          closeQuickActions();
        } else {
          toggleQuickActions("settings");
        }
      },
    },
  ];

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

export function MobileShell({ children }: { children?: ReactNode }) {
  return (
    <MobileNavigationProvider>
      <ShellContent>{children}</ShellContent>
    </MobileNavigationProvider>
  );
}
