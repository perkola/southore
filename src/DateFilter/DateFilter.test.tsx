import { expect, test, vi } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vite-plus/test/browser";
import { parseDate } from "@internationalized/date";
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

test("shows formatted date range label for custom range value", async () => {
  await render(
    <DateFilter
      value={{
        type: "range",
        start: parseDate("2024-03-10"),
        end: parseDate("2024-03-15"),
      }}
    />,
  );
  const trigger = page.getByRole("button");
  await expect.element(trigger).not.toHaveTextContent("Select date");
});

test("calls onChange when a preset is selected", async () => {
  const onChange = vi.fn();
  await render(<DateFilter onChange={onChange} />);
  await userEvent.click(page.getByRole("button", { name: /select date/i }));
  await userEvent.click(page.getByText("Last 7 days"));
  expect(onChange).toHaveBeenCalledWith({ type: "preset", preset: "last7days" });
});

test("selecting a date range in the calendar calls onChange and closes popover", async () => {
  const onChange = vi.fn();
  await render(<DateFilter onChange={onChange} />);
  await userEvent.click(page.getByRole("button", { name: /select date/i }));
  await userEvent.click(page.getByText("10").first());
  await userEvent.click(page.getByText("15").first());
  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ type: "range" }));
  await expect.element(page.getByRole("grid")).not.toBeInTheDocument();
});

test("clicking a preset updates trigger label and closes popover", async () => {
  await render(<DateFilter />);
  await userEvent.click(page.getByRole("button"));
  await userEvent.click(page.getByText("Last 7 days"));
  const triggerBtn = page.getByRole("button", { name: /last 7 days/i });
  await expect.element(triggerBtn).toBeVisible();
  await expect.element(triggerBtn).toHaveAttribute("aria-expanded", "false");
});
