import { useRef, useId, type ReactNode } from "react";
import { Check, ChevronDown, Search, X } from "../icons";
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
  TagGroup,
  TagList,
  Tag,
  useFilter,
  type Key,
} from "react-aria-components";
import type { FieldProps } from "../shared/Field";
import { Popover } from "../Popover/Popover";
import "./Autocomplete.css";

export interface AutocompleteProps<T extends object>
  extends Omit<RACSelectProps<T, "single" | "multiple">, "children">,
    FieldProps {
  /** The children (Autocomplete.Item elements). */
  children: React.ReactNode;

  /** Placeholder text shown when no item is selected. */
  placeholder?: string;

  /** Placeholder text for the search field inside the popover. */
  searchPlaceholder?: string;

  /** Content rendered before the value in single mode (e.g. an icon). */
  startAdornment?: ReactNode;
}

function AutocompleteRoot<T extends object>({
  label,
  description,
  errorMessage,
  children,
  placeholder,
  searchPlaceholder = "Search...",
  startAdornment,
  selectionMode,
  isDisabled,
  ...props
}: AutocompleteProps<T>) {
  const { contains } = useFilter({ sensitivity: "base" });
  const triggerRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const isMultiple = selectionMode === "multiple";

  return (
    <RACSelect placeholder={placeholder} selectionMode={selectionMode} isDisabled={isDisabled} {...props}>
      {label && <Label id={labelId}>{label}</Label>}

      {isMultiple ? (
        <Group
          ref={triggerRef}
          className="picker-trigger autocomplete-multi-trigger"
          aria-labelledby={label ? labelId : undefined}
          isDisabled={isDisabled}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest(".autocomplete-tag-remove")) return;
            if (target.closest(".autocomplete-multi-chevron")) return;
            (e.currentTarget.querySelector(".autocomplete-multi-chevron") as HTMLButtonElement)?.click();
          }}
        >
          <SelectValue<T>>
            {({ isPlaceholder, state }) => {
              if (isPlaceholder) {
                return (
                  <span className="autocomplete-multi-placeholder">{placeholder}</span>
                );
              }
              const items = state.selectedItems.map((node) => ({
                id: node.key,
                label: node.textValue,
              }));
              return (
                <TagGroup
                  aria-label="Selected items"
                  onRemove={(keys) => {
                    state.setValue(
                      (state.value as Key[]).filter((k) => !keys.has(k))
                    );
                  }}
                >
                  <TagList items={items} className="autocomplete-tag-list">
                    {(item) => (
                      <Tag
                        id={item.id}
                        textValue={item.label}
                        className="autocomplete-tag"
                      >
                        {item.label}
                        <Button
                          slot="remove"
                          className="autocomplete-tag-remove"
                          aria-label={`Remove ${item.label}`}
                        >
                          <X size={10} aria-hidden />
                        </Button>
                      </Tag>
                    )}
                  </TagList>
                </TagGroup>
              );
            }}
          </SelectValue>
          <Button className="autocomplete-multi-chevron" aria-label="Open">
            <ChevronDown size={16} aria-hidden />
          </Button>
        </Group>
      ) : (
        <Button className="picker-trigger autocomplete-trigger">
          {startAdornment && (
            <span className="autocomplete-adornment">{startAdornment}</span>
          )}
          <SelectValue />
          <ChevronDown size={16} aria-hidden />
        </Button>
      )}

      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>

      <Popover
        className="autocomplete-popover"
        {...(isMultiple && { triggerRef })}
      >
        <RACAutocomplete filter={contains}>
          <SearchField
            aria-label="Search"
            className="autocomplete-search"
            autoFocus
          >
            <Group className="autocomplete-search-input">
              <Search size={16} aria-hidden />
              <Input placeholder={searchPlaceholder} />
              <Button className="autocomplete-clear" slot="clear" aria-label="Clear search">
                <X size={14} aria-hidden />
              </Button>
            </Group>
          </SearchField>
          <ListBox
            className="listbox"
            renderEmptyState={() => (
              <span className="autocomplete-empty">No results found</span>
            )}
          >
            {children}
          </ListBox>
        </RACAutocomplete>
      </Popover>
    </RACSelect>
  );
}

// Autocomplete.Item
export type AutocompleteItemProps<T extends object = object> =
  ListBoxItemProps<T>;

function Item<T extends object>({ children, ...props }: AutocompleteItemProps<T>) {
  const textValue =
    props.textValue ?? (typeof children === "string" ? children : undefined);
  return (
    <ListBoxItem textValue={textValue} {...props}>
      {(renderProps) => (
        <>
          <Check size={14} aria-hidden className="listbox-check" />
          {typeof children === "function" ? children(renderProps) : children}
        </>
      )}
    </ListBoxItem>
  );
}

AutocompleteRoot.displayName = "Autocomplete";
Item.displayName = "Autocomplete.Item";

export const Autocomplete = Object.assign(AutocompleteRoot, { Item });
