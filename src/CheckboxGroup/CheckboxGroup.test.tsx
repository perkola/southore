import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page } from "vite-plus/test/browser";
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

test("renders without label when aria-label is used", async () => {
  await render(
    <CheckboxGroup aria-label="Notifications">
      <Checkbox value="email">Email</Checkbox>
    </CheckboxGroup>,
  );
  await expect.element(page.getByRole("group", { name: "Notifications" })).toBeVisible();
});

test("renders error message when invalid", async () => {
  await render(
    <CheckboxGroup label="Notifications" isInvalid errorMessage="Select at least one.">
      <Checkbox value="email">Email</Checkbox>
    </CheckboxGroup>,
  );
  await expect.element(page.getByText("Select at least one.")).toBeVisible();
});
