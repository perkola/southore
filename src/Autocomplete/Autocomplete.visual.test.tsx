import { describe, expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page } from "vite-plus/test/browser";
import { Autocomplete } from "./Autocomplete";

describe("single-select", () => {
  test("closed", async () => {
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

  test("disabled", async () => {
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

  test("error state", async () => {
    const { container } = await render(
      <div style={{ padding: 8, width: 300 }}>
        <Autocomplete label="Country" placeholder="Select a country" isInvalid errorMessage="Please select a country.">
          <Autocomplete.Item id="us">United States</Autocomplete.Item>
        </Autocomplete>
      </div>,
    );
    await expect(container).toMatchScreenshot("autocomplete-error");
  });

  test("open", async () => {
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

  test("filtered", async () => {
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

  test("open with selection", async () => {
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
});

describe("multi-select", () => {
  test("empty", async () => {
    const { container } = await render(
      <div style={{ padding: 8, width: 300 }}>
        <Autocomplete label="Assign to" placeholder="Select users..." selectionMode="multiple">
          <Autocomplete.Item id="alice">Alice Johnson</Autocomplete.Item>
          <Autocomplete.Item id="bob">Bob Smith</Autocomplete.Item>
        </Autocomplete>
      </div>,
    );
    await expect(container).toMatchScreenshot("autocomplete-multi-empty");
  });

  test("with selections", async () => {
    const { container } = await render(
      <div style={{ padding: 8, width: 300 }}>
        <Autocomplete
          label="Assign to"
          placeholder="Select users..."
          selectionMode="multiple"
          defaultValue={["alice", "bob", "charlie"]}
        >
          <Autocomplete.Item id="alice">Alice Johnson</Autocomplete.Item>
          <Autocomplete.Item id="bob">Bob Smith</Autocomplete.Item>
          <Autocomplete.Item id="charlie">Charlie Brown</Autocomplete.Item>
        </Autocomplete>
      </div>,
    );
    await expect(container).toMatchScreenshot("autocomplete-multi-with-selections");
  });

  test("open", async () => {
    await render(
      <div style={{ padding: 8, width: 300 }}>
        <Autocomplete
          label="Assign to"
          placeholder="Select users..."
          selectionMode="multiple"
          defaultValue={["alice"]}
        >
          <Autocomplete.Item id="alice">Alice Johnson</Autocomplete.Item>
          <Autocomplete.Item id="bob">Bob Smith</Autocomplete.Item>
          <Autocomplete.Item id="charlie">Charlie Brown</Autocomplete.Item>
        </Autocomplete>
      </div>,
    );
    await page.getByRole("button", { name: /Assign to/ }).click();
    await expect.element(page.getByRole("option", { name: "Bob Smith" })).toBeVisible();
    await expect(document.body).toMatchScreenshot("autocomplete-multi-open");
  });

  test("invalid", async () => {
    const { container } = await render(
      <div style={{ padding: 8, width: 300 }}>
        <Autocomplete
          label="Reviewers"
          placeholder="Select reviewers..."
          selectionMode="multiple"
          isInvalid
          errorMessage="Please select at least one reviewer"
        >
          <Autocomplete.Item id="alice">Alice Johnson</Autocomplete.Item>
          <Autocomplete.Item id="bob">Bob Smith</Autocomplete.Item>
        </Autocomplete>
      </div>,
    );
    await expect(container).toMatchScreenshot("autocomplete-multi-invalid");
  });
});
