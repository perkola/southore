import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Menu } from "./Menu";
import { Button } from "../Button/Button";
import { Popover } from "../Popover/Popover";

test("menu open", async () => {
  await render(
    <div style={{ padding: 8 }}>
      <Menu.Trigger>
        <Button>Options</Button>
        <Popover>
          <Menu>
            <Menu.Item id="cut">Cut</Menu.Item>
            <Menu.Item id="copy">Copy</Menu.Item>
            <Menu.Item id="paste">Paste</Menu.Item>
          </Menu>
        </Popover>
      </Menu.Trigger>
    </div>,
  );
  await page.getByRole("button", { name: "Options" }).click();
  await expect.element(page.getByRole("menuitem", { name: "Cut" })).toBeVisible();
  await expect(page.getByRole("menu")).toMatchScreenshot("menu-open");
});

test("menu with sections", async () => {
  await render(
    <div style={{ padding: 8 }}>
      <Menu.Trigger>
        <Button>Edit</Button>
        <Popover>
          <Menu>
            <Menu.Section header="Clipboard">
              <Menu.Item id="cut">Cut</Menu.Item>
              <Menu.Item id="copy">Copy</Menu.Item>
            </Menu.Section>
            <Menu.Separator />
            <Menu.Section>
              <Menu.Item id="delete">Delete</Menu.Item>
            </Menu.Section>
          </Menu>
        </Popover>
      </Menu.Trigger>
    </div>,
  );
  await page.getByRole("button", { name: "Edit" }).click();
  await expect.element(page.getByRole("menuitem", { name: "Cut" })).toBeVisible();
  await expect(page.getByRole("menu")).toMatchScreenshot("menu-sections");
});
