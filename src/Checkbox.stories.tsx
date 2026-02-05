import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Checkbox } from "./Checkbox";

const meta = {
  component: Checkbox,
  args: { onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Accept terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    children: "Accept terms and conditions",
    defaultSelected: true,
  },
};

export const Indeterminate: Story = {
  args: {
    children: "Select all",
    isIndeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Accept terms and conditions",
    isDisabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    children: "Accept terms and conditions",
    isDisabled: true,
    defaultSelected: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    "aria-label": "Select row",
  },
};
