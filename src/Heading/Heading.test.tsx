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

test("screenshot: heading levels", async () => {
  const { container } = await render(
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
    </div>,
  );
  await expect(container).toMatchScreenshot("heading-levels");
});
