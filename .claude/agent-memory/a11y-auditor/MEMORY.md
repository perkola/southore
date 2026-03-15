# Accessibility Auditor Memory — Southore Design System

## VPAT

Full WCAG 2.2 conformance report (v0.0.4, 2026-03-15): [VPAT.md](./VPAT.md)
Overall result: **Substantially Conforms to WCAG 2.2 Level AA**. One partial-support finding: SC 1.3.5 (autocomplete attributes are caller-supplied; not a library-level failure).

## Project Conventions (confirmed)

- React Aria Components wraps all interactive primitives — never reimplement ARIA natively
- Focus rings use `[data-focus-visible]` selector, NOT `:focus-visible`
- Disabled states use `[data-disabled]` selector, NOT `:disabled`
- Interactive states use `[data-hovered]`, `[data-pressed]`, `[data-selected]`, etc.
- Dark mode via `light-dark(lightVal, darkVal)` with `color-scheme: light dark` on `:root`
- `prefers-reduced-motion` guards confirmed present in all animated components (2026-03-15)

## IMPORTANT: Contrast Calculation Warning

The a11y-auditor agent has produced **systematically incorrect** contrast ratio calculations in the past. Always verify with Node.js using the exact WCAG linearization formula before raising a finding. The agent consistently underestimates contrast on dark surfaces — errors as large as 2x have occurred.

WCAG linearization: `c ≤ 0.04045 → c/12.92`, else `((c+0.055)/1.055)^2.4`; `L = 0.2126R + 0.7152G + 0.0722B`

## Verified Contrast Ratios (Node.js-verified 2026-03-15)

All semantic tokens pass WCAG AA on their intended surfaces. Key values:

| Token                    | Light value             | Dark value | Status                            |
| ------------------------ | ----------------------- | ---------- | --------------------------------- |
| `--color-text`           | gray-900                | gray-50    | PASS AAA both modes               |
| `--color-text-muted`     | gray-700                | gray-300   | PASS AAA both modes               |
| `--color-text-subtle`    | gray-600                | gray-400   | PASS AA both modes                |
| `--color-text-disabled`  | gray-400                | gray-600   | Exempt (inactive UI, WCAG 1.4.3)  |
| `--color-primary`        | violet-600              | violet-200 | PASS AA both modes                |
| `--color-error`          | red-700                 | red-300    | PASS AAA both modes               |
| `--color-success`        | green-700               | green-400  | PASS AA both modes                |
| `--color-warning`        | amber-700               | amber-400  | PASS AA both modes                |
| `--color-info`           | blue-600                | blue-400   | PASS AA both modes                |
| `--color-focus-ring`     | violet-400 (both modes) | —          | PASS 3:1 threshold both modes     |
| `--color-border-control` | gray-500                | gray-400   | PASS 3:1 (WCAG 1.4.11) both modes |

Note: `--color-primary` dark was changed from violet-300 to violet-200 on 2026-03-15 to fix a failing contrast on `--color-bg-muted`. Fill-use components (Calendar, RangeCalendar, Checkbox, RadioGroup, Switch, DatePicker, DateRangePicker) use `var(--color-violet-600)` directly rather than `--color-primary`, consistent with how Button already worked.

## No Open Issues

All issues from the 2026-03-08 audit are resolved as of 2026-03-15. See git history for full audit trail.

## RAC Compound vs Standalone Popover

RAC has two distinct Popover patterns — confusing them causes false findings:

**Standalone Popover** (custom trigger + arbitrary content): requires an explicit `<Dialog>` wrapper inside `<Popover>` for correct `role="dialog"` and focus management.

**RAC compound components** (DatePicker, DateRangePicker, Select, ComboBox, etc.): RAC handles dialog semantics internally. The correct pattern is `<Popover><Calendar /></Popover>` with NO `<Dialog>` wrapper.

Before raising any finding about a missing/extra ARIA wrapper inside a RAC compound component, verify the expected API in the RAC MCP docs. Never rely on training knowledge for this.

## Patterns Done Correctly (skip re-checking)

- `Breadcrumbs` outer `<nav aria-label>` wrapper is correct — `RACBreadcrumbs` renders an `<ol>`, not a `<nav>`
- `FieldError` used for all form field errors; `Label` + `Text[slot=description]` + `FieldError` pattern consistent across all field components
- Icons always have `aria-hidden` when decorative
- Toast dismiss button has `aria-label="Dismiss notification"`
- `Badge` circular variant: `aria-label` passthrough works via `...props` spread — no enforcement needed, accepted by design
- `DateFilter`: accessible description uses manual `id`/`aria-describedby` pair (not RAC slot machinery, which doesn't apply outside RAC field components)
