import {
  DatePicker as RACDatePicker,
  type DatePickerProps as RACDatePickerProps,
  DateInput,
  DateSegment,
  type DateValue,
  Group,
  Label,
  Text,
  FieldError,
} from "react-aria-components";
import { Button } from "../Button/Button";
import { Calendar } from "../Calendar/Calendar";
import type { FieldProps } from "../shared/Field";
import { Popover } from "../Popover/Popover";
import { Calendar as CalendarIcon } from "../icons";
import "../shared/Field.css";
import "./DatePicker.css";

export interface DatePickerProps extends RACDatePickerProps<DateValue>, FieldProps {}

export function DatePicker({
  label,
  description,
  errorMessage,
  ...props
}: DatePickerProps) {
  return (
    <RACDatePicker {...props}>
      {label && <Label>{label}</Label>}
      <Group className="date-picker-field">
        <DateInput className="date-picker-input">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button variant="text" size="small">
          <CalendarIcon size={16} aria-hidden />
        </Button>
      </Group>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="date-picker-popover">
        <Calendar />
      </Popover>
    </RACDatePicker>
  );
}

DatePicker.displayName = "DatePicker";
