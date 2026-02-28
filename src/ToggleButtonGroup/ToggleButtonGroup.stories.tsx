import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ToggleButtonGroup, ToggleButton } from "./ToggleButtonGroup";

const meta: Meta<typeof ToggleButtonGroup> = {
  component: ToggleButtonGroup,
  decorators: [
    (Story) => (
      <div style={{ padding: 40 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToggleButtonGroup>;

export const SingleSelection: Story = {
  args: {
    selectionMode: "single",
    disallowEmptySelection: true,
    defaultSelectedKeys: ["month"],
    onSelectionChange: fn(),
  },
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton id="day">Day</ToggleButton>
      <ToggleButton id="week">Week</ToggleButton>
      <ToggleButton id="month">Month</ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const MultipleSelection: Story = {
  args: {
    selectionMode: "multiple",
    defaultSelectedKeys: ["bold"],
    onSelectionChange: fn(),
  },
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton id="bold"><strong>Bold</strong></ToggleButton>
      <ToggleButton id="italic"><em>Italic</em></ToggleButton>
      <ToggleButton id="underline"><span style={{ textDecoration: "underline" }}>Underline</span></ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const Small: Story = {
  args: {
    selectionMode: "single",
    disallowEmptySelection: true,
    defaultSelectedKeys: ["month"],
    size: "small",
    onSelectionChange: fn(),
  },
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton id="day">Day</ToggleButton>
      <ToggleButton id="week">Week</ToggleButton>
      <ToggleButton id="month">Month</ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <ToggleButtonGroup selectionMode="single" disallowEmptySelection defaultSelectedKeys={["day"]}>
      <ToggleButton id="day">Day</ToggleButton>
      <ToggleButton id="week">Week</ToggleButton>
      <ToggleButton id="month">Month</ToggleButton>
      <ToggleButton id="year" isDisabled>Year</ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const Disabled: Story = {
  args: {
    selectionMode: "single",
    disallowEmptySelection: true,
    defaultSelectedKeys: ["week"],
    isDisabled: true,
  },
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton id="day">Day</ToggleButton>
      <ToggleButton id="week">Week</ToggleButton>
      <ToggleButton id="month">Month</ToggleButton>
    </ToggleButtonGroup>
  ),
};
