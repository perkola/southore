import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Autocomplete } from "./Autocomplete";

test("autocomplete error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <Autocomplete label="Country" placeholder="Select a country" isInvalid errorMessage="Please select a country.">
        <Autocomplete.Item id="us">United States</Autocomplete.Item>
      </Autocomplete>
    </div>,
  );
  await expect(container).toMatchScreenshot("autocomplete-error");
});

test("autocomplete closed", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <Autocomplete label="Country" placeholder="Select a country">
        <Autocomplete.Item id="us">United States</Autocomplete.Item>
        <Autocomplete.Item id="uk">United Kingdom</Autocomplete.Item>
      </Autocomplete>
    </div>,
  );
  await expect(container).toMatchScreenshot("autocomplete-closed");
});

test("autocomplete disabled", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <Autocomplete label="Country" placeholder="Select a country" isDisabled>
        <Autocomplete.Item id="us">United States</Autocomplete.Item>
        <Autocomplete.Item id="uk">United Kingdom</Autocomplete.Item>
      </Autocomplete>
    </div>,
  );
  await expect(container).toMatchScreenshot("autocomplete-disabled");
});

test("autocomplete open", async () => {
  await render(
    <div style={{ padding: 8, width: 300 }}>
      <Autocomplete label="Country" placeholder="Select a country">
        <Autocomplete.Item id="us">United States</Autocomplete.Item>
        <Autocomplete.Item id="uk">United Kingdom</Autocomplete.Item>
        <Autocomplete.Item id="fr">France</Autocomplete.Item>
      </Autocomplete>
    </div>,
  );
  await page.getByRole("button", { name: "Country" }).click();
  await expect.element(page.getByRole("option", { name: "United States" })).toBeVisible();
  await expect(document.body).toMatchScreenshot("autocomplete-open");
});

test("autocomplete filtered", async () => {
  await render(
    <div style={{ padding: 8, width: 300 }}>
      <Autocomplete label="Fruit" placeholder="Pick a fruit">
        <Autocomplete.Item id="apple">Apple</Autocomplete.Item>
        <Autocomplete.Item id="banana">Banana</Autocomplete.Item>
        <Autocomplete.Item id="cherry">Cherry</Autocomplete.Item>
      </Autocomplete>
    </div>,
  );
  await page.getByRole("button", { name: "Fruit" }).click();
  await page.getByRole("searchbox").fill("app");
  await expect.element(page.getByRole("option", { name: "Apple" })).toBeVisible();
  await expect(page.getByRole("listbox")).toMatchScreenshot("autocomplete-filtered");
});

test("autocomplete open with selection", async () => {
  await render(
    <div style={{ padding: 8, width: 300 }}>
      <Autocomplete label="Fruit" defaultSelectedKey="banana">
        <Autocomplete.Item id="apple">Apple</Autocomplete.Item>
        <Autocomplete.Item id="banana">Banana</Autocomplete.Item>
        <Autocomplete.Item id="cherry">Cherry</Autocomplete.Item>
      </Autocomplete>
    </div>,
  );
  await page.getByRole("button", { name: "Banana" }).click();
  await expect.element(page.getByRole("option", { name: "Banana" })).toBeVisible();
  await expect(document.body).toMatchScreenshot("autocomplete-open-with-selection");
});
