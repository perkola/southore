import { useId, useLayoutEffect, useRef, useState } from "react";
import {
  Button as RACButton,
  Label,
  ListBox,
  ListBoxItem,
  Text,
} from "react-aria-components";
import { Calendar } from "../Calendar/Calendar";
import { RangeCalendar } from "../RangeCalendar/RangeCalendar";
import { Popover } from "../Popover/Popover";
import { ToggleButtonGroup, ToggleButton } from "../ToggleButtonGroup/ToggleButtonGroup";
import { Calendar as CalendarIcon } from "../icons";
import {
  DEFAULT_DATE_PRESETS,
  type DateFilterValue,
  type DatePreset,
} from "../shared/DatePreset";
import "../shared/Field.css";
import "./DateFilter.css";

export interface DateFilterProps {
  value?: DateFilterValue;
  defaultValue?: DateFilterValue;
  onChange?: (value: DateFilterValue) => void;
  presets?: DatePreset[];
  label?: string;
  description?: string;
  isDisabled?: boolean;
  placeholder?: string;
}

function formatTriggerLabel(
  value: DateFilterValue | undefined,
  presets: DatePreset[],
  placeholder: string,
): string {
  if (!value) return placeholder;

  if (value.type === "preset") {
    return presets.find((p) => p.id === value.preset)?.label ?? placeholder;
  }

  if (value.type === "date") {
    const { year, month, day } = value.date;
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(year, month - 1, day));
  }

  const { year: sy, month: sm, day: sd } = value.start;
  const { year: ey, month: em, day: ed } = value.end;
  const startDate = new Date(sy, sm - 1, sd);
  const endDate = new Date(ey, em - 1, ed);
  const endStr = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(endDate);
  const startStr = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    ...(sy !== ey ? { year: "numeric" } : {}),
  }).format(startDate);
  return `${startStr} – ${endStr}`;
}

export function DateFilter({
  value: controlledValue,
  defaultValue,
  onChange,
  presets = DEFAULT_DATE_PRESETS,
  label,
  description,
  isDisabled,
  placeholder = "Select date",
}: DateFilterProps) {
  const labelId = useId();
  const descId = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const calendarPaneRef = useRef<HTMLDivElement>(null);
  const presetWrapperRef = useRef<HTMLDivElement>(null);

  const [internalValue, setInternalValue] = useState<
    DateFilterValue | undefined
  >(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const calPane = calendarPaneRef.current;
    const presetWrapper = presetWrapperRef.current;
    if (!calPane || !presetWrapper) return;
    const sync = () => {
      presetWrapper.style.maxHeight = `${calPane.offsetHeight}px`;
    };
    sync();
    const obs = new ResizeObserver(sync);
    obs.observe(calPane);
    return () => obs.disconnect();
  }, [isOpen]);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const initialMode = value?.type === "range" ? "range" : "date";
  const [calendarMode, setCalendarMode] = useState<"date" | "range">(initialMode);

  function commit(next: DateFilterValue) {
    if (controlledValue === undefined) {
      setInternalValue(next);
    }
    onChange?.(next);
  }

  const triggerLabel = formatTriggerLabel(value, presets, placeholder);

  return (
    <div className="date-filter">
      {label && <Label id={labelId}>{label}</Label>}

      <span ref={triggerRef} className="date-filter-trigger-wrapper">
        <RACButton
          className="date-filter-trigger"
          isDisabled={isDisabled}
          onPress={() => setIsOpen((o) => !o)}
          aria-expanded={isOpen}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={description ? descId : undefined}
        >
          <span
            className="date-filter-trigger-label"
            data-placeholder={!value ? true : undefined}
          >
            {triggerLabel}
          </span>
          <CalendarIcon
            size={16}
            aria-hidden
            className="date-filter-icon"
          />
        </RACButton>
      </span>

      <Popover
        className="date-filter-popover"
        triggerRef={triggerRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="bottom start"
      >
        <div className="date-filter-panel">
          <div className="date-filter-preset-wrapper" ref={presetWrapperRef}>
            <ListBox
              className="date-filter-preset-list listbox"
              aria-label="Date presets"
              selectionMode="single"
              selectedKeys={value?.type === "preset" ? [value.preset] : []}
              onAction={(key) => {
                commit({ type: "preset", preset: String(key) });
                setIsOpen(false);
              }}
            >
              {presets.map((p) => (
                <ListBoxItem key={p.id} id={p.id}>
                  {p.label}
                </ListBoxItem>
              ))}
            </ListBox>
          </div>

          <div
            className="date-filter-divider"
            role="separator"
            aria-orientation="vertical"
          />

          <div className="date-filter-calendar-pane" ref={calendarPaneRef}>
            <ToggleButtonGroup
              selectionMode="single"
              disallowEmptySelection
              size="small"
              selectedKeys={[calendarMode]}
              onSelectionChange={(keys) => {
                const key = [...keys][0] as "date" | "range";
                if (key) setCalendarMode(key);
              }}
            >
              <ToggleButton id="date">Single date</ToggleButton>
              <ToggleButton id="range">Date range</ToggleButton>
            </ToggleButtonGroup>

            {calendarMode === "date" ? (
              <Calendar
                value={value?.type === "date" ? value.date : null}
                onChange={(d) => {
                  if (d) {
                    commit({ type: "date", date: d });
                    setIsOpen(false);
                  }
                }}
              />
            ) : (
              <RangeCalendar
                value={
                  value?.type === "range"
                    ? { start: value.start, end: value.end }
                    : null
                }
                onChange={(r) => {
                  if (r) {
                    commit({ type: "range", start: r.start, end: r.end });
                    setIsOpen(false);
                  }
                }}
              />
            )}
          </div>
        </div>
      </Popover>

      {description && <Text id={descId} slot="description">{description}</Text>}
    </div>
  );
}

DateFilter.displayName = "DateFilter";
