import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { TextField } from "./TextField";

test("renders with label", async () => {
  await render(<TextField label="Name" />);
  await expect.element(page.getByRole("textbox", { name: "Name" })).toBeVisible();
});

test("renders start adornment", async () => {
  const { getByText } = await render(
    <TextField label="Amount" startAdornment={<span>$</span>} />,
  );
  await expect.element(getByText("$")).toBeVisible();
});

test("renders end adornment", async () => {
  const { getByText } = await render(
    <TextField label="Weight" endAdornment={<span>kg</span>} />,
  );
  await expect.element(getByText("kg")).toBeVisible();
});

test("renders without adornments when none provided", async () => {
  const { getByRole } = await render(<TextField label="Plain" />);
  await expect.element(getByRole("textbox", { name: "Plain" })).toBeVisible();
});

test("clicking group focuses input", async () => {
  await render(<TextField label="Focus test" startAdornment={<span>@</span>} />);
  await page.getByText("@").click();
  await expect
    .element(page.getByRole("textbox", { name: "Focus test" }))
    .toHaveAttribute("data-focused", "true");
});

test("renders description", async () => {
  const { getByText } = await render(
    <TextField label="Email" description="We'll never share your email" />,
  );
  await expect.element(getByText("We'll never share your email")).toBeVisible();
});

test("screenshot: text field default", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <TextField label="Name" placeholder="Enter your name" />
    </div>,
  );
  await expect(container).toMatchScreenshot("text-field-default");
});

test("screenshot: text field with adornments", async () => {
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
