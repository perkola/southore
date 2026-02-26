import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
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

test("renders tabs and selects first by default", async () => {
  await render(<ThreeTabs />);
  await expect.element(page.getByRole("tab", { name: "Overview" })).toBeVisible();
  await expect.element(page.getByRole("tab", { name: "Settings" })).toBeVisible();
  await expect.element(page.getByRole("tab", { name: "Activity" })).toBeVisible();
  await expect.element(page.getByText("Overview content")).toBeVisible();
});

test("clicking a tab shows its panel content", async () => {
  await render(<ThreeTabs />);
  await page.getByRole("tab", { name: "Settings" }).click();
  await expect.element(page.getByText("Settings content")).toBeVisible();
});

test("disabled tab cannot be selected", async () => {
  await render(
    <Tabs defaultSelectedKey="overview">
      <Tabs.TabList aria-label="Navigation">
        <Tabs.Tab id="overview">Overview</Tabs.Tab>
        <Tabs.Tab id="settings" isDisabled>Settings</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanel id="overview">Overview content</Tabs.TabPanel>
      <Tabs.TabPanel id="settings">Settings content</Tabs.TabPanel>
    </Tabs>,
  );
  await page.getByRole("tab", { name: "Settings" }).click({ force: true });
  await expect.element(page.getByText("Overview content")).toBeVisible();
});

test("defaultSelectedKey sets initial selection", async () => {
  await render(<ThreeTabs defaultSelectedKey="activity" />);
  await expect.element(page.getByText("Activity content")).toBeVisible();
});

test("screenshot: tabs default", async () => {
  const { container } = await render(
    <div style={{ padding: 16, width: 400 }}>
      <ThreeTabs />
    </div>,
  );
  await expect(container).toMatchScreenshot("tabs-default");
});

test("screenshot: tabs with disabled tab", async () => {
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
