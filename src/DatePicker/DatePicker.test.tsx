import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
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

test("renders error message when invalid", async () => {
  await render(<DatePicker label="Date" isInvalid errorMessage="Date is required" />);
  await expect.element(page.getByText("Date is required")).toBeVisible();
});

test("opens calendar on button click", async () => {
  await render(<DatePicker label="Date" />);
  await userEvent.click(page.getByRole("button", { name: "Open calendar" }));
  await expect.element(page.getByRole("grid")).toBeVisible();
});
