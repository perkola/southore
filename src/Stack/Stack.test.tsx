import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { Stack } from "./Stack";

test("defaults to column direction", async () => {
  const { getByText } = await render(<Stack>Content</Stack>);
  const el = getByText("Content").element().closest(".stack");
  await expect.element(el).toHaveAttribute("data-direction", "column");
});

test("applies row direction", async () => {
  const { getByText } = await render(<Stack direction="row">Content</Stack>);
  const el = getByText("Content").element().closest(".stack");
  await expect.element(el).toHaveAttribute("data-direction", "row");
});

test("renders children", async () => {
  const { getByText } = await render(
    <Stack>
      <div>Alpha</div>
      <div>Beta</div>
    </Stack>,
  );
  await expect.element(getByText("Alpha")).toBeVisible();
  await expect.element(getByText("Beta")).toBeVisible();
});

test("applies gap style when specified", async () => {
  const { getByText } = await render(<Stack gap={4}>Item</Stack>);
  await expect.element(getByText("Item")).toBeVisible();
  const el = getByText("Item").element() as HTMLElement;
  expect(el.style.gap).toBe("var(--spacing-4)");
});

test("applies align style when specified", async () => {
  const { getByText } = await render(<Stack align="center">Item</Stack>);
  const el = getByText("Item").element() as HTMLElement;
  expect(el.style.alignItems).toBe("center");
});

test("applies justify style when specified", async () => {
  const { getByText } = await render(<Stack justify="between">Item</Stack>);
  const el = getByText("Item").element() as HTMLElement;
  expect(el.style.justifyContent).toBe("space-between");
});

test("applies flex-wrap when wrap is true", async () => {
  const { getByText } = await render(<Stack wrap>Item</Stack>);
  const el = getByText("Item").element() as HTMLElement;
  expect(el.style.flexWrap).toBe("wrap");
});
