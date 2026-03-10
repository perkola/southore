import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { DateFilter } from "./DateFilter";

test("renders trigger button with placeholder", async () => {
  await render(<DateFilter />);
  await expect.element(page.getByRole("button", { name: /select date/i })).toBeVisible();
});

test("renders label", async () => {
  await render(<DateFilter label="Date filter" />);
  await expect.element(page.getByText("Date filter")).toBeVisible();
});

test("renders description", async () => {
  await render(<DateFilter label="Date filter" description="Filter by date" />);
  await expect.element(page.getByText("Filter by date")).toBeVisible();
});

test("opens popover on click with presets and range calendar", async () => {
  await render(<DateFilter />);
  await userEvent.click(page.getByRole("button"));
  await expect.element(page.getByText("Last 7 days")).toBeVisible();
  await expect.element(page.getByRole("grid")).toBeVisible();
});

test("clicking a preset updates trigger label and closes popover", async () => {
  await render(<DateFilter />);
  await userEvent.click(page.getByRole("button"));
  await userEvent.click(page.getByText("Last 7 days"));
  const triggerBtn = page.getByRole("button", { name: /last 7 days/i });
  await expect.element(triggerBtn).toBeVisible();
  await expect.element(triggerBtn).toHaveAttribute("aria-expanded", "false");
});


