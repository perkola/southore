import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Link } from "./Link";

test("renders link text", async () => {
  await render(<Link href="#">Visit us</Link>);
  await expect.element(page.getByRole("link", { name: "Visit us" })).toBeVisible();
});

test("renders with href", async () => {
  await render(<Link href="/about">About</Link>);
  await expect
    .element(page.getByRole("link", { name: "About" }))
    .toHaveAttribute("href", "/about");
});

test("disabled link has data-disabled attribute", async () => {
  await render(
    <Link isDisabled href="#">
      Disabled
    </Link>,
  );
  await expect
    .element(page.getByRole("link", { name: "Disabled" }))
    .toHaveAttribute("data-disabled");
});

test("screenshot: link states", async () => {
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
