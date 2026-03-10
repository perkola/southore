import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Switch } from "./Switch";

test("renders switch", async () => {
  const { getByRole } = await render(<Switch>Dark mode</Switch>);
  await expect.element(getByRole("switch", { name: "Dark mode" })).toBeVisible();
});

test("renders children as label", async () => {
  const { getByText } = await render(<Switch>Notifications</Switch>);
  await expect.element(getByText("Notifications")).toBeVisible();
});

test("renders without children", async () => {
  const { getByRole } = await render(<Switch aria-label="Toggle" />);
  await expect.element(getByRole("switch", { name: "Toggle" })).toBeVisible();
});

test("toggles when clicked", async () => {
  const { getByRole } = await render(<Switch>Toggle me</Switch>);
  const sw = getByRole("switch", { name: "Toggle me" });
  await expect.element(sw).not.toBeChecked();
  await page.getByText("Toggle me").click();
  await expect.element(sw).toBeChecked();
});

test("screenshot: switch off", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Switch>Off state</Switch>
    </div>,
  );
  await expect(container).toMatchScreenshot("switch-off");
});

test("screenshot: switch on", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Switch isSelected>On state</Switch>
    </div>,
  );
  await expect(container).toMatchScreenshot("switch-on");
});

test("screenshot: switch disabled", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Switch isDisabled>Disabled</Switch>
    </div>,
  );
  await expect(container).toMatchScreenshot("switch-disabled");
});
