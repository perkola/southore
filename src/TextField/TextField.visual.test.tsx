import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { TextField } from "./TextField";

test("text field default", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <TextField label="Name" placeholder="Enter your name" />
    </div>,
  );
  await expect(container).toMatchScreenshot("text-field-default");
});

test("text field with adornments", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <TextField
        label="Price"
        startAdornment={<span>$</span>}
        endAdornment={<span>.00</span>}
      />
    </div>,
  );
  await expect(container).toMatchScreenshot("text-field-adornments");
});

test("text field error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <TextField label="Email" isInvalid errorMessage="Invalid email address." />
    </div>,
  );
  await expect(container).toMatchScreenshot("text-field-error");
});

test("text field disabled", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <TextField label="Name" defaultValue="John Doe" isDisabled />
    </div>,
  );
  await expect(container).toMatchScreenshot("text-field-disabled");
});
