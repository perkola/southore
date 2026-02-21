import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Switch } from "./Switch";

test("renders track and handle", async () => {
  await render(<Switch>Dark mode</Switch>);
  const track = document.querySelector(".switch-track")!;
  const handle = document.querySelector(".switch-handle")!;
  expect(track).toBeTruthy();
  expect(handle).toBeTruthy();
});

test("renders children as label", async () => {
  const { getByText } = await render(<Switch>Notifications</Switch>);
  await expect.element(getByText("Notifications")).toBeVisible();
});

test("renders without children", async () => {
  await render(<Switch aria-label="Toggle" />);
  const track = document.querySelector(".switch-track")!;
  const labelSpan = track.nextElementSibling;
  expect(labelSpan).toBeNull();
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
