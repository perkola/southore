import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Button } from "./Button";

test("defaults to solid variant and medium size", async () => {
  const { getByRole } = await render(<Button>Click</Button>);
  const button = getByRole("button");
  await expect.element(button).toHaveAttribute("data-variant", "solid");
  await expect.element(button).toHaveAttribute("data-size", "medium");
});

test("applies specified variant", async () => {
  const { getByRole } = await render(<Button variant="outlined">Click</Button>);
  await expect
    .element(getByRole("button"))
    .toHaveAttribute("data-variant", "outlined");
});

test("applies specified size", async () => {
  const { getByRole } = await render(<Button size="small">Click</Button>);
  await expect
    .element(getByRole("button"))
    .toHaveAttribute("data-size", "small");
});

test("applies text variant", async () => {
  const { getByRole } = await render(<Button variant="text">Click</Button>);
  await expect
    .element(getByRole("button"))
    .toHaveAttribute("data-variant", "text");
});

