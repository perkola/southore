import type { ReactNode } from "react";
import {
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
  OverlayArrow,
  composeRenderProps,
} from "react-aria-components";
import "./Popover.css";

export interface PopoverProps extends Omit<RACPopoverProps, "children"> {
  /** Whether to show an arrow pointing to the trigger element. */
  showArrow?: boolean;
  children?: ReactNode;
}

export function Popover({
  showArrow,
  children,
  className,
  ...props
}: PopoverProps) {
  return (
    <RACPopover
      {...props}
      className={composeRenderProps(className, (className) =>
        ["popover", className].filter(Boolean).join(" "),
      )}
    >
      {showArrow && (
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </RACPopover>
  );
}

Popover.displayName = "Popover";
