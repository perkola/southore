import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vite-plus/test/browser";
import { DatePicker } from "./DatePicker";

test("date picker error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <DatePicker label="Event date" isInvalid errorMessage="Please select a valid date." />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-picker-error");
});

test("date picker closed", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <DatePicker label="Event date" />
    </div>,
  );
  await expect(container).toMatchScreenshot("date-picker-closed");
});

test("date picker open", async () => {
  await render(
    <div style={{ padding: 8 }}>
      <DatePicker label="Event date" />
    </div>,
  );
  await userEvent.click(page.getByRole("button", { name: "Open calendar" }));
  await expect.element(page.getByRole("grid")).toBeVisible();
  await expect(document.body).toMatchScreenshot("date-picker-open");
});
