import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { TextArea } from "./TextArea";

const meta = {
  component: TextArea,
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: { onChange: fn() },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Comment",
    placeholder: "Enter your comment ...",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    description: "Max 500 characters.",
  },
};

export const WithErrorMessage: Story = {
  args: {
    label: "Comment",
    placeholder: "Enter your comment ...",
    isInvalid: true,
    errorMessage: "Comment is required.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Comment",
    placeholder: "Disabled",
    isDisabled: true,
  },
};
