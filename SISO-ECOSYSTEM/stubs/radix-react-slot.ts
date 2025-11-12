import * as React from "react";

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else if (typeof ref === "object" && ref !== null) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
  };
}

export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactElement }>(
  ({ children, ...props }, forwardedRef) => {
    if (!React.isValidElement(children)) return null;
    const childRef = (children as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref;
    const ref = mergeRefs(childRef, forwardedRef);

    return React.cloneElement(children, {
      ...props,
      ref,
      className: [children.props.className, props.className].filter(Boolean).join(" "),
    });
  },
);
Slot.displayName = "RadixSlotStub";
