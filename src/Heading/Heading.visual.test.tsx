import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { Heading } from "./Heading";

test("heading levels", async () => {
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
