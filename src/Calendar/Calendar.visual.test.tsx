import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { I18nProvider } from "react-aria-components";
import { parseDate } from "@internationalized/date";
import { Calendar } from "./Calendar";

test("calendar error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Calendar
        aria-label="Event date"
        defaultFocusedValue={parseDate("2025-03-15")}
        errorMessage="Please select a date."
      />
    </div>,
  );
  await expect(container).toMatchScreenshot("calendar-error");
});

test("calendar", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Calendar aria-label="Event date" defaultFocusedValue={parseDate("2025-03-15")} />
    </div>,
  );
  await expect(container).toMatchScreenshot("calendar-default");
});

test("calendar selected date", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Calendar aria-label="Event date" defaultValue={parseDate("2025-03-15")} />
    </div>,
  );
  await expect(container).toMatchScreenshot("calendar-selected");
});

test("calendar rtl", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <I18nProvider locale="ar-SA">
        <Calendar aria-label="RTL calendar" defaultFocusedValue={parseDate("2025-03-15")} />
      </I18nProvider>
    </div>,
  );
  await expect(container).toMatchScreenshot("calendar-rtl");
});
