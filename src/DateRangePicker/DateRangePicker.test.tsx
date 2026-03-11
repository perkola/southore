import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { DateRangePicker } from "./DateRangePicker";

test("renders start and end date inputs", async () => {
  await render(<DateRangePicker label="Date range" />);
  await expect.element(page.getByRole("group", { name: "Date range" })).toBeVisible();
});

test("renders calendar button", async () => {
  await render(<DateRangePicker label="Date range" />);
  await expect.element(page.getByRole("button")).toBeVisible();
});

test("renders label", async () => {
  await render(<DateRangePicker label="Trip dates" />);
  await expect.element(page.getByText("Trip dates")).toBeVisible();
});

test("renders description", async () => {
  await render(<DateRangePicker label="Date range" description="Pick start and end dates" />);
  await expect.element(page.getByText("Pick start and end dates")).toBeVisible();
});

test("renders without visible label when aria-label is used", async () => {
  await render(<DateRangePicker aria-label="Date range" />);
  await expect.element(page.getByRole("group", { name: "Date range" })).toBeVisible();
});

test("renders error message when invalid", async () => {
  await render(<DateRangePicker label="Date range" isInvalid errorMessage="Date range is required" />);
  await expect.element(page.getByText("Date range is required")).toBeVisible();
});

test("opens calendar on button click", async () => {
  await render(<DateRangePicker label="Date range" />);
  await userEvent.click(page.getByRole("button", { name: "Open calendar" }));
  await expect.element(page.getByRole("grid")).toBeVisible();
});
