import type { ComponentProps } from "react";
import "./Card.css";

export interface CardProps extends ComponentProps<"div"> {
  title?: string;
  variant?: "filled" | "elevated";
}

export function Card({
  title,
  variant = "filled",
  children,
  ...props
}: CardProps) {
  return (
    <div className="card" data-variant={variant} {...props}>
      {title && <div className="card-title">{title}</div>}
      {children}
    </div>
  );
}
