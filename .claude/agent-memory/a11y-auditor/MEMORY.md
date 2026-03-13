# Accessibility Auditor Memory — Southore Design System

## Project Conventions (confirmed)
- React Aria Components wraps all interactive primitives — never reimplement ARIA natively
- Focus rings use `[data-focus-visible]` selector, NOT `:focus-visible`
- Disabled states use `[data-disabled]` selector, NOT `:disabled`
- Interactive states use `[data-hovered]`, `[data-pressed]`, `[data-selected]`, etc.
- Dark mode via `light-dark(lightVal, darkVal)` with `color-scheme: light dark` on `:root`
- Animations: `prefers-reduced-motion` guards present in `Toast.css`, `Popover.css`, `Tooltip.css`, `Switch.css`, `Calendar.css` — all animated components covered

## Verified Contrast Ratios (light/dark)
- `--color-text` (gray-900 #1a1a24) on `--color-bg` (white): ~17:1 — PASS
- `--color-text-muted` (gray-700 #40404e) on `--color-bg` (white): ~9.1:1 — PASS
- `--color-text-subtle` (gray-600 #575766) on `--color-bg` (white): ~6.4:1 — PASS
- `--color-text-subtle` dark (gray-400 #9494a2) on `--color-bg` dark (gray-950 #0d0d14): ~5.3:1 — PASS
- `--color-primary` (violet-600 #911879) on white: ~5.5:1 — PASS (AA)
- `--color-primary` dark (violet-400 #cf58b8) on gray-950: ~5.2:1 — PASS (AA)
- `--color-error` (red-700 #a8130a) on white: ~7.4:1 — PASS
- `--color-error` dark (red-300 #ff9088) on gray-950: ~7.8:1 — PASS
- `--color-warning` (amber-700 #9e4700) on white: ~5.6:1 — PASS
- `--color-warning` dark (amber-400 #ff9a22) on gray-950: ~8.2:1 — PASS
- `--color-success` dark (green-400 #38c274) on gray-950: ~7.9:1 — PASS
- Badge amber: warning on amber-100 (#ffefd0) = ~4.7:1 — PASS (barely)
- Badge green: success (green-700 #0c6532) on green-100 (#d3f5e2) = ~6.2:1 — PASS
- `--color-text-disabled` (gray-400 #9494a2) on white: ~3.0:1 — FAILS AA 4.5:1 for normal text (acceptable for disabled per WCAG exception)
- Button small (24px height): below 44px AAA target but meets 24px WCAG 2.5.8 AA minimum
- Autocomplete tag text (gray-900 #1a1a24) on tag bg (gray-50 #f7f7f8): ~17:1 — PASS
- Autocomplete tag border light: gray-500 (#717181) on gray-50 (#f7f7f8): 3.98:1 — PASS (fixed 2026-03-13)
- Autocomplete tag border dark: gray-500 (#717181) on gray-900 (#1a1a24): 3.73:1 — PASS (fixed 2026-03-13)
- Autocomplete tag hover border light: gray-600 (#575766) on gray-100 (#ededf0): 4.92:1 — PASS
- Autocomplete tag hover border dark: gray-400 (#9494a2) on gray-800 (#2c2c38): 4.28:1 — PASS
- `--color-text-subtle` (gray-600 #575766) on gray-50 (tag bg): ~6.4:1 — PASS (tag remove icon)

## Known Issues (status as of re-audit 2026-03-08)
See `audit-2026-03-08.md` for full original findings.

### Critical Issues — RESOLVED (verified 2026-03-08)
- CRIT-01: TextArea.css `[data-focused]` → `[data-focus-visible]` — FIXED
- CRIT-02: DatePicker calendar button `aria-label="Open calendar"` — FIXED
- CRIT-03: DateRangePicker calendar button `aria-label="Open calendar"` — FIXED
- CRIT-04: Calendar prev/next buttons `aria-label="Previous/Next month"` — FIXED
- CRIT-05: RangeCalendar prev/next buttons `aria-label="Previous/Next month"` — FIXED
- CRIT-06: Autocomplete clear button `aria-label="Clear search"` + `slot="clear"` — FIXED
- CRIT-07: Card title renders as `h{n}` via `titleLevel` prop (default h3) — FIXED; CSS resets heading UA styles correctly

### Open Issues (updated 2026-03-13, final audit)
1. `DateFilter` trigger button `aria-controls` is missing linking trigger to popover
2. ~~Autocomplete tag border light fails 3:1~~ — FIXED
3. ~~Autocomplete tag remove button 20px~~ — FIXED
4. ~~Autocomplete Group missing accessible name when `aria-label` used~~ — FIXED
5. ~~Chevron focus cascade fragile~~ — FIXED
6. ~~Chevron `isDisabled` missing~~ — FIXED
7. ~~Clear button 20px~~ — FIXED
8. ~~TagGroup `isDisabled` missing~~ — FIXED: `isDisabled` on each `<Tag>` + `onRemove` guard — VERIFIED 2026-03-13
9. ~~Missing `prefers-reduced-motion` on Autocomplete elements~~ — FIXED: all four selectors covered — VERIFIED 2026-03-13
10. **OPEN (NEW, 2026-03-13)**: Autocomplete disabled multi-trigger — tag pills have no visual disabled state. `.autocomplete-tag[data-disabled]` CSS rule missing. `[data-disabled]` on the outer Group does not cascade to tag color/border/bg. Fix: add `.autocomplete-multi-trigger[data-disabled] .autocomplete-tag` and `.autocomplete-multi-trigger[data-disabled] .autocomplete-tag-remove` CSS rules. WCAG 1.4.1 / 1.3.3.
11. **OPEN (pre-existing, tracked)**: `.picker-trigger` base transition in `PickerTrigger.css` has no `prefers-reduced-motion` guard — affects Autocomplete single trigger, Select, DateFilter.

### Warnings (from original audit)
1. ~~Missing `prefers-reduced-motion` guards~~ — FIXED (2026-03-08): guards added to `Popover.css`, `Tooltip.css`, `Switch.css`, `Calendar.css`
2. ~~`Breadcrumbs` double `<nav>`~~ — FALSE POSITIVE (2026-03-08): `RACBreadcrumbs` renders `<ol>`, outer `<nav>` is correct per RAC docs
3. ~~`Heading` `className` prop overwritten~~ — FIXED (2026-03-08): now merges consumer className with "heading"
4. `ToggleButtonGroup` / `Button` (small size) 24px height — accepted at WCAG 2.5.8 AA minimum; by design
5. `CheckboxGroup`/`RadioGroup` `FieldError` always rendered — acceptable; React Aria renders nothing for empty children

## RAC Audit Methodology — Lessons Learned

### Compound components vs standalone Popover (verified 2026-03-08)
RAC has two distinct Popover patterns — confusing them leads to false findings:

**Standalone Popover** (custom trigger + arbitrary content): requires an explicit `<Dialog>` wrapper inside `<Popover>` so RAC can inject the correct `role="dialog"` and focus management.
```tsx
<Popover><Dialog>...</Dialog></Popover>
```

**RAC compound components** (DatePicker, DateRangePicker, Select, ComboBox, etc.): RAC handles dialog semantics internally. The correct pattern is `<Popover><Calendar /></Popover>` with NO `<Dialog>` wrapper. Adding one would be wrong.
```tsx
// DatePicker / DateRangePicker — correct, no Dialog needed
<Popover><Calendar /></Popover>
```

**Rule:** Before raising any finding about a missing/extra ARIA wrapper inside a RAC compound component, verify the expected API in the RAC MCP docs. Never rely on training knowledge for this — the standalone vs compound distinction is easy to conflate.

## Patterns Done Correctly (skip re-checking)
- All interactive components use React Aria primitives (no custom ARIA reimplementation)
- `Breadcrumbs` outer `<nav aria-label>` wrapper is correct — `RACBreadcrumbs` renders an `<ol>`, not a `<nav>`; RAC docs explicitly recommend the consumer add the `<nav>` landmark
- Focus rings universally use `[data-focus-visible]` — TextArea fix confirmed 2026-03-08
- Disabled styles use `[data-disabled]`
- `FieldError` used for all form field errors (connected via React Aria automatically)
- `Label` + `Text[slot=description]` + `FieldError` pattern consistent across all field components
- Icons always have `aria-hidden` when decorative
- Toast region has correct `aria-label` and dismiss button has `aria-label="Dismiss notification"`
- Tooltip uses RAC `TooltipTrigger` (ARIA managed automatically)
- Select/Autocomplete use RAC `<Select>` (aria-haspopup, aria-expanded, aria-controls managed)
- Calendar uses RAC `<Calendar>` (grid role, cell navigation managed)
