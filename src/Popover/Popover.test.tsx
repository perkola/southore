import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Popover } from "./Popover";
import { Button } from "../Button/Button";
import { DialogTrigger } from "react-aria-components";

test("showArrow renders SVG arrow", async () => {
  await render(
    <DialogTrigger>
      <Button>Open</Button>
      <Popover showArrow>
        <p>Content</p>
      </Popover>
    </DialogTrigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  await expect.element(page.getByText("Content")).toBeVisible();
  const arrow = document.querySelector(".react-aria-OverlayArrow svg");
  expect(arrow).toBeTruthy();
});

test("no arrow by default", async () => {
  await render(
    <DialogTrigger>
      <Button>Open</Button>
      <Popover>
        <p>Content</p>
      </Popover>
    </DialogTrigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  await expect.element(page.getByText("Content")).toBeVisible();
  const arrow = document.querySelector(".react-aria-OverlayArrow");
  expect(arrow).toBeNull();
});
