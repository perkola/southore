import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vite-plus/test/browser";
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
  await expect.element(page.getByRole("tooltip")).not.toBeInTheDocument();
});

test("disabled tooltip does not appear on focus", async () => {
  await render(
    <Tooltip content="Help text" isDisabled>
      <Button>Focus me</Button>
    </Tooltip>,
  );
  await userEvent.tab();
  await expect.element(page.getByRole("tooltip")).not.toBeInTheDocument();
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
