import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { parseDate } from "@internationalized/date";
import { DateRangePicker } from "./DateRangePicker";

test("date range picker closed", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <DateRangePicker label="Trip dates" />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-range-picker-closed");
});

test("date range picker with value", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <DateRangePicker
        label="Trip dates"
        defaultValue={{
          start: parseDate("2025-03-10"),
          end: parseDate("2025-03-20"),
        }}
      />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-range-picker-with-value");
});

test("date range picker error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <DateRangePicker
        label="Trip dates"
        isInvalid
        errorMessage="Please select a valid date range."
      />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-range-picker-error");
});

test("date range picker open", async () => {
  await render(
    <div style={{ padding: 8 }}>
      <DateRangePicker label="Trip dates" />
    </div>,
  );
  await userEvent.click(page.getByRole("button", { name: "Open calendar" }));
  await expect.element(page.getByRole("grid")).toBeVisible();
  await expect(document.body).toMatchScreenshot("date-range-picker-open");
});
