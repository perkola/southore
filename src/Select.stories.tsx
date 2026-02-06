import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Select } from "./Select";

const meta = {
  component: Select,
  args: { onChange: fn() },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    children: [
      <Select.Item key="us" id="us">United States</Select.Item>,
      <Select.Item key="ca" id="ca">Canada</Select.Item>,
      <Select.Item key="mx" id="mx">Mexico</Select.Item>,
      <Select.Item key="uk" id="uk">United Kingdom</Select.Item>,
      <Select.Item key="de" id="de">Germany</Select.Item>,
      <Select.Item key="fr" id="fr">France</Select.Item>,
    ],
  },
};

export const WithDescription: Story = {
  args: {
    label: "Timezone",
    description: "Select your preferred timezone",
    placeholder: "Select timezone",
    children: [
      <Select.Item key="pst" id="pst">Pacific Time (PT)</Select.Item>,
      <Select.Item key="mst" id="mst">Mountain Time (MT)</Select.Item>,
      <Select.Item key="cst" id="cst">Central Time (CT)</Select.Item>,
      <Select.Item key="est" id="est">Eastern Time (ET)</Select.Item>,
    ],
  },
};

export const WithDisabledItems: Story = {
  args: {
    label: "Plan",
    placeholder: "Select a plan",
    children: [
      <Select.Item key="free" id="free">Free</Select.Item>,
      <Select.Item key="pro" id="pro">Pro</Select.Item>,
      <Select.Item key="enterprise" id="enterprise" isDisabled>Enterprise (Coming soon)</Select.Item>,
    ],
  },
};

export const Invalid: Story = {
  args: {
    label: "Category",
    placeholder: "Select a category",
    isInvalid: true,
    errorMessage: "Please select a category",
    children: [
      <Select.Item key="tech" id="tech">Technology</Select.Item>,
      <Select.Item key="health" id="health">Health</Select.Item>,
      <Select.Item key="finance" id="finance">Finance</Select.Item>,
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: "Category",
    placeholder: "Select a category",
    isDisabled: true,
    children: [
      <Select.Item key="tech" id="tech">Technology</Select.Item>,
      <Select.Item key="health" id="health">Health</Select.Item>,
    ],
  },
};
