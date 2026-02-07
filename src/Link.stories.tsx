import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Link } from "./Link";

const meta = {
  component: Link,
  args: {
    children: "Link",
    href: "#",
    onPress: fn(),
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ExternalLink: Story = {
  args: {
    children: "Visit React Aria",
    href: "https://react-spectrum.adobe.com/react-aria/",
    target: "_blank",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled link",
    isDisabled: true,
  },
};
