import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { Link } from "./Link";

test("link states", async () => {
  const { container } = await render(
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8 }}>
      <Link href="#">Default</Link>
      <Link href="#" isDisabled>
        Disabled
      </Link>
    </div>,
  );
  await expect(container).toMatchScreenshot("link-states");
});
