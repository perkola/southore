import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";

test("breadcrumb trail", async () => {
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
