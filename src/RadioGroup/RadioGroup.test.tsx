import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { RadioGroup, Radio } from "./RadioGroup";

test("renders label", async () => {
  await render(
    <RadioGroup label="Favorite sport">
      <Radio value="soccer">Soccer</Radio>
    </RadioGroup>,
  );
  await expect.element(page.getByText("Favorite sport")).toBeVisible();
});

test("renders radio options", async () => {
  await render(
    <RadioGroup label="Favorite sport">
      <Radio value="soccer">Soccer</Radio>
      <Radio value="baseball">Baseball</Radio>
    </RadioGroup>,
  );
  await expect.element(page.getByRole("radio", { name: "Soccer" })).toBeVisible();
  await expect.element(page.getByRole("radio", { name: "Baseball" })).toBeVisible();
});

test("renders description", async () => {
  await render(
    <RadioGroup label="Favorite sport" description="Pick one sport.">
      <Radio value="soccer">Soccer</Radio>
    </RadioGroup>,
  );
  await expect.element(page.getByText("Pick one sport.")).toBeVisible();
});

test("renders error message when invalid", async () => {
  await render(
    <RadioGroup label="Favorite sport" isInvalid errorMessage="Please select a sport.">
      <Radio value="soccer">Soccer</Radio>
    </RadioGroup>,
  );
  await expect.element(page.getByText("Please select a sport.")).toBeVisible();
});

test("defaultValue pre-selects a radio", async () => {
  await render(
    <RadioGroup label="Favorite sport" defaultValue="baseball">
      <Radio value="soccer">Soccer</Radio>
      <Radio value="baseball">Baseball</Radio>
    </RadioGroup>,
  );
  await expect.element(page.getByRole("radio", { name: "Baseball" })).toBeChecked();
});

test("screenshot: radio group default", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <RadioGroup label="Favorite sport" defaultValue="baseball">
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </RadioGroup>
    </div>,
  );
  await expect(container).toMatchScreenshot("radio-group-default");
});
