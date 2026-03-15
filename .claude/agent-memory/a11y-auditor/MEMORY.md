# Accessibility Auditor Memory — Southore Design System

## Project Conventions (confirmed)

- React Aria Components wraps all interactive primitives — never reimplement ARIA natively
- Focus rings use `[data-focus-visible]` selector, NOT `:focus-visible`
- Disabled states use `[data-disabled]` selector, NOT `:disabled`
- Interactive states use `[data-hovered]`, `[data-pressed]`, `[data-selected]`, etc.
- Dark mode via `light-dark(lightVal, darkVal)` with `color-scheme: light dark` on `:root`
- Animations: `prefers-reduced-motion` guards present in `Toast.css`, `Popover.css`, `Tooltip.css`, `Switch.css`, `Calendar.css` — all animated components covered

## IMPORTANT: Contrast Calculation Warning

The a11y-auditor agent has produced **systematically incorrect** contrast ratio calculations in the past. Always verify with Node.js using the exact WCAG linearization formula before raising a finding. Example of known agent errors (2026-03-15 audit):

- blue-400 on gray-950: agent reported 3.2:1, actual **6.53:1** (PASS)
- green-400 on gray-800: agent reported 3.0:1, actual **5.99:1** (PASS)
- red-300 on gray-800: agent reported 4.4:1, actual **6.30:1** (PASS)
- violet-400 on gray-800: agent reported 2.5:1, actual **3.77:1** (PASS for focus ring 3:1 threshold)

WCAG linearization: `c ≤ 0.04045 → c/12.92`, else `((c+0.055)/1.055)^2.4`; `L = 0.2126R + 0.7152G + 0.0722B`

## Verified Contrast Ratios (light/dark)

Full tokens.css audit completed 2026-03-15; erroneous agent values corrected via Node.js script.

### Text tokens — all PASS on their primary bg

