import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { CheckboxGroup } from "./CheckboxGroup";
import { Checkbox } from "../Checkbox/Checkbox";

test("checkbox group error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <CheckboxGroup label="Notifications" isInvalid errorMessage="Select at least one.">
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
      </CheckboxGroup>
    </div>,
  );
  await expect(container).toMatchScreenshot("checkbox-group-error");
});

test("checkbox group default", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <CheckboxGroup label="Notifications">
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
        <Checkbox value="push">Push notifications</Checkbox>
      </CheckboxGroup>
    </div>,
  );
  await expect(container).toMatchScreenshot("checkbox-group-default");
});

test("checkbox group disabled", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <CheckboxGroup label="Notifications" isDisabled>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
      </CheckboxGroup>
    </div>,
  );
  await expect(container).toMatchScreenshot("checkbox-group-disabled");
});
