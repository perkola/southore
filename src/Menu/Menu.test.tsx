import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Menu } from "./Menu";
import { Button } from "../Button/Button";
import { Popover } from "../Popover/Popover";

test("Section header renders when provided", async () => {
  await render(
    <Menu.Trigger>
      <Button>Open</Button>
      <Popover>
        <Menu>
          <Menu.Section header="Actions">
            <Menu.Item id="copy">Copy</Menu.Item>
          </Menu.Section>
        </Menu>
      </Popover>
    </Menu.Trigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  await expect.element(page.getByText("Actions")).toBeVisible();
});

test("Section renders without header", async () => {
  await render(
    <Menu.Trigger>
      <Button>Open</Button>
      <Popover>
        <Menu>
          <Menu.Section>
            <Menu.Item id="copy">Copy</Menu.Item>
          </Menu.Section>
        </Menu>
      </Popover>
    </Menu.Trigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  await expect.element(page.getByRole("menuitem", { name: "Copy" })).toBeVisible();
  await expect.element(page.getByText("Actions")).not.toBeInTheDocument();
});

test("compound pattern renders items", async () => {
  await render(
    <Menu.Trigger>
      <Button>Open</Button>
      <Popover>
        <Menu>
          <Menu.Item id="cut">Cut</Menu.Item>
          <Menu.Item id="copy">Copy</Menu.Item>
          <Menu.Item id="paste">Paste</Menu.Item>
        </Menu>
      </Popover>
    </Menu.Trigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  await expect.element(page.getByRole("menuitem", { name: "Cut" })).toBeVisible();
  await expect.element(page.getByRole("menuitem", { name: "Copy" })).toBeVisible();
  await expect.element(page.getByRole("menuitem", { name: "Paste" })).toBeVisible();
});
