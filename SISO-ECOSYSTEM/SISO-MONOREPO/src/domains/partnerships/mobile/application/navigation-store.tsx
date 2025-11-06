"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MobileTabId, NavigationState, QuickActionId } from "../types/navigation";

interface NavigationContextValue extends NavigationState {
  setActiveTab: (tab: MobileTabId, options?: { immersive?: boolean }) => void;
  toggleQuickActions: (action: QuickActionId) => void;
  closeQuickActions: () => void;
  launchQuickAction: (action: QuickActionId) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setImmersiveMode: (isImmersive: boolean) => void;
  selectQuickAction: (action: QuickActionId) => void;
}

const defaultState: NavigationState = {
  activeTab: "campus",
  previousTab: "campus",
  isQuickActionsOpen: false,
  isDrawerOpen: false,
  activeQuickAction: null,
  isImmersiveMode: false,
};

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

export function MobileNavigationProvider({ children, initialState }: { children: ReactNode; initialState?: Partial<NavigationState> }) {
  const mergedInitialState = useMemo<NavigationState>(() => ({
    ...defaultState,
    ...initialState,
  }), [initialState]);

  const [state, setState] = useState<NavigationState>(mergedInitialState);

  const setActiveTab = useCallback((tab: MobileTabId, options?: { immersive?: boolean }) => {
    setState((prev) => ({
      activeTab: tab,
      previousTab: prev.activeTab,
      isQuickActionsOpen: false,
      isDrawerOpen: tab === "campus" ? prev.isDrawerOpen : false,
      activeQuickAction: tab === "quick-actions" ? prev.activeQuickAction : null,
      isImmersiveMode: options?.immersive ?? false,
    }));
  }, []);

  const toggleQuickActions = useCallback((action: QuickActionId) => {
    setState((prev) => {
      const opening = !prev.isQuickActionsOpen || prev.activeQuickAction !== action;
      return {
        ...prev,
        isQuickActionsOpen: opening,
        activeQuickAction: opening ? action : null,
      };
    });
  }, []);

  const closeQuickActions = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isQuickActionsOpen: false,
      activeQuickAction: null,
    }));
  }, []);

  const launchQuickAction = useCallback((action: QuickActionId) => {
    setState((prev) => ({
      activeTab: "quick-actions",
      previousTab: prev.activeTab,
      isQuickActionsOpen: false,
      activeQuickAction: action,
      isDrawerOpen: false,
      isImmersiveMode: false,
    }));
  }, []);

  const selectQuickAction = useCallback((action: QuickActionId) => {
    setState((prev) => ({
      ...prev,
      activeQuickAction: action,
    }));
  }, []);

  const openDrawer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isDrawerOpen: true,
      isImmersiveMode: true,
    }));
  }, []);

  const closeDrawer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isDrawerOpen: false,
      isImmersiveMode: false,
    }));
  }, []);

  const setImmersiveMode = useCallback((isImmersive: boolean) => {
    setState((prev) => ({
      ...prev,
      isImmersiveMode: isImmersive,
    }));
  }, []);

  const value = useMemo<NavigationContextValue>(() => ({
    ...state,
    setActiveTab,
    toggleQuickActions,
    closeQuickActions,
    launchQuickAction,
    openDrawer,
    closeDrawer,
    setImmersiveMode,
    selectQuickAction,
  }), [state, setActiveTab, toggleQuickActions, closeQuickActions, launchQuickAction, openDrawer, closeDrawer, setImmersiveMode, selectQuickAction]);

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useMobileNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useMobileNavigation must be used within MobileNavigationProvider");
  }
  return context;
}
