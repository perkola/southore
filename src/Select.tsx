import { ChevronDown } from "./icons";
import {
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  SelectValue,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Label,
  Button,
  Text,
  FieldError,
  type ValidationResult,
} from "react-aria-components";
import { Popover } from "./Popover";
import "./Select.css";

export interface SelectProps<T extends object>
  extends Omit<RACSelectProps<T>, "children"> {
  /** A visible label for the select. */
  label?: string;
  /** A brief description shown below the select. */
  description?: string;
  /** An error message shown when the field is invalid. */
  errorMessage?: string | ((validation: ValidationResult) => string);
  /** The items to display in the select. */
  children: React.ReactNode;
  /** Placeholder text shown when no item is selected. */
  placeholder?: string;
}

function SelectRoot<T extends object>({
  label,
  description,
  errorMessage,
  children,
  placeholder,
  ...props
}: SelectProps<T>) {
  return (
    <RACSelect placeholder={placeholder} {...props}>
      {label && <Label>{label}</Label>}
      <Button className="select-trigger">
        <SelectValue />
        <ChevronDown size={16} aria-hidden />
      </Button>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="select-popover">
        <ListBox className="listbox">{children}</ListBox>
      </Popover>
    </RACSelect>
  );
}

export type SelectItemProps<T extends object = object> = ListBoxItemProps<T>;

function Item<T extends object>(props: SelectItemProps<T>) {
  return <ListBoxItem {...props} />;
}

SelectRoot.displayName = "Select";
Item.displayName = "Select.Item";

export const Select = Object.assign(SelectRoot, { Item });
