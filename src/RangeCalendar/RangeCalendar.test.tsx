import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { I18nProvider } from "react-aria-components";
import { parseDate } from "@internationalized/date";
import { RangeCalendar } from "./RangeCalendar";

test("renders calendar grid", async () => {
  await render(<RangeCalendar aria-label="Date range" />);
  await expect.element(page.getByRole("grid")).toBeVisible();
});

test("renders previous and next buttons", async () => {
  await render(<RangeCalendar aria-label="Date range" />);
  await expect.element(page.getByRole("button", { name: "Previous" }).first()).toBeVisible();
  await expect.element(page.getByRole("button", { name: "Next" }).first()).toBeVisible();
});

test("renders error message when provided", async () => {
  await render(
    <RangeCalendar aria-label="Date range" errorMessage="Range is invalid" />,
  );
  await expect.element(page.getByText("Range is invalid")).toBeVisible();
});

test("does not render error message when not provided", async () => {
  await render(<RangeCalendar aria-label="Date range" />);
  await expect.element(page.getByText("Range is invalid")).not.toBeInTheDocument();
});

test("renders correctly in RTL locale", async () => {
  await render(
    <I18nProvider locale="ar-SA">
      <RangeCalendar aria-label="RTL calendar" />
    </I18nProvider>,
  );
  await expect.element(page.getByRole("grid")).toBeVisible();
});

test("screenshot: range calendar default", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <RangeCalendar aria-label="Date range" />
    </div>,
  );
  await expect(container).toMatchScreenshot("range-calendar-default");
});

test("screenshot: range calendar with selection", async () => {
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

test("screenshot: range calendar error state", async () => {
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
