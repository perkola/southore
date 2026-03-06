import type { ComponentProps } from "react";
import "./Heading.css";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends ComponentProps<"h1"> {
  level?: HeadingLevel;
}

export function Heading({ level = 1, ...props }: HeadingProps) {
  const Tag = `h${level}` as "h1";
  return <Tag {...props} className="heading" />;
}
