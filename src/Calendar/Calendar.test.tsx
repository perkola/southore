import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page } from "vite-plus/test/browser";
import { I18nProvider } from "react-aria-components";
import { Calendar } from "./Calendar";

test("renders calendar grid", async () => {
  await render(<Calendar aria-label="Event date" />);
  await expect.element(page.getByRole("grid")).toBeVisible();
});

test("renders previous and next buttons", async () => {
  await render(<Calendar aria-label="Event date" />);
  await expect.element(page.getByRole("button", { name: "Previous" }).first()).toBeVisible();
  await expect.element(page.getByRole("button", { name: "Next" }).first()).toBeVisible();
});

test("renders error message when provided", async () => {
  await render(<Calendar aria-label="Event date" errorMessage="Date is required" />);
  await expect.element(page.getByText("Date is required")).toBeVisible();
});

test("does not render error message when not provided", async () => {
  await render(<Calendar aria-label="Event date" />);
  await expect.element(page.getByText("Date is required")).not.toBeInTheDocument();
});

test("renders correctly in RTL locale", async () => {
  await render(
    <I18nProvider locale="ar-SA">
      <Calendar aria-label="RTL calendar" />
    </I18nProvider>,
  );
  await expect.element(page.getByRole("grid")).toBeVisible();
});
