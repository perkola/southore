# Accessibility Auditor Memory — Southore Design System

## Project Conventions (confirmed)
- React Aria Components wraps all interactive primitives — never reimplement ARIA natively
- Focus rings use `[data-focus-visible]` selector, NOT `:focus-visible`
- Disabled states use `[data-disabled]` selector, NOT `:disabled`
- Interactive states use `[data-hovered]`, `[data-pressed]`, `[data-selected]`, etc.
- Dark mode via `light-dark(lightVal, darkVal)` with `color-scheme: light dark` on `:root`
- Animations: only `Toast.css` has `prefers-reduced-motion` — all other animated components are missing it

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

### Open Issues
1. `DateFilter` trigger button `aria-controls` is missing linking trigger to popover

### Warnings (from original audit, still open)
1. Nearly all CSS files with animations are missing `prefers-reduced-motion` guards — only `Toast.css` has it
2. `Breadcrumbs` wraps `RACBreadcrumbs` in an extra `<nav>` — creates double navigation landmark since RAC renders its own `<nav>`
3. `ToggleButtonGroup` (small size) has 24px height — meets WCAG 2.5.8 minimum but not the 44px AAA target
4. `Button` (small size) has 24px height — same as above
5. `CheckboxGroup`/`RadioGroup` `FieldError` is always rendered (empty when no error) — minor screen reader noise
6. `Heading` component uses CSS class rather than accepting a `className` override that appends — the `className` prop is overwritten

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
- Focus rings universally use `[data-focus-visible]` (except TextArea — see issues)
- Disabled styles use `[data-disabled]`
- `FieldError` used for all form field errors (connected via React Aria automatically)
- `Label` + `Text[slot=description]` + `FieldError` pattern consistent across all field components
- Icons always have `aria-hidden` when decorative
- Toast region has correct `aria-label` and dismiss button has `aria-label="Dismiss notification"`
- Tooltip uses RAC `TooltipTrigger` (ARIA managed automatically)
- Select/Autocomplete use RAC `<Select>` (aria-haspopup, aria-expanded, aria-controls managed)
- Calendar uses RAC `<Calendar>` (grid role, cell navigation managed)
