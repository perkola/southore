import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
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
