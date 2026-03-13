import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page } from "vite-plus/test/browser";
import { I18nProvider } from "react-aria-components";
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
  await render(<RangeCalendar aria-label="Date range" errorMessage="Range is invalid" />);
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
