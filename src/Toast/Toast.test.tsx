import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { GlobalToastRegion } from "./Toast";
import { addToast, removeToast, toastQueue } from "./toastQueue";

test("addToast returns a key", () => {
  const key = addToast("Test message", { timeout: null });
  expect(typeof key).toBe("string");
  expect(key.length).toBeGreaterThan(0);
  toastQueue.close(key);
});

test("removeToast closes a toast", async () => {
  await render(<GlobalToastRegion />);
  const key = addToast("Dismiss me", { timeout: null });
  await expect.element(page.getByText("Dismiss me")).toBeVisible();
  removeToast(key);
  await expect.element(page.getByText("Dismiss me")).not.toBeInTheDocument();
});

test("default timeout is 8000", () => {
  const spy = vi.spyOn(toastQueue, "add");
  const key = addToast("Timed toast");
  expect(spy).toHaveBeenCalledWith(
    { message: "Timed toast" },
    expect.objectContaining({ timeout: 8000 }),
  );
  spy.mockRestore();
  toastQueue.close(key);
});

test("timeout: null passes undefined to queue (no auto-dismiss)", () => {
  const spy = vi.spyOn(toastQueue, "add");
  const key = addToast("Sticky toast", { timeout: null });
  expect(spy).toHaveBeenCalledWith(
    { message: "Sticky toast" },
    expect.objectContaining({ timeout: undefined }),
  );
  spy.mockRestore();
  toastQueue.close(key);
});

test("toast is visible after addToast", async () => {
  await render(<GlobalToastRegion />);
  const key = addToast("Hello world", { timeout: null });
  await expect.element(page.getByText("Hello world")).toBeVisible();
  toastQueue.close(key);
});

test("screenshot: toast visible", async () => {
  const styleEl = document.createElement("style");
  styleEl.textContent = ".toast-region { position: static !important; } .toast { animation: none !important; }";
  document.head.appendChild(styleEl);
  await render(<GlobalToastRegion />);
  const key = addToast("Notification message", { timeout: null });
  await expect.element(page.getByText("Notification message")).toBeVisible();
  await expect(document.querySelector(".toast")).toMatchScreenshot("toast-visible");
  toastQueue.close(key);
  document.head.removeChild(styleEl);
});
