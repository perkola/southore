import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Stack } from "./Stack";

test("defaults to column direction", async () => {
  const { getByText } = await render(<Stack>Content</Stack>);
  const el = getByText("Content").element().closest(".stack");
  await expect.element(el).toHaveAttribute("data-direction", "column");
});

test("applies row direction", async () => {
  const { getByText } = await render(<Stack direction="row">Content</Stack>);
  const el = getByText("Content").element().closest(".stack");
  await expect.element(el).toHaveAttribute("data-direction", "row");
});

test("renders children", async () => {
  const { getByText } = await render(
    <Stack>
      <div>Alpha</div>
      <div>Beta</div>
    </Stack>,
  );
  await expect.element(getByText("Alpha")).toBeVisible();
  await expect.element(getByText("Beta")).toBeVisible();
});

test("screenshot: stack column", async () => {
  const { container } = await render(
    <div style={{ padding: 16 }}>
      <Stack gap={3}>
        <div style={{ padding: "8px 12px", background: "#e5e7eb", borderRadius: 4 }}>Item one</div>
        <div style={{ padding: "8px 12px", background: "#e5e7eb", borderRadius: 4 }}>Item two</div>
        <div style={{ padding: "8px 12px", background: "#e5e7eb", borderRadius: 4 }}>Item three</div>
      </Stack>
    </div>,
  );
  await expect(container).toMatchScreenshot("stack-column");
});

test("screenshot: stack row", async () => {
  const { container } = await render(
    <div style={{ padding: 16 }}>
      <Stack direction="row" gap={3}>
        <div style={{ padding: "8px 12px", background: "#e5e7eb", borderRadius: 4 }}>Item one</div>
        <div style={{ padding: "8px 12px", background: "#e5e7eb", borderRadius: 4 }}>Item two</div>
        <div style={{ padding: "8px 12px", background: "#e5e7eb", borderRadius: 4 }}>Item three</div>
      </Stack>
    </div>,
  );
  await expect(container).toMatchScreenshot("stack-row");
});

test("screenshot: stack space-between", async () => {
  const { container } = await render(
    <div style={{ padding: 16, width: 320 }}>
      <Stack direction="row" align="center" justify="between">
        <div style={{ padding: "8px 12px", background: "#e5e7eb", borderRadius: 4 }}>Left</div>
        <div style={{ padding: "8px 12px", background: "#e5e7eb", borderRadius: 4 }}>Right</div>
      </Stack>
    </div>,
  );
  await expect(container).toMatchScreenshot("stack-space-between");
});
