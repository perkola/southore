import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Select } from "./Select";

test("select closed", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <Select label="Favorite fruit" placeholder="Select a fruit">
        <Select.Item id="apple">Apple</Select.Item>
        <Select.Item id="banana">Banana</Select.Item>
      </Select>
    </div>,
  );
  await expect(container).toMatchScreenshot("select-closed");
});

test("select error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <Select label="Fruit" placeholder="Pick a fruit" isInvalid errorMessage="Please select a fruit.">
        <Select.Item id="apple">Apple</Select.Item>
      </Select>
    </div>,
  );
  await expect(container).toMatchScreenshot("select-error");
});

test("select with start adornment", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <Select label="Favorite fruit" placeholder="Select a fruit" startAdornment={<span>🍎</span>}>
        <Select.Item id="apple">Apple</Select.Item>
        <Select.Item id="banana">Banana</Select.Item>
      </Select>
    </div>,
  );
  await expect(container).toMatchScreenshot("select-start-adornment");
});

test("select disabled", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <Select label="Favorite fruit" placeholder="Select a fruit" isDisabled>
        <Select.Item id="apple">Apple</Select.Item>
        <Select.Item id="banana">Banana</Select.Item>
      </Select>
    </div>,
  );
  await expect(container).toMatchScreenshot("select-disabled");
});

test("select open", async () => {
  await render(
    <div style={{ padding: 8, width: 300 }}>
      <Select label="Favorite fruit" placeholder="Select a fruit">
        <Select.Item id="apple">Apple</Select.Item>
        <Select.Item id="banana">Banana</Select.Item>
        <Select.Item id="cherry">Cherry</Select.Item>
      </Select>
    </div>,
  );
  await page.getByRole("button", { name: "Favorite fruit" }).click();
  await expect.element(page.getByRole("option", { name: "Apple" })).toBeVisible();
  await expect(document.body).toMatchScreenshot("select-open");
});

test("select open with selection", async () => {
  await render(
    <div style={{ padding: 8, width: 300 }}>
      <Select label="Favorite fruit" defaultSelectedKey="banana">
        <Select.Item id="apple">Apple</Select.Item>
        <Select.Item id="banana">Banana</Select.Item>
        <Select.Item id="cherry">Cherry</Select.Item>
      </Select>
    </div>,
  );
  await page.getByRole("button", { name: "Banana" }).click();
  await expect.element(page.getByRole("option", { name: "Banana" })).toBeVisible();
  await expect(document.body).toMatchScreenshot("select-open-with-selection");
});
