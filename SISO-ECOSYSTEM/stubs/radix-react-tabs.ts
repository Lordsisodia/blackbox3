import * as React from "react";

type TabsContextValue = {
  value: string | null;
  setValue: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) {
    throw new Error("Tabs primitives must be used within <TabsPrimitive.Root>");
  }
  return ctx;
}

export const Root = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
  }
>(({ value, defaultValue, onValueChange, children, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue ?? null);
  const currentValue = value ?? internalValue;

  const setValue = React.useCallback(
    (next: string) => {
      if (value === undefined) {
        setInternalValue(next);
      }
      onValueChange?.(next);
    },
    [value, onValueChange],
  );

  return (
    <div ref={ref} {...props}>
      <TabsContext.Provider value={{ value: currentValue, setValue }}>{children}</TabsContext.Provider>
    </div>
  );
});
Root.displayName = "RadixTabsRootStub";

export const List = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
));
List.displayName = "RadixTabsListStub";

export const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ value, children, ...props }, ref) => {
  const ctx = useTabsContext();
  const isActive = ctx.value === value;
  return (
    <button
      ref={ref}
      type="button"
      data-state={isActive ? "active" : "inactive"}
      onClick={() => ctx.setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
});
Trigger.displayName = "RadixTabsTriggerStub";

export const Content = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ value, children, ...props }, ref) => {
  const ctx = useTabsContext();
  if (ctx.value !== value) {
    return null;
  }
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});
Content.displayName = "RadixTabsContentStub";
