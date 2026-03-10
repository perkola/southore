import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import { ToggleButtonGroup, ToggleButton } from "./ToggleButtonGroup";

test("renders toggle buttons", async () => {
  await render(
    <ToggleButtonGroup selectionMode="single" disallowEmptySelection defaultSelectedKeys={["a"]}>
      <ToggleButton id="a">Option A</ToggleButton>
      <ToggleButton id="b">Option B</ToggleButton>
    </ToggleButtonGroup>,
  );
  await expect.element(page.getByRole("radio", { name: "Option A" })).toBeVisible();
  await expect.element(page.getByRole("radio", { name: "Option B" })).toBeVisible();
});

test("selected button has data-selected attribute", async () => {
  await render(
    <ToggleButtonGroup selectionMode="single" disallowEmptySelection defaultSelectedKeys={["a"]}>
      <ToggleButton id="a">Option A</ToggleButton>
      <ToggleButton id="b">Option B</ToggleButton>
    </ToggleButtonGroup>,
  );
  await expect.element(page.getByRole("radio", { name: "Option A" })).toHaveAttribute("data-selected");
  await expect.element(page.getByRole("radio", { name: "Option B" })).not.toHaveAttribute("data-selected");
});

test("clicking a button selects it", async () => {
  await render(
    <ToggleButtonGroup selectionMode="single" disallowEmptySelection defaultSelectedKeys={["a"]}>
      <ToggleButton id="a">Option A</ToggleButton>
      <ToggleButton id="b">Option B</ToggleButton>
    </ToggleButtonGroup>,
  );
  await userEvent.click(page.getByRole("radio", { name: "Option B" }));
  await expect.element(page.getByRole("radio", { name: "Option B" })).toHaveAttribute("data-selected");
  await expect.element(page.getByRole("radio", { name: "Option A" })).not.toHaveAttribute("data-selected");
});

test("disallowEmptySelection prevents deselecting active button", async () => {
  await render(
    <ToggleButtonGroup selectionMode="single" disallowEmptySelection defaultSelectedKeys={["a"]}>
      <ToggleButton id="a">Option A</ToggleButton>
      <ToggleButton id="b">Option B</ToggleButton>
    </ToggleButtonGroup>,
  );
  await userEvent.click(page.getByRole("radio", { name: "Option A" }));
  await expect.element(page.getByRole("radio", { name: "Option A" })).toHaveAttribute("data-selected");
});

test("multiple selection allows selecting multiple buttons", async () => {
  await render(
    <ToggleButtonGroup selectionMode="multiple" defaultSelectedKeys={["bold"]}>
      <ToggleButton id="bold">Bold</ToggleButton>
      <ToggleButton id="italic">Italic</ToggleButton>
    </ToggleButtonGroup>,
  );
  await userEvent.click(page.getByText("Italic"));
  await expect.element(page.getByText("Bold")).toHaveAttribute("data-selected");
  await expect.element(page.getByText("Italic")).toHaveAttribute("data-selected");
});

test("disabled button has data-disabled attribute", async () => {
  await render(
    <ToggleButtonGroup selectionMode="single" defaultSelectedKeys={["a"]}>
      <ToggleButton id="a">Option A</ToggleButton>
      <ToggleButton id="b" isDisabled>Option B</ToggleButton>
    </ToggleButtonGroup>,
  );
  await expect.element(page.getByText("Option B")).toHaveAttribute("data-disabled");
});

