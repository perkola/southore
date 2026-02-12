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
  type ValidationResult,
} from "react-aria-components";
import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { Popover } from "./Popover";
import { Calendar as CalendarIcon } from "./icons";
import "./DatePicker.css";

export interface DatePickerProps<T extends DateValue>
  extends RACDatePickerProps<T> {
  /** A visible label for the date picker. */
  label?: string;

  /** A brief description shown below the input. */
  description?: string;

  /** An error message shown when the field is invalid. */
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DatePickerProps<T>) {
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
