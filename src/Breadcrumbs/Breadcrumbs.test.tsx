import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";

test("current item renders as span, not a link", async () => {
  await render(
    <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem>Current Page</BreadcrumbItem>
    </Breadcrumbs>,
  );
  const currentItem = page.getByText("Current Page");
  await expect.element(currentItem).toBeVisible();
  const el = currentItem.element();
  expect(el.tagName).toBe("SPAN");
});

test("non-current item with href renders as link", async () => {
  await render(
    <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem>Current</BreadcrumbItem>
    </Breadcrumbs>,
  );
  const link = page.getByRole("link", { name: "Home" });
  await expect.element(link).toBeVisible();
  await expect.element(link).toHaveAttribute("href", "/");
});

test("separator only renders on non-current items", async () => {
  await render(
    <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/about">About</BreadcrumbItem>
      <BreadcrumbItem>Current</BreadcrumbItem>
    </Breadcrumbs>,
  );
  const separators = document.querySelectorAll(".breadcrumb-separator");
  expect(separators.length).toBe(2);
});

test("renders nav with aria-label", async () => {
  await render(
    <Breadcrumbs>
      <BreadcrumbItem>Home</BreadcrumbItem>
    </Breadcrumbs>,
  );
  const nav = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect.element(nav).toBeVisible();
});

test("screenshot: breadcrumb trail", async () => {
  const { container } = await render(
    <div style={{ padding: 8 }}>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem>Widget</BreadcrumbItem>
      </Breadcrumbs>
    </div>,
  );
  await expect(container).toMatchScreenshot("breadcrumbs-trail");
});
