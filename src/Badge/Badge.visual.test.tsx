import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Badge } from "./Badge";

test("badge colors", async () => {
  const { container } = await render(
    <div style={{ display: "flex", gap: 8, padding: 8 }}>
      <Badge color="gray">Gray</Badge>
      <Badge color="red">Red</Badge>
      <Badge color="green">Green</Badge>
      <Badge color="amber">Amber</Badge>
      <Badge color="blue">Blue</Badge>
    </div>,
  );
  await expect(container).toMatchScreenshot("badge-colors");
});

test("badge variants", async () => {
  const { container } = await render(
    <div style={{ display: "flex", gap: 8, padding: 8 }}>
      <Badge>Default</Badge>
      <Badge variant="circular">3</Badge>
    </div>,
  );
  await expect(container).toMatchScreenshot("badge-variants");
});
