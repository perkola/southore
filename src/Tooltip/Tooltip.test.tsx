import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

test("tooltip appears on focus", async () => {
  await render(
    <Tooltip content="Help text">
      <Button>Focus me</Button>
    </Tooltip>,
  );
  await userEvent.tab();
  await expect.element(page.getByRole("tooltip")).toBeVisible();
  await expect.element(page.getByText("Help text")).toBeVisible();
});

test("tooltip is hidden by default", async () => {
  await render(
    <Tooltip content="Help text">
      <Button>Hover me</Button>
    </Tooltip>,
  );
  await expect
    .element(page.getByRole("tooltip"))
    .not.toBeInTheDocument();
});

test("tooltip respects placement", async () => {
  await render(
    <Tooltip content="Bottom tooltip" placement="bottom">
      <Button>Focus me</Button>
    </Tooltip>,
  );
  await userEvent.tab();
  const tooltip = page.getByRole("tooltip");
  await expect.element(tooltip).toBeVisible();
  await expect.element(tooltip).toHaveAttribute("data-placement", "bottom");
});
