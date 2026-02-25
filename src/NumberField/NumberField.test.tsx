import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { NumberField } from "./NumberField";

test("renders stepper buttons by default", async () => {
  await render(<NumberField label="Quantity" />);
  await expect.element(page.getByRole("button", { name: "Increase" })).toBeVisible();
  await expect.element(page.getByRole("button", { name: "Decrease" })).toBeVisible();
});

test("hideStepper hides stepper buttons", async () => {
  await render(<NumberField label="Quantity" hideStepper />);
  await expect
    .element(page.getByRole("button", { name: "Increase" }))
    .not.toBeInTheDocument();
  await expect
    .element(page.getByRole("button", { name: "Decrease" }))
    .not.toBeInTheDocument();
});

test("renders start adornment", async () => {
  const { getByText } = await render(
    <NumberField label="Price" startAdornment={<span>$</span>} />,
  );
  await expect.element(getByText("$")).toBeVisible();
});

test("renders end adornment", async () => {
  const { getByText } = await render(
    <NumberField label="Weight" endAdornment={<span>kg</span>} />,
  );
  await expect.element(getByText("kg")).toBeVisible();
});

test("clicking group focuses input", async () => {
  await render(<NumberField label="Focus test" startAdornment={<span>$</span>} />);
  await page.getByText("$").click();
  await expect
    .element(page.getByRole("textbox", { name: "Focus test" }))
    .toHaveFocus();
});

test("screenshot: number field default", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <NumberField label="Quantity" defaultValue={1} />
    </div>,
  );
  await expect(container).toMatchScreenshot("number-field-default");
});

test("screenshot: number field hidden stepper", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <NumberField label="Quantity" defaultValue={1} hideStepper />
    </div>,
  );
  await expect(container).toMatchScreenshot("number-field-hidden-stepper");
});

test("screenshot: number field with adornments", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <NumberField
        label="Price"
        defaultValue={99}
        startAdornment={<span>$</span>}
        endAdornment={<span>.00</span>}
        hideStepper
      />
    </div>,
  );
  await expect(container).toMatchScreenshot("number-field-adornments");
});
