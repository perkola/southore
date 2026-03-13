import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page } from "vite-plus/test/browser";
import { Link } from "./Link";

test("renders link text", async () => {
  await render(<Link href="#">Visit us</Link>);
  await expect.element(page.getByRole("link", { name: "Visit us" })).toBeVisible();
});

test("renders with href", async () => {
  await render(<Link href="/about">About</Link>);
  await expect.element(page.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
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
