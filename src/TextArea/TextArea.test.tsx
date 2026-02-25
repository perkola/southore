import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { TextArea } from "./TextArea";

test("renders with label", async () => {
  await render(<TextArea label="Comment" />);
  await expect.element(page.getByRole("textbox", { name: "Comment" })).toBeVisible();
});

test("renders placeholder", async () => {
  await render(<TextArea label="Comment" placeholder="Enter your comment" />);
  await expect
    .element(page.getByRole("textbox", { name: "Comment" }))
    .toHaveAttribute("placeholder", "Enter your comment");
});

test("renders description", async () => {
  await render(<TextArea label="Bio" description="Max 500 characters." />);
  await expect.element(page.getByText("Max 500 characters.")).toBeVisible();
});

test("renders error message when invalid", async () => {
  await render(
    <TextArea label="Comment" isInvalid errorMessage="Comment is required." />,
  );
  await expect.element(page.getByText("Comment is required.")).toBeVisible();
});

test("rows attribute is applied", async () => {
  await render(<TextArea label="Comment" rows={6} />);
  await expect
    .element(page.getByRole("textbox", { name: "Comment" }))
    .toHaveAttribute("rows", "6");
});

test("screenshot: textarea default", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <TextArea label="Comment" placeholder="Enter your comment..." />
    </div>,
  );
  await expect(container).toMatchScreenshot("textarea-default");
});

test("screenshot: textarea error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <TextArea label="Comment" isInvalid errorMessage="Comment is required." />
    </div>,
  );
  await expect(container).toMatchScreenshot("textarea-error");
});
