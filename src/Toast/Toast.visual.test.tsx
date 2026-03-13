import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page } from "vite-plus/test/browser";
import { GlobalToastRegion } from "./Toast";
import { addToast, toastQueue } from "./toastQueue";

test("toast visible", async () => {
  const styleEl = document.createElement("style");
  styleEl.textContent =
    ".toast-region { position: static !important; } .toast { animation: none !important; }";
  document.head.appendChild(styleEl);
  await render(<GlobalToastRegion />);
  const key = addToast("Notification message", { timeout: null });
  await expect.element(page.getByText("Notification message")).toBeVisible();
  await expect(page.getByRole("region", { name: "Notifications" })).toMatchScreenshot(
    "toast-visible",
  );
  toastQueue.close(key);
  document.head.removeChild(styleEl);
});
