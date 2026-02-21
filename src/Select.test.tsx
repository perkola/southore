import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Select } from "./Select";

test("renders placeholder", async () => {
  await render(
    <Select label="Color" placeholder="Pick a color">
      <Select.Item id="red">Red</Select.Item>
      <Select.Item id="blue">Blue</Select.Item>
    </Select>,
  );
  await expect.element(page.getByText("Pick a color")).toBeVisible();
});

test("renders start adornment", async () => {
  const { getByText } = await render(
    <Select
      label="Color"
      placeholder="Pick"
      startAdornment={<span>icon</span>}
    >
      <Select.Item id="red">Red</Select.Item>
    </Select>,
  );
  await expect.element(getByText("icon")).toBeVisible();
});

test("does not render adornment wrapper when no startAdornment", async () => {
  await render(
    <Select label="Color" placeholder="Pick">
      <Select.Item id="red">Red</Select.Item>
    </Select>,
  );
  const adornments = document.querySelectorAll(".select-adornment");
  expect(adornments.length).toBe(0);
});

test("compound Select.Item renders items", async () => {
  await render(
    <Select label="Fruit" placeholder="Pick">
      <Select.Item id="apple">Apple</Select.Item>
      <Select.Item id="banana">Banana</Select.Item>
    </Select>,
  );
  await page.getByRole("button", { name: "Fruit" }).click();
  await expect.element(page.getByRole("option", { name: "Apple" })).toBeVisible();
  await expect.element(page.getByRole("option", { name: "Banana" })).toBeVisible();
});

test("screenshot: select closed", async () => {
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
