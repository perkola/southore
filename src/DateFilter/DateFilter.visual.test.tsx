import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { parseDate } from "@internationalized/date";
import { DateFilter } from "./DateFilter";

test("date filter — disabled", async () => {
  const { container } = await render(
    <div style={{ padding: 16, width: 300 }}>
      <DateFilter isDisabled defaultValue={{ type: "preset", preset: "last7days" }} />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-filter-disabled");
});

test("date filter — no value", async () => {
  const { container } = await render(
    <div style={{ padding: 16, width: 300 }}>
      <DateFilter />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-filter-no-value");
});

test("date filter — preset selected", async () => {
  const { container } = await render(
    <div style={{ padding: 16, width: 300 }}>
      <DateFilter defaultValue={{ type: "preset", preset: "last7days" }} />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-filter-preset-selected");
});

test("date filter — range selected", async () => {
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

test("date filter — popover open, no selection", async () => {
  await render(
    <div style={{ padding: 16 }}>
      <DateFilter />
    </div>,
  );
  await userEvent.click(page.getByRole("button"));
  await expect.element(page.getByText("Last 7 days")).toBeVisible();
  await expect(page.getByRole("dialog", { name: "Date filter" })).toMatchScreenshot("date-filter-popover-empty");
});

test("date filter — popover open, range mode", async () => {
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
