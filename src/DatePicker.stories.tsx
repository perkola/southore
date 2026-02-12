import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { getLocalTimeZone, isWeekend, parseDate, today } from "@internationalized/date";
import { useLocale } from "react-aria";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  tags: ["autodocs"],
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: "Date",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Appointment",
    description: "Select your preferred appointment date",
  },
};

export const Disabled: Story = {
  args: {
    label: "Date",
    isDisabled: true,
    defaultValue: parseDate("2024-03-15"),
  },
};

export const MinMaxDates: Story = {
  args: {
    label: "Appointment date",
    minValue: today(getLocalTimeZone()),
    maxValue: today(getLocalTimeZone()).add({ months: 1 }),
  },
};

export const UnavailableDates: Story = {
  render: (args) => {
    const { locale } = useLocale();
    return (
      <DatePicker
        {...args}
        label="Appointment date"
        isDateUnavailable={(date) => isWeekend(date, locale)}
      />
    );
  },
  args: {
    onChange: fn(),
  },
};

export const Invalid: Story = {
  args: {
    label: "Date",
    isInvalid: true,
    defaultValue: parseDate("2024-03-15"),
    errorMessage: "Please select a valid date",
  },
};
