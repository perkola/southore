import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Stack } from "./Stack";

test("stack column", async () => {
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

test("stack row", async () => {
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

test("stack space-between", async () => {
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
