import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { DatePicker } from "./DatePicker";

test("renders date input and calendar button", async () => {
  await render(<DatePicker label="Date" />);
  await expect.element(page.getByRole("group", { name: "Date" })).toBeVisible();
  await expect.element(page.getByRole("button")).toBeVisible();
});

test("renders label", async () => {
  await render(<DatePicker label="Start date" />);
  await expect.element(page.getByText("Start date")).toBeVisible();
});

test("renders description", async () => {
  await render(<DatePicker label="Date" description="Pick a date" />);
  await expect.element(page.getByText("Pick a date")).toBeVisible();
});

test("renders without visible label when aria-label is used", async () => {
  await render(<DatePicker aria-label="Date" />);
  await expect.element(page.getByRole("group", { name: "Date" })).toBeVisible();
});

test("screenshot: date picker error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <DatePicker label="Event date" isInvalid errorMessage="Please select a valid date." />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-picker-error");
});

test("screenshot: date picker closed", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <DatePicker label="Event date" />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-picker-closed");
});
