import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Radio, RadioGroup } from "./RadioGroup";

const meta = {
  component: RadioGroup,
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: { onChange: fn() },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Favorite sport",
    children: (
      <>
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    label: "Favorite sport",
    description: "Select the sport you enjoy watching the most.",
    children: (
      <>
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </>
    ),
  },
};

export const WithErrorMessage: Story = {
  args: {
    label: "Favorite sport",
    isInvalid: true,
    errorMessage: "Please select a sport.",
    children: (
      <>
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: "Favorite sport",
    isDisabled: true,
    children: (
      <>
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </>
    ),
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Favorite sport",
    defaultValue: "baseball",
    children: (
      <>
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </>
    ),
  },
};
