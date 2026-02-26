import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { parseDate } from "@internationalized/date";
import { DateRangePicker } from "./DateRangePicker";

test("renders start and end date inputs", async () => {
  await render(<DateRangePicker label="Date range" />);
  await expect.element(page.getByRole("group", { name: "Date range" })).toBeVisible();
});

test("renders calendar button", async () => {
  await render(<DateRangePicker label="Date range" />);
  await expect.element(page.getByRole("button")).toBeVisible();
});

test("renders label", async () => {
  await render(<DateRangePicker label="Trip dates" />);
  await expect.element(page.getByText("Trip dates")).toBeVisible();
});

test("renders description", async () => {
  await render(<DateRangePicker label="Date range" description="Pick start and end dates" />);
  await expect.element(page.getByText("Pick start and end dates")).toBeVisible();
});

test("renders without visible label when aria-label is used", async () => {
  await render(<DateRangePicker aria-label="Date range" />);
  await expect.element(page.getByRole("group", { name: "Date range" })).toBeVisible();
});

test("screenshot: date range picker closed", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 400 }}>
      <DateRangePicker label="Trip dates" />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-range-picker-closed");
});

test("screenshot: date range picker with value", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 400 }}>
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

test("screenshot: date range picker error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 400 }}>
      <DateRangePicker
        label="Trip dates"
        isInvalid
        errorMessage="Please select a valid date range."
      />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-range-picker-error");
});
