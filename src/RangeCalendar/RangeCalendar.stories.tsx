import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { getLocalTimeZone, isWeekend, parseDate, today } from "@internationalized/date";
import { useLocale } from "react-aria";
import { RangeCalendar } from "./RangeCalendar";

const meta = {
  component: RangeCalendar,
  decorators: [
    (Story) => (
      <div style={{ padding: 8 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof RangeCalendar>;

export default meta;
type Story = StoryObj<typeof RangeCalendar>;

export const Default: Story = {
  args: {
    "aria-label": "Date range",
  },
};

export const WithValue: Story = {
  args: {
    "aria-label": "Date range",
    defaultValue: {
      start: parseDate("2025-03-10"),
      end: parseDate("2025-03-20"),
    },
  },
};

export const SingleDay: Story = {
  args: {
    "aria-label": "Date range",
    defaultValue: {
      start: parseDate("2025-03-15"),
      end: parseDate("2025-03-15"),
    },
  },
};

export const MinMaxDates: Story = {
  args: {
    "aria-label": "Trip dates",
    minValue: today(getLocalTimeZone()),
    maxValue: today(getLocalTimeZone()).add({ months: 2 }),
  },
};

export const UnavailableDates: Story = {
  render: (args) => {
    const { locale } = useLocale();
    return (
      <RangeCalendar
        {...args}
        aria-label="Trip dates"
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
    "aria-label": "Date range",
    isInvalid: true,
    errorMessage: "Selected range contains unavailable dates.",
    defaultValue: {
      start: parseDate("2025-03-10"),
      end: parseDate("2025-03-20"),
    },
  },
};
