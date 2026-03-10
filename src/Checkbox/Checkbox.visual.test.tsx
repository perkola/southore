import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Checkbox } from "./Checkbox";

test("checkbox states", async () => {
  const { container } = await render(
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8 }}>
      <Checkbox>Unchecked</Checkbox>
      <Checkbox isSelected>Checked</Checkbox>
      <Checkbox isIndeterminate>Indeterminate</Checkbox>
    </div>,
  );
  await expect(container).toMatchScreenshot("checkbox-states");
});

test("checkbox disabled states", async () => {
  const { container } = await render(
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8 }}>
      <Checkbox isDisabled>Disabled unchecked</Checkbox>
      <Checkbox isDisabled isSelected>Disabled checked</Checkbox>
      <Checkbox isDisabled isIndeterminate>Disabled indeterminate</Checkbox>
    </div>,
  );
  await expect(container).toMatchScreenshot("checkbox-disabled-states");
});
