import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Tabs } from "./Tabs";

const meta = {
  component: Tabs,
  args: { onSelectionChange: fn() },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Tabs.TabList aria-label="Navigation">
          <Tabs.Tab id="overview">Overview</Tabs.Tab>
          <Tabs.Tab id="settings">Settings</Tabs.Tab>
          <Tabs.Tab id="activity">Activity</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanel id="overview">Overview content</Tabs.TabPanel>
        <Tabs.TabPanel id="settings">Settings content</Tabs.TabPanel>
        <Tabs.TabPanel id="activity">Activity content</Tabs.TabPanel>
      </>
    ),
  },
};

export const WithDisabledTab: Story = {
  args: {
    children: (
      <>
        <Tabs.TabList aria-label="Navigation">
          <Tabs.Tab id="overview">Overview</Tabs.Tab>
          <Tabs.Tab id="settings" isDisabled>Settings</Tabs.Tab>
          <Tabs.Tab id="activity">Activity</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanel id="overview">Overview content</Tabs.TabPanel>
        <Tabs.TabPanel id="settings">Settings content</Tabs.TabPanel>
        <Tabs.TabPanel id="activity">Activity content</Tabs.TabPanel>
      </>
    ),
  },
};

export const Controlled: Story = {
  args: {
    selectedKey: "settings",
    children: (
      <>
        <Tabs.TabList aria-label="Navigation">
          <Tabs.Tab id="overview">Overview</Tabs.Tab>
          <Tabs.Tab id="settings">Settings</Tabs.Tab>
          <Tabs.Tab id="activity">Activity</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanel id="overview">Overview content</Tabs.TabPanel>
        <Tabs.TabPanel id="settings">Settings content</Tabs.TabPanel>
        <Tabs.TabPanel id="activity">Activity content</Tabs.TabPanel>
      </>
    ),
  },
};
