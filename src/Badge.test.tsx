import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Badge } from "./Badge";

test("defaults to gray color and default variant", async () => {
  const { getByText } = await render(<Badge>New</Badge>);
  const badge = getByText("New");
  await expect.element(badge).toHaveAttribute("data-color", "gray");
  await expect.element(badge).toHaveAttribute("data-variant", "default");
});

test("applies specified color", async () => {
  const { getByText } = await render(<Badge color="red">Error</Badge>);
  await expect.element(getByText("Error")).toHaveAttribute("data-color", "red");
});

test("applies circular variant", async () => {
  const { getByText } = await render(<Badge variant="circular">3</Badge>);
  await expect
    .element(getByText("3"))
    .toHaveAttribute("data-variant", "circular");
});

test("renders children", async () => {
  const { getByText } = await render(<Badge>Hello</Badge>);
  await expect.element(getByText("Hello")).toBeVisible();
});

test("screenshot: badge colors", async () => {
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

test("screenshot: badge variants", async () => {
  const { container } = await render(
    <div style={{ display: "flex", gap: 8, padding: 8 }}>
      <Badge>Default</Badge>
      <Badge variant="circular">3</Badge>
    </div>,
  );
  await expect(container).toMatchScreenshot("badge-variants");
});
