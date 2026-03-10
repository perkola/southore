import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Card } from "./Card";

test("defaults to filled variant", async () => {
  const { getByText } = await render(<Card>Content</Card>);
  const card = getByText("Content").element().closest(".card");
  await expect.element(card).toHaveAttribute("data-variant", "filled");
});

test("applies elevated variant", async () => {
  const { getByText } = await render(<Card variant="elevated">Content</Card>);
  const card = getByText("Content").element().closest(".card");
  await expect.element(card).toHaveAttribute("data-variant", "elevated");
});

test("renders title when provided", async () => {
  const { getByText } = await render(<Card title="My Title">Content</Card>);
  await expect.element(getByText("My Title")).toBeVisible();
});

test("does not render title element when not provided", async () => {
  const { container } = await render(<Card>Content</Card>);
  const title = container.querySelector(".card-title");
  expect(title).toBeNull();
});

test("renders children", async () => {
  const { getByText } = await render(<Card>Hello</Card>);
  await expect.element(getByText("Hello")).toBeVisible();
});

