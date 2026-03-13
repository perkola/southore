import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Autocomplete } from "./Autocomplete";

describe("single-select", () => {
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

  test("renders description", async () => {
    await render(
      <Autocomplete label="Country" placeholder="Pick" description="Start typing to filter">
        <Autocomplete.Item id="us">United States</Autocomplete.Item>
      </Autocomplete>,
    );
    await expect.element(page.getByText("Start typing to filter")).toBeVisible();
  });

  test("renders error message when invalid", async () => {
    await render(
      <Autocomplete label="Country" placeholder="Pick" isInvalid errorMessage="Please select a country">
        <Autocomplete.Item id="us">United States</Autocomplete.Item>
      </Autocomplete>,
    );
    await expect.element(page.getByText("Please select a country")).toBeVisible();
  });

  test("renders without label when aria-label is used", async () => {
    await render(
      <Autocomplete aria-label="Country" placeholder="Pick">
        <Autocomplete.Item id="us">United States</Autocomplete.Item>
      </Autocomplete>,
    );
    await expect.element(page.getByRole("button", { name: "Country" })).toBeVisible();
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
});

describe("multi-select", () => {
  test("renders placeholder when nothing selected", async () => {
    await render(
      <Autocomplete label="Assign to" placeholder="Select users..." selectionMode="multiple">
        <Autocomplete.Item id="alice">Alice Johnson</Autocomplete.Item>
        <Autocomplete.Item id="bob">Bob Smith</Autocomplete.Item>
      </Autocomplete>,
    );
    await expect.element(page.getByText("Select users...")).toBeVisible();
  });

  test("selecting items renders tags", async () => {
    await render(
      <Autocomplete label="Assign to" placeholder="Select users..." selectionMode="multiple">
        <Autocomplete.Item id="alice">Alice Johnson</Autocomplete.Item>
        <Autocomplete.Item id="bob">Bob Smith</Autocomplete.Item>
        <Autocomplete.Item id="charlie">Charlie Brown</Autocomplete.Item>
      </Autocomplete>,
    );
    await page.getByRole("button", { name: /Assign to/ }).click();
    await page.getByRole("option", { name: "Alice Johnson" }).click();
    await page.getByRole("option", { name: "Bob Smith" }).click();
    await expect.element(page.getByRole("row", { name: "Alice Johnson" })).toBeVisible();
    await expect.element(page.getByRole("row", { name: "Bob Smith" })).toBeVisible();
  });

  test("removing a tag deselects the item", async () => {
    await render(
      <Autocomplete label="Assign to" placeholder="Select users..." selectionMode="multiple" defaultValue={["alice", "bob"]}>
        <Autocomplete.Item id="alice">Alice Johnson</Autocomplete.Item>
        <Autocomplete.Item id="bob">Bob Smith</Autocomplete.Item>
      </Autocomplete>,
    );
    await expect.element(page.getByRole("row", { name: "Alice Johnson" })).toBeVisible();
    await page.getByRole("button", { name: "Remove Alice Johnson" }).click();
    await expect.element(page.getByRole("row", { name: "Alice Johnson" })).not.toBeInTheDocument();
    await expect.element(page.getByRole("row", { name: "Bob Smith" })).toBeVisible();
  });

  test("filters items while popover stays open", async () => {
    await render(
      <Autocomplete label="Assign to" placeholder="Select users..." selectionMode="multiple">
        <Autocomplete.Item id="alice">Alice Johnson</Autocomplete.Item>
        <Autocomplete.Item id="bob">Bob Smith</Autocomplete.Item>
        <Autocomplete.Item id="charlie">Charlie Brown</Autocomplete.Item>
      </Autocomplete>,
    );
    await page.getByRole("button", { name: /Assign to/ }).click();
    await page.getByRole("option", { name: "Alice Johnson" }).click();
    await expect.element(page.getByRole("listbox")).toBeVisible();
    await page.getByRole("searchbox").fill("bob");
    await expect.element(page.getByRole("option", { name: "Bob Smith" })).toBeVisible();
    await expect.element(page.getByRole("option", { name: "Alice Johnson" })).not.toBeInTheDocument();
  });

  test("defaultValue renders pre-selected tags", async () => {
    await render(
      <Autocomplete label="Assign to" placeholder="Select users..." selectionMode="multiple" defaultValue={["alice", "charlie"]}>
        <Autocomplete.Item id="alice">Alice Johnson</Autocomplete.Item>
        <Autocomplete.Item id="bob">Bob Smith</Autocomplete.Item>
        <Autocomplete.Item id="charlie">Charlie Brown</Autocomplete.Item>
      </Autocomplete>,
    );
    await expect.element(page.getByRole("row", { name: "Alice Johnson" })).toBeVisible();
    await expect.element(page.getByRole("row", { name: "Charlie Brown" })).toBeVisible();
    await expect.element(page.getByRole("row", { name: "Bob Smith" })).not.toBeInTheDocument();
  });
});
