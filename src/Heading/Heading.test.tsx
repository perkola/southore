import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Heading } from "./Heading";

test("renders as h1 by default", async () => {
  const { getByRole } = await render(<Heading>Title</Heading>);
  await expect.element(getByRole("heading", { level: 1 })).toBeVisible();
});

test("renders the correct heading level", async () => {
  const { getByRole } = await render(<Heading level={3}>Title</Heading>);
  await expect.element(getByRole("heading", { level: 3 })).toBeVisible();
});

test("renders children", async () => {
  const { getByText } = await render(<Heading>Hello world</Heading>);
  await expect.element(getByText("Hello world")).toBeVisible();
});

test("merges custom className with heading class", async () => {
  const { getByRole } = await render(<Heading className="custom">Title</Heading>);
  const el = getByRole("heading").element() as HTMLElement;
  expect(el.className).toContain("heading");
  expect(el.className).toContain("custom");
});

