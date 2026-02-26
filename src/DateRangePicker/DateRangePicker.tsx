import {
  DateRangePicker as RACDateRangePicker,
  type DateRangePickerProps as RACDateRangePickerProps,
  DateInput,
  DateSegment,
  type DateValue,
  Group,
  Label,
  Text,
  FieldError,
} from "react-aria-components";
import { Button } from "../Button/Button";
import { RangeCalendar } from "../RangeCalendar/RangeCalendar";
import type { FieldProps } from "../shared/Field";
import { Popover } from "../Popover/Popover";
import { Calendar as CalendarIcon } from "../icons";
import "../shared/Field.css";
import "./DateRangePicker.css";

export interface DateRangePickerProps
  extends RACDateRangePickerProps<DateValue>,
    FieldProps {}

export function DateRangePicker({
  label,
  description,
  errorMessage,
  ...props
}: DateRangePickerProps) {
  return (
    <RACDateRangePicker {...props}>
      {label && <Label>{label}</Label>}
      <Group className="date-range-picker-field">
        <div className="date-range-picker-inputs">
          <DateInput slot="start" className="date-range-picker-input">
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
          <span aria-hidden="true" className="date-range-picker-sep">–</span>
          <DateInput slot="end" className="date-range-picker-input">
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
        </div>
        <Button variant="text" size="small">
          <CalendarIcon size={16} aria-hidden />
        </Button>
      </Group>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="date-range-picker-popover">
        <RangeCalendar />
      </Popover>
    </RACDateRangePicker>
  );
}

DateRangePicker.displayName = "DateRangePicker";
