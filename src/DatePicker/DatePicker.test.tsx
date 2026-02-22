import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { DatePicker } from "./DatePicker";

test("renders date input and calendar button", async () => {
  await render(<DatePicker label="Date" />);
  const group = page.getByRole("group", { name: "Date" });
  await expect.element(group).toBeVisible();
  const button = page.getByRole("button");
  await expect.element(button).toBeVisible();
});

test("renders label", async () => {
  await render(<DatePicker label="Start date" />);
  await expect.element(page.getByText("Start date")).toBeVisible();
});

test("renders description", async () => {
  await render(<DatePicker label="Date" description="Pick a date" />);
  await expect.element(page.getByText("Pick a date")).toBeVisible();
});

test("does not render label when not provided", async () => {
  await render(<DatePicker aria-label="Date" />);
  const labels = document.querySelectorAll("label");
  expect(labels.length).toBe(0);
});

test("screenshot: date picker closed", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <DatePicker label="Event date" />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-picker-closed");
});
