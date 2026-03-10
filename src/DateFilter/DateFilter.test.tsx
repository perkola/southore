import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { parseDate } from "@internationalized/date";
import { DateFilter } from "./DateFilter";

test("renders trigger button with placeholder", async () => {
  await render(<DateFilter />);
  await expect.element(page.getByRole("button", { name: /select date/i })).toBeVisible();
});

test("renders label", async () => {
  await render(<DateFilter label="Date filter" />);
  await expect.element(page.getByText("Date filter")).toBeVisible();
});

test("renders description", async () => {
  await render(<DateFilter label="Date filter" description="Filter by date" />);
  await expect.element(page.getByText("Filter by date")).toBeVisible();
});

test("opens popover on click with presets and range calendar", async () => {
  await render(<DateFilter />);
  await userEvent.click(page.getByRole("button"));
  await expect.element(page.getByText("Last 7 days")).toBeVisible();
  await expect.element(page.getByRole("grid")).toBeVisible();
});

test("clicking a preset updates trigger label and closes popover", async () => {
  await render(<DateFilter />);
  await userEvent.click(page.getByRole("button"));
  await userEvent.click(page.getByText("Last 7 days"));
  const triggerBtn = page.getByRole("button", { name: /last 7 days/i });
  await expect.element(triggerBtn).toBeVisible();
  await expect.element(triggerBtn).toHaveAttribute("aria-expanded", "false");
});


test("screenshot: date filter — disabled", async () => {
  const { container } = await render(
    <div style={{ padding: 16, width: 300 }}>
      <DateFilter isDisabled defaultValue={{ type: "preset", preset: "last7days" }} />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-filter-disabled");
});

test("screenshot: date filter — no value", async () => {
  const { container } = await render(
    <div style={{ padding: 16, width: 300 }}>
      <DateFilter />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-filter-no-value");
});

test("screenshot: date filter — preset selected", async () => {
  const { container } = await render(
    <div style={{ padding: 16, width: 300 }}>
      <DateFilter defaultValue={{ type: "preset", preset: "last7days" }} />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-filter-preset-selected");
});


test("screenshot: date filter — range selected", async () => {
  const { container } = await render(
    <div style={{ padding: 16, width: 300 }}>
      <DateFilter
        defaultValue={{
          type: "range",
          start: parseDate("2026-01-15"),
          end: parseDate("2026-02-27"),
        }}
      />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-filter-range-selected");
});

test("screenshot: date filter — popover open, no selection", async () => {
  await render(
    <div style={{ padding: 16 }}>
      <DateFilter />
    </div>,
  );
  await userEvent.click(page.getByRole("button"));
  await expect.element(page.getByText("Last 7 days")).toBeVisible();
  await expect(page.getByRole("dialog", { name: "Date filter" })).toMatchScreenshot("date-filter-popover-empty");
});

test("screenshot: date filter — popover open, range mode", async () => {
  await render(
    <div style={{ padding: 16 }}>
      <DateFilter
        defaultValue={{
          type: "range",
          start: parseDate("2026-01-15"),
          end: parseDate("2026-02-27"),
        }}
      />
    </div>,
  );
  await userEvent.click(page.getByRole("button"));
  await expect.element(page.getByText("Last 7 days")).toBeVisible();
  await expect(page.getByRole("dialog", { name: "Date filter" })).toMatchScreenshot("date-filter-popover-range");
});
