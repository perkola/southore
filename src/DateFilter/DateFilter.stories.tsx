import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { parseDate } from "@internationalized/date";
import { DateFilter } from "./DateFilter";

const meta = {
  component: DateFilter,
  decorators: [
    (Story) => (
      <div style={{ padding: 80, width: 600 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof DateFilter>;

export default meta;
type Story = StoryObj<typeof DateFilter>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Date filter",
  },
};

export const WithLabelAndDescription: Story = {
  args: {
    label: "Date filter",
    description: "Select a date range to filter results",
  },
};

export const PresetSelected: Story = {
  args: {
    defaultValue: { type: "preset", preset: "last7days" },
  },
};

export const DateSelected: Story = {
  args: {
    defaultValue: { type: "date", date: parseDate("2026-02-27") },
  },
};

export const RangeSelected: Story = {
  args: {
    defaultValue: {
      type: "range",
      start: parseDate("2026-01-15"),
      end: parseDate("2026-02-27"),
    },
  },
};

export const CustomPresets: Story = {
  args: {
    presets: [
      { id: "today", label: "Today" },
      { id: "yesterday", label: "Yesterday" },
      { id: "last7days", label: "Last 7 days" },
      { id: "last30days", label: "Last 30 days" },
    ],
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultValue: { type: "preset", preset: "last7days" },
  },
};
