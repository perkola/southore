import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { NumberField } from "./NumberField";

test("number field default", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <NumberField label="Quantity" defaultValue={1} />
    </div>,
  );
  await expect(container).toMatchScreenshot("number-field-default");
});

test("number field hidden stepper", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <NumberField label="Quantity" defaultValue={1} hideStepper />
    </div>,
  );
  await expect(container).toMatchScreenshot("number-field-hidden-stepper");
});

test("number field with adornments", async () => {
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

test("number field error", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <NumberField label="Quantity" isInvalid errorMessage="Must be a positive number." />
    </div>,
  );
  await expect(container).toMatchScreenshot("number-field-error");
});

test("number field disabled", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <NumberField label="Quantity" defaultValue={5} isDisabled />
    </div>,
  );
  await expect(container).toMatchScreenshot("number-field-disabled");
});
