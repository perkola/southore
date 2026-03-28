import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { Switch } from "./Switch";

test("switch off", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Switch>Off state</Switch>
    </div>,
  );
  await expect(container).toMatchScreenshot("switch-off", {
    comparatorOptions: {
      allowedMismatchedPixelRatio: 0.1,
    },
  });
});

test("switch on", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Switch isSelected>On state</Switch>
    </div>,
  );
  await expect(container).toMatchScreenshot("switch-on");
});

test("switch disabled", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Switch isDisabled>Disabled</Switch>
    </div>,
  );
  await expect(container).toMatchScreenshot("switch-disabled");
});
