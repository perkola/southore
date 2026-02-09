import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pencil } from "lucide-react";
import { Tooltip } from "./Tooltip";
import { Button } from "./Button";

const meta = {
  component: Tooltip,
  decorators: [
    (Story) => (
      <div style={{ padding: 40 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Edit document",
    children: (
      <Button variant="text" aria-label="Edit">
        <Pencil size={16} />
      </Button>
    ),
  },
};

export const Placements: Story = {
  args: { content: "", children: null },
  decorators: [
    (Story) => (
      <div style={{ padding: 40, display: "flex", gap: 16 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Tooltip content="Top" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Bottom" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Right" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </>
  ),
};

export const WithFormatting: Story = {
  args: {
    content: <>Requires <strong>admin</strong> access</>,
    children: <Button>Settings</Button>,
  },
};

export const Disabled: Story = {
  args: {
    content: "Submit form",
    isDisabled: true,
    children: <Button isDisabled>Submit</Button>,
  },
};
