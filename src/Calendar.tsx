import {
  Calendar as RACCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  type CalendarProps as RACCalendarProps,
  type DateValue,
  Heading,
  Text,
  useLocale,
} from "react-aria-components";
import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from "./icons";
import "./Calendar.css";

export interface CalendarProps<T extends DateValue> extends Omit<
  RACCalendarProps<T>,
  "visibleDuration"
> {
  /** An error message shown when the calendar is invalid. */
  errorMessage?: string;
}

export function Calendar<T extends DateValue>({
  errorMessage,
  ...props
}: CalendarProps<T>) {
  const { direction } = useLocale();

  return (
    <RACCalendar {...props}>
      <header className="calendar-header">
        <Button variant="text" size="small" slot="previous">
          {direction === "rtl" ? (
            <ChevronRight size={16} aria-hidden />
          ) : (
            <ChevronLeft size={16} aria-hidden />
          )}
        </Button>
        <Heading />
        <Button variant="text" size="small" slot="next">
          {direction === "rtl" ? (
            <ChevronLeft size={16} aria-hidden />
          ) : (
            <ChevronRight size={16} aria-hidden />
          )}
        </Button>
      </header>
      <CalendarGrid>
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
    </RACCalendar>
  );
}

Calendar.displayName = "Calendar";
