import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { parseDate } from "@internationalized/date";
import { RangeCalendar } from "./RangeCalendar";

test("range calendar default", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <RangeCalendar aria-label="Date range" />
    </div>,
  );
  await expect(container).toMatchScreenshot("range-calendar-default");
});

test("range calendar with selection", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <RangeCalendar
        aria-label="Date range"
        defaultValue={{
          start: parseDate("2025-03-10"),
          end: parseDate("2025-03-20"),
        }}
      />
    </div>,
  );
  await expect(container).toMatchScreenshot("range-calendar-selected");
});

test("range calendar error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <RangeCalendar
        aria-label="Date range"
        isInvalid
        errorMessage="Range contains unavailable dates."
        defaultValue={{
          start: parseDate("2025-03-10"),
          end: parseDate("2025-03-20"),
        }}
      />
    </div>,
  );
  await expect(container).toMatchScreenshot("range-calendar-error");
});
