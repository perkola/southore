import type { DateValue } from "react-aria-components";

export interface DatePreset {
  id: string;
  label: string;
}

export type DateFilterValue =
  | { type: "preset"; preset: string }
  | { type: "date"; date: DateValue }
  | { type: "range"; start: DateValue; end: DateValue };

export const DEFAULT_DATE_PRESETS: DatePreset[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "last7days", label: "Last 7 days" },
  { id: "last30days", label: "Last 30 days" },
  { id: "thisMonth", label: "This month" },
  { id: "lastMonth", label: "Last month" },
  { id: "thisQuarter", label: "This quarter" },
  { id: "thisYear", label: "This year" },
];
