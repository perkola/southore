import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect, userEvent } from "storybook/test";
import { NumberField } from "./NumberField";

const meta = {
  component: NumberField,
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Quantity",
    defaultValue: 1,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Quantity",
    description: "Enter a number between 1 and 100",
    defaultValue: 10,
    minValue: 1,
    maxValue: 100,
  },
};

export const WithCurrencyAdornment: Story = {
  args: {
    label: "Price",
    startAdornment: "$",
    defaultValue: 99.99,
    formatOptions: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
};

export const WithUnitAdornment: Story = {
  args: {
    label: "Weight",
    endAdornment: "kg",
    defaultValue: 5,
    minValue: 0,
    step: 0.5,
  },
};

export const HiddenStepper: Story = {
  args: {
    label: "Year",
    hideStepper: true,
    defaultValue: 2024,
    minValue: 1900,
    maxValue: 2100,
  },
};

export const WithStep: Story = {
  args: {
    label: "Quantity (step 5)",
    defaultValue: 10,
    step: 5,
    minValue: 0,
    maxValue: 100,
  },
};

export const Disabled: Story = {
  args: {
    label: "Quantity",
    defaultValue: 5,
    isDisabled: true,
  },
};

export const Invalid: Story = {
  args: {
    label: "Quantity",
    defaultValue: 150,
    maxValue: 100,
    isInvalid: true,
    errorMessage: "Value must be 100 or less",
  },
};

export const MinMaxBoundary: Story = {
  args: {
    label: "Bounded (0-5)",
    defaultValue: 5,
    minValue: 0,
    maxValue: 5,
  },
  play: async ({ canvas }) => {
    const incrementButton = canvas.getByRole("button", { name: /increment/i });
    const decrementButton = canvas.getByRole("button", { name: /decrement/i });

    // At max value, increment should be disabled
    await expect(incrementButton).toHaveAttribute("data-disabled", "true");

    // Click decrement to go to 4
    await userEvent.click(decrementButton);

    // Now increment should be enabled
    await expect(incrementButton).not.toHaveAttribute("data-disabled", "true");
  },
};
