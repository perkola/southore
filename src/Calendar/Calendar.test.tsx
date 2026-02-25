import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
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

test("screenshot: calendar error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Calendar aria-label="Event date" errorMessage="Please select a date." />
    </div>,
  );
  await expect(container).toMatchScreenshot("calendar-error");
});

test("screenshot: calendar", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Calendar aria-label="Event date" />
    </div>,
  );
  await expect(container).toMatchScreenshot("calendar-default");
});

test("screenshot: calendar rtl", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <I18nProvider locale="ar-SA">
        <Calendar aria-label="RTL calendar" />
      </I18nProvider>
    </div>,
  );
  await expect(container).toMatchScreenshot("calendar-rtl");
});
