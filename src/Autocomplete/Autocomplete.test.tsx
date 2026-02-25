import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Autocomplete } from "./Autocomplete";

test("renders placeholder", async () => {
  await render(
    <Autocomplete label="Country" placeholder="Pick a country">
      <Autocomplete.Item id="us">United States</Autocomplete.Item>
      <Autocomplete.Item id="uk">United Kingdom</Autocomplete.Item>
    </Autocomplete>,
  );
  await expect.element(page.getByText("Pick a country")).toBeVisible();
});

test("renders start adornment", async () => {
  const { getByText } = await render(
    <Autocomplete
      label="Country"
      placeholder="Pick"
      startAdornment={<span>icon</span>}
    >
      <Autocomplete.Item id="us">United States</Autocomplete.Item>
    </Autocomplete>,
  );
  await expect.element(getByText("icon")).toBeVisible();
});

test("compound Autocomplete.Item renders items", async () => {
  await render(
    <Autocomplete label="Fruit" placeholder="Pick">
      <Autocomplete.Item id="apple">Apple</Autocomplete.Item>
      <Autocomplete.Item id="banana">Banana</Autocomplete.Item>
    </Autocomplete>,
  );
  await page.getByRole("button", { name: "Fruit" }).click();
  await expect
    .element(page.getByRole("option", { name: "Apple" }))
    .toBeVisible();
  await expect
    .element(page.getByRole("option", { name: "Banana" }))
    .toBeVisible();
});

test("filters items case-insensitively", async () => {
  await render(
    <Autocomplete label="Fruit" placeholder="Pick">
      <Autocomplete.Item id="apple">Apple</Autocomplete.Item>
      <Autocomplete.Item id="banana">Banana</Autocomplete.Item>
      <Autocomplete.Item id="cherry">Cherry</Autocomplete.Item>
    </Autocomplete>,
  );
  await page.getByRole("button", { name: "Fruit" }).click();
  const searchInput = page.getByRole("searchbox");
  await searchInput.fill("app");
  await expect
    .element(page.getByRole("option", { name: "Apple" }))
    .toBeVisible();
  await expect
    .element(page.getByRole("option", { name: "Banana" }))
    .not.toBeInTheDocument();
});

test("screenshot: autocomplete error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 300 }}>
      <Autocomplete label="Country" placeholder="Select a country" isInvalid errorMessage="Please select a country.">
        <Autocomplete.Item id="us">United States</Autocomplete.Item>
      </Autocomplete>
    </div>,
  );
  await expect(container).toMatchScreenshot("autocomplete-error");
});

test("screenshot: autocomplete closed", async () => {
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

test("screenshot: autocomplete open", async () => {
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
  await expect(page.getByRole("listbox")).toMatchScreenshot("autocomplete-open");
});

test("screenshot: autocomplete filtered", async () => {
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
