import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Tabs } from "./Tabs";

function ThreeTabs({ defaultSelectedKey }: { defaultSelectedKey?: string }) {
  return (
    <Tabs defaultSelectedKey={defaultSelectedKey ?? "overview"}>
      <Tabs.TabList aria-label="Navigation">
        <Tabs.Tab id="overview">Overview</Tabs.Tab>
        <Tabs.Tab id="settings">Settings</Tabs.Tab>
        <Tabs.Tab id="activity">Activity</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanel id="overview">Overview content</Tabs.TabPanel>
      <Tabs.TabPanel id="settings">Settings content</Tabs.TabPanel>
      <Tabs.TabPanel id="activity">Activity content</Tabs.TabPanel>
    </Tabs>
  );
}

test("tabs default", async () => {
  const { container } = await render(
    <div style={{ padding: 16, width: 400 }}>
      <ThreeTabs />
    </div>,
  );
  await expect(container).toMatchScreenshot("tabs-default");
});

test("tabs with disabled tab", async () => {
  const { container } = await render(
    <div style={{ padding: 16, width: 400 }}>
      <Tabs defaultSelectedKey="overview">
        <Tabs.TabList aria-label="Navigation">
          <Tabs.Tab id="overview">Overview</Tabs.Tab>
          <Tabs.Tab id="settings" isDisabled>Settings</Tabs.Tab>
          <Tabs.Tab id="activity">Activity</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanel id="overview">Overview content</Tabs.TabPanel>
        <Tabs.TabPanel id="settings">Settings content</Tabs.TabPanel>
        <Tabs.TabPanel id="activity">Activity content</Tabs.TabPanel>
      </Tabs>
    </div>,
  );
  await expect(container).toMatchScreenshot("tabs-disabled-tab");
});
