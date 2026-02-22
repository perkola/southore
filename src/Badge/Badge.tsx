import type { ComponentProps } from "react";
import "./Badge.css";

export interface BadgeProps extends ComponentProps<"span"> {
  /**
   * The color scheme of the badge.
   *
   * @default 'gray'
   */
  color?: "gray" | "red" | "green" | "amber" | "blue";

  /**
   * The shape variant of the badge.
   *
   * @default 'default'
   */
  variant?: "default" | "circular";
}

export function Badge({
  color = "gray",
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span {...props} className="badge" data-color={color} data-variant={variant}>
      {children}
    </span>
  );
}
