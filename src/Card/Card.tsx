import type { ComponentProps } from "react";
import "./Card.css";

export interface CardProps extends ComponentProps<"div"> {
  title?: string;
  /**
   * The heading level for the card title. Card does not know its position in
   * the document outline — callers should set this to the appropriate level.
   *
   * @default 3
   */
  titleLevel?: 2 | 3 | 4 | 5 | 6;
  variant?: "filled" | "elevated";
}

export function Card({ title, titleLevel = 3, variant = "filled", children, ...props }: CardProps) {
  const TitleTag = `h${titleLevel}` as const;
  return (
    <div className="card" data-variant={variant} {...props}>
      {title && <TitleTag className="card-title">{title}</TitleTag>}
      {children}
    </div>
  );
}
