import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vite-plus/test/browser";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

test("tooltip visible", async () => {
  await render(
    <div style={{ padding: 16, display: "flex", justifyContent: "center" }}>
      <Tooltip content="Helpful hint">
        <Button>Focus me</Button>
      </Tooltip>
    </div>,
  );
  await userEvent.tab();
  await expect.element(page.getByRole("tooltip")).toBeVisible();
  await expect(document.body).toMatchScreenshot("tooltip-visible");
});
