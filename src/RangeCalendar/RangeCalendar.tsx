import {
  RangeCalendar as RACRangeCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  type RangeCalendarProps as RACRangeCalendarProps,
  type DateValue,
  Heading,
  Text,
  useLocale,
} from "react-aria-components";
import { Button } from "../Button/Button";
import { ChevronLeft, ChevronRight } from "../icons";
import "./RangeCalendar.css";

export interface RangeCalendarProps
  extends Omit<RACRangeCalendarProps<DateValue>, "visibleDuration"> {
  errorMessage?: string;
}

export function RangeCalendar({ errorMessage, ...props }: RangeCalendarProps) {
  const { direction } = useLocale();

  return (
    <RACRangeCalendar {...props}>
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
          {(date) => (
            <CalendarCell date={date}>
              {({ formattedDate }) => <span>{formattedDate}</span>}
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
    </RACRangeCalendar>
  );
}

RangeCalendar.displayName = "RangeCalendar";
