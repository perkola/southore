import { ChevronDown, Search, X } from "./icons";
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
  Autocomplete as RACAutocomplete,
  SearchField,
  Input,
  Group,
  useFilter,
} from "react-aria-components";
import type { FieldProps } from "./Field";
import { Popover } from "./Popover";
import "./Field.css";
import "./Autocomplete.css";

export interface AutocompleteProps<T extends object>
  extends Omit<RACSelectProps<T>, "children">, FieldProps {
  /** The children (Autocomplete.Item elements). */
  children: React.ReactNode;

  /** Placeholder text shown when no item is selected. */
  placeholder?: string;

  /** Placeholder text for the search field inside the popover. */
  searchPlaceholder?: string;
}

function AutocompleteRoot<T extends object>({
  label,
  description,
  errorMessage,
  children,
  placeholder,
  searchPlaceholder = "Search...",
  ...props
}: AutocompleteProps<T>) {
  const { contains } = useFilter({ sensitivity: "base" });

  return (
    <RACSelect placeholder={placeholder} {...props}>
      {label && <Label>{label}</Label>}
      <Button className="autocomplete-trigger">
        <SelectValue />
        <ChevronDown size={16} aria-hidden />
      </Button>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="autocomplete-popover">
        <RACAutocomplete filter={contains}>
          <SearchField
            aria-label="Search"
            className="autocomplete-search"
            autoFocus
          >
            <Group className="autocomplete-search-input">
              <Search size={16} aria-hidden />
              <Input placeholder={searchPlaceholder} />
              <Button className="autocomplete-clear">
                <X size={14} aria-hidden />
              </Button>
            </Group>
          </SearchField>
          <ListBox className="listbox">{children}</ListBox>
        </RACAutocomplete>
      </Popover>
    </RACSelect>
  );
}

// Autocomplete.Item
export type AutocompleteItemProps<T extends object = object> =
  ListBoxItemProps<T>;

function Item<T extends object>(props: AutocompleteItemProps<T>) {
  return <ListBoxItem {...props} />;
}

// Set display names for dev tools
AutocompleteRoot.displayName = "Autocomplete";
Item.displayName = "Autocomplete.Item";

// Compound component
export const Autocomplete = Object.assign(AutocompleteRoot, {
  Item,
});
