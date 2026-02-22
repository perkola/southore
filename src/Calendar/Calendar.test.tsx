import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { I18nProvider } from "react-aria-components";
import { Calendar } from "./Calendar";

test("renders calendar grid", async () => {
  await render(<Calendar aria-label="Event date" />);
  const grid = page.getByRole("grid");
  await expect.element(grid).toBeVisible();
});

test("renders previous and next buttons", async () => {
  await render(<Calendar aria-label="Event date" />);
  const prevButton = page.getByRole("button", { name: "Previous" }).first();
  const nextButton = page.getByRole("button", { name: "Next" }).first();
  await expect.element(prevButton).toBeVisible();
  await expect.element(nextButton).toBeVisible();
});

test("renders error message when provided", async () => {
  await render(<Calendar aria-label="Event date" errorMessage="Date is required" />);
  await expect.element(page.getByText("Date is required")).toBeVisible();
});

test("does not render error message when not provided", async () => {
  await render(<Calendar aria-label="Event date" />);
  const errorTexts = document.querySelectorAll('[slot="errorMessage"]');
  expect(errorTexts.length).toBe(0);
});

test("RTL locale swaps chevron direction", async () => {
  const { container: ltrContainer } = await render(
    <I18nProvider locale="en-US">
      <Calendar aria-label="LTR calendar" />
    </I18nProvider>,
  );

  const ltrPrevButton = ltrContainer.querySelector('[slot="previous"]')!;
  const ltrPrevSvgClass = ltrPrevButton.querySelector("svg")!.classList;

  const { container: rtlContainer } = await render(
    <I18nProvider locale="ar-SA">
      <Calendar aria-label="RTL calendar" />
    </I18nProvider>,
  );

  const rtlPrevButton = rtlContainer.querySelector('[slot="previous"]')!;
  const rtlPrevSvg = rtlPrevButton.querySelector("svg")!;

  expect(ltrPrevSvgClass.toString()).not.toBe(rtlPrevSvg.classList.toString());
});

test("screenshot: calendar", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Calendar aria-label="Event date" />
    </div>,
  );
  await expect(container).toMatchScreenshot("calendar-default");
});
