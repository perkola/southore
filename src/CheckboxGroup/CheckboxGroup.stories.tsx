import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Checkbox } from "../Checkbox/Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";

const meta = {
  component: CheckboxGroup,
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: { onChange: fn() },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Notifications",
    children: (
      <>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
        <Checkbox value="push">Push notifications</Checkbox>
      </>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    label: "Notifications",
    description: "Choose how you'd like to receive updates.",
    children: (
      <>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
        <Checkbox value="push">Push notifications</Checkbox>
      </>
    ),
  },
};

export const WithErrorMessage: Story = {
  args: {
    label: "Notifications",
    isInvalid: true,
    errorMessage: "Please select at least one notification method.",
    children: (
      <>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
        <Checkbox value="push">Push notifications</Checkbox>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: "Notifications",
    isDisabled: true,
    children: (
      <>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
        <Checkbox value="push">Push notifications</Checkbox>
      </>
    ),
  },
};
