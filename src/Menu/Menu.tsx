import type { ReactNode } from "react";
import {
  MenuTrigger as RACMenuTrigger,
  type MenuTriggerProps as RACMenuTriggerProps,
  Menu as RACMenu,
  type MenuProps as RACMenuProps,
  MenuItem as RACMenuItem,
  type MenuItemProps as RACMenuItemProps,
  MenuSection as RACMenuSection,
  type MenuSectionProps as RACMenuSectionProps,
  Separator as RACSeparator,
  type SeparatorProps as RACSeparatorProps,
  Header,
} from "react-aria-components";
import "./Menu.css";

// Menu
export type MenuProps<T extends object> = RACMenuProps<T>;

function MenuRoot<T extends object>(props: MenuProps<T>) {
  return <RACMenu {...props} />;
}

// Menu.Trigger
export type MenuTriggerProps = RACMenuTriggerProps;

function Trigger(props: MenuTriggerProps) {
  return <RACMenuTrigger {...props} />;
}

// Menu.Item
export type MenuItemProps<T extends object = object> = RACMenuItemProps<T>;

function Item<T extends object>(props: MenuItemProps<T>) {
  return <RACMenuItem {...props} />;
}

// Menu.Section
export interface MenuSectionProps<T extends object> extends Omit<
  RACMenuSectionProps<T>,
  "children"
> {
  /** Optional header text for the section. */
  header?: string;
  children?: ReactNode;
}

function Section<T extends object>({
  header,
  children,
  ...props
}: MenuSectionProps<T>) {
  return (
    <RACMenuSection {...props}>
      {header && <Header>{header}</Header>}
      {children}
    </RACMenuSection>
  );
}

// Menu.Separator
export type MenuSeparatorProps = RACSeparatorProps;

function Separator(props: MenuSeparatorProps) {
  return <RACSeparator {...props} />;
}

// Set display names for dev tools
MenuRoot.displayName = "Menu";
Trigger.displayName = "Menu.Trigger";
Item.displayName = "Menu.Item";
Section.displayName = "Menu.Section";
Separator.displayName = "Menu.Separator";

// Compound component
export const Menu = Object.assign(MenuRoot, {
  Trigger,
  Item,
  Section,
  Separator,
});
