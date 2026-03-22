import React, { useRef, useId, useState, useEffect, type ReactNode } from "react";
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

function CollapsibleTagList({
  items,
  isDisabled,
  onRemove,
}: {
  items: Array<{ id: Key; label: string }>;
  isDisabled?: boolean;
  onRemove: (keys: Set<Key>) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);

  useEffect(() => {
    const container = containerRef.current;
    const measureRow = measureRef.current;
    if (!container || !measureRow) return;

    const computeVisible = () => {
      const containerWidth = container.clientWidth;
      const spans = Array.from(measureRow.querySelectorAll("[data-measure-tag]")) as HTMLElement[];
      const counterPill = measureRow.querySelector("[data-measure-counter]") as HTMLElement | null;
      const counterWidth = counterPill ? counterPill.offsetWidth + 4 : 0;
      const gap = 4;

      let count = 0;
      let usedWidth = 0;
      for (let i = 0; i < spans.length; i++) {
        const w = spans[i].offsetWidth;
        const needed = usedWidth + (count > 0 ? gap : 0) + w;
        const remaining = spans.length - count - 1;
        const available = containerWidth - (remaining > 0 ? counterWidth : 0);
        if (needed > available && count > 0) break;
        usedWidth = needed;
        count++;
      }
      setVisibleCount(count);
    };

    computeVisible();
    const observer = new ResizeObserver(computeVisible);
    observer.observe(container);
    return () => observer.disconnect();
  }, [items]);

  const overflowCount = items.length - visibleCount;
  const displayItems = items.slice(0, visibleCount);

  return (
    <div ref={containerRef} className="autocomplete-collapsed-tags">
      <div ref={measureRef} className="autocomplete-measure" aria-hidden>
        {items.map((item) => (
          <span key={item.id} data-measure-tag className="autocomplete-tag">
            {item.label}
            <span className="autocomplete-tag-remove-spacer" />
          </span>
        ))}
        <span data-measure-counter className="autocomplete-overflow-pill">
          +{items.length}
        </span>
      </div>
      <TagGroup aria-label="Selected items" onRemove={onRemove}>
        <TagList items={displayItems} className="autocomplete-tag-list">
          {(item) => (
            <Tag
              id={item.id}
              textValue={item.label}
              className="autocomplete-tag"
              isDisabled={isDisabled}
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
      {overflowCount > 0 && (
        <span
          role="status"
          className="autocomplete-overflow-pill"
          aria-label={`${overflowCount} more selected`}
        >
          +{overflowCount}
        </span>
      )}
    </div>
  );
}

export interface AutocompleteProps<T extends object>
  extends Omit<RACSelectProps<T, "single" | "multiple">, "children">, FieldProps {
  /** The children (Autocomplete.Item elements). */
  children: React.ReactNode;

  /** Placeholder text shown when no item is selected. */
  placeholder?: string;

  /** Placeholder text for the search field inside the popover. */
  searchPlaceholder?: string;

  /** Content rendered before the value in single mode (e.g. an icon). */
  startAdornment?: ReactNode;

  /** When true in multi-select mode, tags collapse to a single row with a "+N" overflow indicator. */
  collapseTags?: boolean;
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
  collapseTags,
  ...props
}: AutocompleteProps<T>) {
  const ariaLabel = props["aria-label"];
  const { contains } = useFilter({ sensitivity: "base" });
  const triggerRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const isMultiple = selectionMode === "multiple";
  const [triggerWidth, setTriggerWidth] = useState(0);

  useEffect(() => {
    if (!isMultiple || !triggerRef.current) return;
    const el = triggerRef.current;
    const observer = new ResizeObserver(() => setTriggerWidth(el.offsetWidth));
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMultiple]);

  return (
    <RACSelect
      placeholder={placeholder}
      selectionMode={selectionMode}
      isDisabled={isDisabled}
      {...props}
    >
      {label && <Label id={labelId}>{label}</Label>}

      {isMultiple ? (
        <Group
          ref={triggerRef}
          className="picker-trigger autocomplete-multi-trigger"
          aria-labelledby={label ? labelId : undefined}
          aria-label={!label ? ariaLabel : undefined}
          isDisabled={isDisabled}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest(".autocomplete-tag-remove")) return;
            if (target.closest(".autocomplete-multi-chevron")) return;
            (
              e.currentTarget.querySelector(".autocomplete-multi-chevron") as HTMLButtonElement
            )?.click();
          }}
        >
          <SelectValue<T>>
            {({ isPlaceholder, state }) => {
              if (isPlaceholder) {
                return <span className="autocomplete-multi-placeholder">{placeholder}</span>;
              }
              const items = state.selectedItems.map((node) => ({
                id: node.key,
                label: node.textValue,
              }));
              const handleRemove = (keys: Set<Key>) => {
                if (isDisabled) return;
                state.setValue((state.value as Key[]).filter((k) => !keys.has(k)));
              };
              if (collapseTags) {
                return (
                  <CollapsibleTagList
                    items={items}
                    isDisabled={isDisabled}
                    onRemove={handleRemove}
                  />
                );
              }
              return (
                <TagGroup aria-label="Selected items" onRemove={handleRemove}>
                  <TagList items={items} className="autocomplete-tag-list">
                    {(item) => (
                      <Tag
                        id={item.id}
                        textValue={item.label}
                        className="autocomplete-tag"
                        isDisabled={isDisabled}
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
          <Button className="autocomplete-multi-chevron" aria-label="Open" isDisabled={isDisabled}>
            <ChevronDown size={16} aria-hidden />
          </Button>
        </Group>
      ) : (
        <Button className="picker-trigger autocomplete-trigger">
          {startAdornment && <span className="autocomplete-adornment">{startAdornment}</span>}
          <SelectValue />
          <ChevronDown size={16} aria-hidden />
        </Button>
      )}

      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>

      <Popover
        className="autocomplete-popover"
        {...(isMultiple && {
          triggerRef,
          style: { "--trigger-width": `${triggerWidth}px` } as React.CSSProperties,
        })}
      >
        <RACAutocomplete filter={contains}>
          <SearchField aria-label="Search" className="autocomplete-search" autoFocus>
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
            renderEmptyState={() => <span className="autocomplete-empty">No results found</span>}
          >
            {children}
          </ListBox>
        </RACAutocomplete>
      </Popover>
    </RACSelect>
  );
}

// Autocomplete.Item
export type AutocompleteItemProps<T extends object = object> = ListBoxItemProps<T>;

function Item<T extends object>({ children, ...props }: AutocompleteItemProps<T>) {
  const textValue = props.textValue ?? (typeof children === "string" ? children : undefined);
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
