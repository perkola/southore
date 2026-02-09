import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Switch } from "./Switch";

const meta = {
  component: Switch,
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Airplane mode",
  },
};

export const Selected: Story = {
  args: {
    children: "Wi-Fi",
    defaultSelected: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Bluetooth",
    isDisabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    children: "Location services",
    isDisabled: true,
    defaultSelected: true,
  },
};
