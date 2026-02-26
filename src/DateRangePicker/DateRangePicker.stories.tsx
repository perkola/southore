import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { getLocalTimeZone, isWeekend, parseDate, today } from "@internationalized/date";
import { useLocale } from "react-aria";
import { DateRangePicker } from "./DateRangePicker";

const meta = {
  component: DateRangePicker,
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: {
    label: "Date range",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Trip dates",
    description: "Select your check-in and check-out dates",
  },
};

export const WithValue: Story = {
  args: {
    label: "Date range",
    defaultValue: {
      start: parseDate("2025-03-10"),
      end: parseDate("2025-03-20"),
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Date range",
    isDisabled: true,
    defaultValue: {
      start: parseDate("2025-03-10"),
      end: parseDate("2025-03-20"),
    },
  },
};

export const MinMaxDates: Story = {
  args: {
    label: "Trip dates",
    minValue: today(getLocalTimeZone()),
    maxValue: today(getLocalTimeZone()).add({ months: 2 }),
  },
};

export const UnavailableDates: Story = {
  render: (args) => {
    const { locale } = useLocale();
    return (
      <DateRangePicker
        {...args}
        label="Trip dates"
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
    label: "Date range",
    isInvalid: true,
    defaultValue: {
      start: parseDate("2025-03-10"),
      end: parseDate("2025-03-20"),
    },
    errorMessage: "Please select a valid date range.",
  },
};
