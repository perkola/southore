import { expect, test } from "vitest";
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

