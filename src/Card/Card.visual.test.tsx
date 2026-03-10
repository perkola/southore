import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Card } from "./Card";

test("card-filled", async () => {
  const { container } = await render(
    <div style={{ padding: 16 }}>
      <Card>Filled card content.</Card>
    </div>,
  );
  await expect(container).toMatchScreenshot("card-filled");
});

test("card-elevated", async () => {
  const { container } = await render(
    <div style={{ padding: 16 }}>
      <Card variant="elevated">Elevated card content.</Card>
    </div>,
  );
  await expect(container).toMatchScreenshot("card-elevated");
});

test("card-with-title", async () => {
  const { container } = await render(
    <div style={{ padding: 16 }}>
      <Card title="Card Title">Card content with a title.</Card>
    </div>,
  );
  await expect(container).toMatchScreenshot("card-with-title");
});
