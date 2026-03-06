import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "./Stack";

const meta = {
  component: Stack,
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "0.5rem 1rem",
      background: "var(--color-bg-muted)",
      borderRadius: "var(--radius)",
      color: "var(--color-text)",
      fontSize: "var(--font-size-sm)",
    }}
  >
    {children}
  </div>
);

export const Vertical: Story = {
  render: () => (
    <div style={{ padding: "1rem" }}>
      <Stack gap={3}>
        <Box>Item one</Box>
        <Box>Item two</Box>
        <Box>Item three</Box>
      </Stack>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div style={{ padding: "1rem" }}>
      <Stack direction="row" gap={3}>
        <Box>Item one</Box>
        <Box>Item two</Box>
        <Box>Item three</Box>
      </Stack>
    </div>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <div style={{ padding: "1rem", width: 320 }}>
      <Stack direction="row" align="center" justify="between">
        <Box>Left</Box>
        <Box>Right</Box>
      </Stack>
    </div>
  ),
};

export const Wrap: Story = {
  render: () => (
    <div style={{ padding: "1rem", width: 200 }}>
      <Stack direction="row" gap={2} wrap>
        <Box>Alpha</Box>
        <Box>Beta</Box>
        <Box>Gamma</Box>
        <Box>Delta</Box>
        <Box>Epsilon</Box>
      </Stack>
    </div>
  ),
};