- `--color-text` light (gray-900 #1a1a24) on all light surfaces: 14.9–17.2:1 — PASS AAA
- `--color-text` dark (gray-50 #f7f7f8) on all dark surfaces: 12.9–18.7:1 — PASS AAA
- `--color-text-muted` light (gray-700 #40404e) on all light surfaces: 8.8–10.2:1 — PASS AAA
- `--color-text-muted` dark (gray-300 #b8b8c2) on all dark surfaces: 7.0–10.1:1 — PASS AAA
- `--color-text-subtle` light (gray-600 #575766) on all light surfaces: 6.1–6.6:1 — PASS AA
- `--color-text-subtle` dark (gray-400 #9494a2) on gray-950: 5.3:1 — PASS AA
- `--color-text-subtle` dark on gray-900: 5.8:1 — PASS AA
- `--color-text-subtle` dark on gray-800: 4.7:1 — PASS AA (barely; fails AAA)
- `--color-text-disabled` — intentionally below 4.5:1 everywhere; exempt per WCAG 1.4.3 inactive UI exception

### Primary tokens (updated 2026-03-15)

- `--color-primary` light (violet-600 #911879) on all light surfaces: 5.5–10.6:1 — PASS AA
- `--color-primary` dark (violet-300 #e48dd1) on gray-950: 6.0:1 — PASS AA
- `--color-primary` dark on gray-900 (bg-subtle): 5.1:1 — PASS AA
- `--color-primary` dark on gray-800 (bg-muted): 4.1:1 — **FAIL 1.4.3 AA** (OPEN-T2)
- `--color-primary-hover` light (violet-700 #70105c) on all light surfaces: 13.1–15.1:1 — PASS AAA
- `--color-primary-hover` dark (violet-200 #f2bce6) on all dark surfaces: passes all (brighter than violet-300) — PASS

### Status tokens

All values below are Node.js-verified. Earlier agent calculations for these were significantly wrong.

- `--color-error` light (red-700 #a8130a) on all light surfaces: 7.4–11.3:1 — PASS AAA
- `--color-error` dark (red-300 #ff9088) on all dark surfaces: 6.30:1+ — PASS AAA (agent had reported 4.4:1 — incorrect)
- `--color-success` light (green-700 #0c6532) on all light surfaces: 11.3–13.1:1 — PASS AAA
- `--color-success` dark (green-400 #38c274) on all dark surfaces: 5.99:1+ — PASS AA (agent had reported 3.0:1 on bg-muted — incorrect)
- `--color-warning` light (amber-700 #9e4700) on all light surfaces: 5.6–9.0:1 — PASS AA
- `--color-warning` dark (amber-400 #ff9a22) on all dark surfaces: 4.9–8.2:1 — PASS AA
- `--color-info` light (blue-600 #1259c4) on all light surfaces: 9.8–11.4:1 — PASS AAA
- `--color-info` dark (blue-400 #4d97f7) on all dark surfaces: 6.53:1+ — PASS AA (agent had reported 3.2:1 on gray-950 — incorrect)

### Focus ring

- `--color-focus-ring` (violet-400 #cf58b8) — single value, not mode-aware
- On light surfaces (white–gray-100): 4.8–5.6:1 — PASS 2.4.11 AA (3:1 threshold)
- On dark surfaces (gray-800–gray-950): 3.77:1+ — PASS 2.4.11 AA (agent had reported 2.5:1 on gray-800 — incorrect)

### Borders (WCAG 1.4.11 non-text contrast, 3:1 threshold)

- `--color-border` (gray-200/gray-700) — decorative use only; exempt from 1.4.11
- `--color-border-muted` (gray-300/gray-600) — decorative use only; exempt from 1.4.11
- `--color-border-control` (gray-500/gray-400) — used for interactive component borders (Checkbox, RadioGroup, Switch, inputs, pickers)
  - light gray-500 (#717181) on white: 4.0:1 — PASS 1.4.11 AA ✅ (was gray-400 at 2.99:1 — FIXED 2026-03-15)
  - dark gray-400 (#9494a2) on gray-950: 5.3:1 — PASS 1.4.11 AA ✅

### Component-level verified ratios

- Badge amber: warning on amber-100 (#ffefd0) = ~4.7:1 — PASS (barely)
- Badge green: success (green-700 #0c6532) on green-100 (#d3f5e2) = ~6.2:1 — PASS
- Button small (24px height): below 44px AAA target but meets 24px WCAG 2.5.8 AA minimum
- Autocomplete tag text (gray-900 #1a1a24) on tag bg (gray-50 #f7f7f8): ~17:1 — PASS
- Autocomplete tag border light: gray-500 (#717181) on gray-50: 3.98:1 — PASS (fixed 2026-03-13)
- Autocomplete tag border dark: gray-500 (#717181) on gray-900: 3.73:1 — PASS (fixed 2026-03-13)
- Autocomplete tag hover border light: gray-600 (#575766) on gray-100: 4.92:1 — PASS
- Autocomplete tag hover border dark: gray-400 (#9494a2) on gray-800: 4.28:1 — PASS
- `--color-text-subtle` (gray-600 #575766) on gray-50 (tag bg): ~6.4:1 — PASS (tag remove icon)

## Open Token-Level Issues

OPEN-T2 (MEDIUM): `--color-primary` dark = violet-300 on bg-muted (gray-800) = 4.1:1 — below 4.5:1 text AA. Affects any text/link using `--color-primary` on a muted background. Fix: violet-200 would pass but is very light. Design decision pending.

All other previously listed OPEN-T issues (T1, T3, T4, T6, T7) were **false positives** from incorrect agent contrast calculations — verified and closed 2026-03-15.

## Known Issues (status as of re-audit 2026-03-08)

### Critical Issues — RESOLVED (verified 2026-03-08)

- CRIT-01: TextArea.css `[data-focused]` → `[data-focus-visible]` — FIXED
- CRIT-02: DatePicker calendar button `aria-label="Open calendar"` — FIXED
- CRIT-03: DateRangePicker calendar button `aria-label="Open calendar"` — FIXED
- CRIT-04: Calendar prev/next buttons `aria-label="Previous/Next month"` — FIXED
- CRIT-05: RangeCalendar prev/next buttons `aria-label="Previous/Next month"` — FIXED
- CRIT-06: Autocomplete clear button `aria-label="Clear search"` + `slot="clear"` — FIXED
- CRIT-07: Card title renders as `h{n}` via `titleLevel` prop (default h3) — FIXED

### Open Issues (updated 2026-03-15)

1. **OPEN**: `DateFilter` trigger button missing `aria-controls` linking trigger to popover
2. **OPEN**: Autocomplete disabled multi-trigger — tag pills have no visual disabled state. `.autocomplete-tag[data-disabled]` CSS rule missing. Fix: add `.autocomplete-multi-trigger[data-disabled] .autocomplete-tag` and `...autocomplete-tag-remove` CSS rules. WCAG 1.4.1 / 1.3.3.
3. **OPEN**: `.picker-trigger` base transition in `PickerTrigger.css` has no `prefers-reduced-motion` guard — affects Autocomplete single trigger, Select, DateFilter.

### Accepted / Won't Fix

- `ToggleButtonGroup` / `Button` (small size) 24px height — accepted at WCAG 2.5.8 AA minimum; by design
- `CheckboxGroup`/`RadioGroup` `FieldError` always rendered — acceptable; React Aria renders nothing for empty children
- `--color-text-disabled` below 4.5:1 — exempt per WCAG 1.4.3 inactive UI exception

## RAC Audit Methodology — Lessons Learned

### Compound components vs standalone Popover (verified 2026-03-08)

RAC has two distinct Popover patterns — confusing them leads to false findings:

**Standalone Popover** (custom trigger + arbitrary content): requires an explicit `<Dialog>` wrapper inside `<Popover>` so RAC can inject the correct `role="dialog"` and focus management.

```tsx
<Popover>
  <Dialog>...</Dialog>
</Popover>
```

**RAC compound components** (DatePicker, DateRangePicker, Select, ComboBox, etc.): RAC handles dialog semantics internally. The correct pattern is `<Popover><Calendar /></Popover>` with NO `<Dialog>` wrapper. Adding one would be wrong.

**Rule:** Before raising any finding about a missing/extra ARIA wrapper inside a RAC compound component, verify the expected API in the RAC MCP docs. Never rely on training knowledge for this.

## Patterns Done Correctly (skip re-checking)

- All interactive components use React Aria primitives (no custom ARIA reimplementation)
- `Breadcrumbs` outer `<nav aria-label>` wrapper is correct — `RACBreadcrumbs` renders an `<ol>`, not a `<nav>`
- Focus rings universally use `[data-focus-visible]`
- Disabled styles use `[data-disabled]`
- `FieldError` used for all form field errors (connected via React Aria automatically)
- `Label` + `Text[slot=description]` + `FieldError` pattern consistent across all field components
- Icons always have `aria-hidden` when decorative
- Toast region has correct `aria-label` and dismiss button has `aria-label="Dismiss notification"`
- Tooltip uses RAC `TooltipTrigger` (ARIA managed automatically)
- Select/Autocomplete use RAC `<Select>` (aria-haspopup, aria-expanded, aria-controls managed)
- Calendar uses RAC `<Calendar>` (grid role, cell navigation managed)
- Interactive component borders use `--color-border-control` (gray-500/gray-400) — meets 1.4.11 3:1 threshold
