import {
  Tabs as RACTabs,
  TabList as RACTabList,
  Tab as RACTab,
  TabPanel as RACTabPanel,
  type TabsProps as RACTabsProps,
  type TabListProps as RACTabListProps,
  type TabProps as RACTabProps,
  type TabPanelProps as RACTabPanelProps,
} from "react-aria-components";
import "./Tabs.css";

export type TabsProps = RACTabsProps;
export type TabListProps<T extends object> = RACTabListProps<T>;
export type TabProps = RACTabProps;
export type TabPanelProps = RACTabPanelProps;

function TabsRoot(props: TabsProps) {
  return <RACTabs {...props} />;
}

function TabList<T extends object>(props: TabListProps<T>) {
  return <RACTabList {...props} />;
}

function Tab(props: TabProps) {
  return <RACTab {...props} />;
}

function TabPanel(props: TabPanelProps) {
  return <RACTabPanel {...props} />;
}

TabsRoot.displayName = "Tabs";
TabList.displayName = "Tabs.TabList";
Tab.displayName = "Tabs.Tab";
TabPanel.displayName = "Tabs.TabPanel";

export const Tabs = Object.assign(TabsRoot, { Tab, TabList, TabPanel });
