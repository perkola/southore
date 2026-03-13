import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { TextArea } from "./TextArea";

test("textarea default", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <TextArea label="Comment" placeholder="Enter your comment..." />
    </div>,
  );
  await expect(container).toMatchScreenshot("textarea-default");
});

test("textarea error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <TextArea label="Comment" isInvalid errorMessage="Comment is required." />
    </div>,
  );
  await expect(container).toMatchScreenshot("textarea-error");
});

test("textarea disabled", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <TextArea label="Comment" defaultValue="Some text here." isDisabled />
    </div>,
  );
  await expect(container).toMatchScreenshot("textarea-disabled");
});
