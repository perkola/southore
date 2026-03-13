import type { ComponentProps, CSSProperties } from "react";
import "./Stack.css";

type SpacingScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface StackProps extends ComponentProps<"div"> {
  direction?: "row" | "column";
  gap?: SpacingScale;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
}

const alignMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
} as const;

const justifyMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
} as const;

export function Stack({
  direction = "column",
  gap,
  align,
  justify,
  wrap,
  style,
  children,
  ...props
}: StackProps) {
  return (
    <div
      {...props}
      className="stack"
      data-direction={direction}
      style={
        {
          ...style,
          gap: gap !== undefined ? `var(--spacing-${gap})` : undefined,
          alignItems: align ? alignMap[align] : undefined,
          justifyContent: justify ? justifyMap[justify] : undefined,
          flexWrap: wrap ? "wrap" : undefined,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
