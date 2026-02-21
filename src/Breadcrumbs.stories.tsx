import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";
import { Link } from "./Link";

const meta = {
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem id="home" href="/">
        Home
      </BreadcrumbItem>
      <BreadcrumbItem id="products" href="/products">
        Products
      </BreadcrumbItem>
      <BreadcrumbItem id="current">Laptop</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const WithCustomLinks: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem id="home">
        <Link href="/">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem id="products">
        <Link href="/products">Products</Link>
      </BreadcrumbItem>
      <BreadcrumbItem id="current">Laptop</BreadcrumbItem>
    </Breadcrumbs>
  ),
};
