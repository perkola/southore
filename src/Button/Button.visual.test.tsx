import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Button } from "./Button";

test("button variants", async () => {
  const { container } = await render(
    <div style={{ display: "flex", gap: 8, padding: 8, alignItems: "center" }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>,
  );
  await expect(container).toMatchScreenshot("button-variants");
});

test("button sizes", async () => {
  const { container } = await render(
    <div style={{ display: "flex", gap: 8, padding: 8, alignItems: "center" }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
    </div>,
  );
  await expect(container).toMatchScreenshot("button-sizes");
});

test("button disabled", async () => {
  const { container } = await render(
    <div style={{ display: "flex", gap: 8, padding: 8, alignItems: "center" }}>
      <Button isDisabled>Solid</Button>
      <Button variant="outlined" isDisabled>Outlined</Button>
      <Button variant="text" isDisabled>Text</Button>
    </div>,
  );
  await expect(container).toMatchScreenshot("button-disabled");
});
