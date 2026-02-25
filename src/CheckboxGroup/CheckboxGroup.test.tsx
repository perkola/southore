import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { CheckboxGroup } from "./CheckboxGroup";
import { Checkbox } from "../Checkbox/Checkbox";

test("renders label", async () => {
  await render(
    <CheckboxGroup label="Notifications">
      <Checkbox value="email">Email</Checkbox>
    </CheckboxGroup>,
  );
  await expect.element(page.getByText("Notifications")).toBeVisible();
});

test("renders children", async () => {
  await render(
    <CheckboxGroup label="Notifications">
      <Checkbox value="email">Email</Checkbox>
      <Checkbox value="sms">SMS</Checkbox>
    </CheckboxGroup>,
  );
  await expect.element(page.getByRole("checkbox", { name: "Email" })).toBeVisible();
  await expect.element(page.getByRole("checkbox", { name: "SMS" })).toBeVisible();
});

test("renders description", async () => {
  await render(
    <CheckboxGroup label="Notifications" description="Choose how to receive updates.">
      <Checkbox value="email">Email</Checkbox>
    </CheckboxGroup>,
  );
  await expect.element(page.getByText("Choose how to receive updates.")).toBeVisible();
});

test("renders error message when invalid", async () => {
  await render(
    <CheckboxGroup label="Notifications" isInvalid errorMessage="Select at least one.">
      <Checkbox value="email">Email</Checkbox>
    </CheckboxGroup>,
  );
  await expect.element(page.getByText("Select at least one.")).toBeVisible();
});

test("screenshot: checkbox group error state", async () => {
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

test("screenshot: checkbox group default", async () => {
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
