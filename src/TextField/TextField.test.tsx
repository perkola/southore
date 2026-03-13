import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page } from "vite-plus/test/browser";
import { TextField } from "./TextField";

test("renders with label", async () => {
  await render(<TextField label="Name" />);
  await expect.element(page.getByRole("textbox", { name: "Name" })).toBeVisible();
});

test("renders start adornment", async () => {
  const { getByText } = await render(<TextField label="Amount" startAdornment={<span>$</span>} />);
  await expect.element(getByText("$")).toBeVisible();
});

test("renders end adornment", async () => {
  const { getByText } = await render(<TextField label="Weight" endAdornment={<span>kg</span>} />);
  await expect.element(getByText("kg")).toBeVisible();
});

test("renders without adornments when none provided", async () => {
  const { getByRole } = await render(<TextField label="Plain" />);
  await expect.element(getByRole("textbox", { name: "Plain" })).toBeVisible();
});

test("clicking group focuses input", async () => {
  await render(<TextField label="Focus test" startAdornment={<span>@</span>} />);
  await page.getByText("@").click();
  await expect
    .element(page.getByRole("textbox", { name: "Focus test" }))
    .toHaveAttribute("data-focused", "true");
});

test("renders description", async () => {
  const { getByText } = await render(
    <TextField label="Email" description="We'll never share your email" />,
  );
  await expect.element(getByText("We'll never share your email")).toBeVisible();
});

test("renders without label when aria-label is used", async () => {
  await render(<TextField aria-label="Name" />);
  await expect.element(page.getByRole("textbox", { name: "Name" })).toBeVisible();
});

test("renders error message when invalid", async () => {
  await render(<TextField label="Email" isInvalid errorMessage="Email is required" />);
  await expect.element(page.getByText("Email is required")).toBeVisible();
});
