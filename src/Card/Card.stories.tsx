import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Card content goes here.",
  },
};

export const WithTitle: Story = {
  args: {
    title: "Card Title",
    children: "Card content goes here.",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    title: "Elevated Card",
    children: "This card uses a drop shadow instead of a background fill.",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1.5rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const Dashboard: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", padding: "1rem" }}>
      <Card title="Total Users">1,284</Card>
      <Card title="Revenue">$48,290</Card>
      <Card variant="elevated" title="Active Sessions">
        342
      </Card>
      <Card variant="elevated" title="Error Rate">
        0.4%
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        type: "dynamic",
      },
    },
  },
};
