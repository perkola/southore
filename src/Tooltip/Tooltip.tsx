import type { ReactNode } from "react";
import {
  Tooltip as RACTooltip,
  TooltipTrigger,
  OverlayArrow,
} from "react-aria-components";
import "./Tooltip.css";

export type TooltipPlacement =
  | "top"
  | "top start"
  | "top end"
  | "bottom"
  | "bottom start"
  | "bottom end"
  | "left"
  | "left top"
  | "left bottom"
  | "right"
  | "right top"
  | "right bottom";

export interface TooltipProps {
  /** The content to display in the tooltip. */
  content: ReactNode;
  /** The element that triggers the tooltip. */
  children: ReactNode;
  /** The placement of the tooltip relative to the trigger. */
  placement?: TooltipPlacement;
  /** Whether the tooltip is disabled. */
  isDisabled?: boolean;
}

export function Tooltip({
  content,
  children,
  placement = "top",
  isDisabled = false,
}: TooltipProps) {
  return (
    <TooltipTrigger delay={0} closeDelay={500} isDisabled={isDisabled}>
      {children}
      <RACTooltip placement={placement} offset={8}>
        <OverlayArrow>
          <svg width={8} height={8} viewBox="0 0 8 8">
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
        {content}
      </RACTooltip>
    </TooltipTrigger>
  );
}

Tooltip.displayName = "Tooltip";
