import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Checkbox } from "./Checkbox";

test("is unchecked by default", async () => {
  const { getByRole } = await render(<Checkbox>Accept</Checkbox>);
  await expect.element(getByRole("checkbox", { name: "Accept" })).not.toBeChecked();
});

test("is checked when isSelected", async () => {
  const { getByRole } = await render(<Checkbox isSelected>Accept</Checkbox>);
  await expect.element(getByRole("checkbox", { name: "Accept" })).toBeChecked();
});

test("is indeterminate when isIndeterminate", async () => {
  const { getByRole } = await render(<Checkbox isIndeterminate>Accept</Checkbox>);
  await expect
    .element(getByRole("checkbox", { name: "Accept" }))
    .toBePartiallyChecked();
});

test("renders children as label", async () => {
  const { getByText } = await render(<Checkbox>Terms and conditions</Checkbox>);
  await expect.element(getByText("Terms and conditions")).toBeVisible();
});

test("renders without children", async () => {
  const { getByRole } = await render(<Checkbox aria-label="Standalone" />);
  await expect.element(getByRole("checkbox", { name: "Standalone" })).toBeVisible();
});

test("screenshot: checkbox states", async () => {
  const { container } = await render(
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8 }}>
      <Checkbox>Unchecked</Checkbox>
      <Checkbox isSelected>Checked</Checkbox>
      <Checkbox isIndeterminate>Indeterminate</Checkbox>
    </div>,
  );
  await expect(container).toMatchScreenshot("checkbox-states");
});
