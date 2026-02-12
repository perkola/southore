import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search, Mail, Copy } from "lucide-react";
import { useState } from "react";
import { fn } from "storybook/test";
import { Button } from "./Button";
import { TextField } from "./TextField";

const meta = {
  component: TextField,
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: { onChange: fn() },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Enter text ...",
  },
};

export const WithStartIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search ...",
    startAdornment: <Search size={16} />,
  },
};

export const WithEndIcon: Story = {
  args: {
    label: "Email",
    placeholder: "Email",
    endAdornment: <Mail size={16} />,
  },
};

export const WithTextAdornments: Story = {
  args: {
    label: "Website",
    startAdornment: "https://",
    endAdornment: ".com",
  },
};

export const CopyToClipboard: Story = {
  render: () => {
    const [value, setValue] = useState("https://example.com");
    return (
      <TextField
        label="Share link"
        value={value}
        onChange={setValue}
        endAdornment={
          <Button
            variant="text"
            size="small"
            aria-label="Copy to clipboard"
            onPress={() => navigator.clipboard.writeText(value)}
          >
            <Copy size={14} />
          </Button>
        }
      />
    );
  },
  parameters: {
    docs: {
      source: {
        type: "dynamic",
      },
    },
  },
};

export const WithDescription: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    description: "We'll never share your email with anyone.",
  },
};

export const WithErrorMessage: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    isInvalid: true,
    errorMessage: "Please enter a valid email address.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Search",
    placeholder: "Disabled",
    isDisabled: true,
    startAdornment: <Search size={16} />,
  },
};
