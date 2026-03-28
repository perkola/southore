---
paths:
  - "**/*.css"
---

# Styling

- Design tokens are CSS custom properties in `src/tokens.css`
- Styles target React Aria's default class names (e.g. `.react-aria-Button`) and data attributes (e.g. `[data-hovered]`, `[data-pressed]`, `[data-focus-visible]`, `[data-disabled]`)
- Custom variants are passed via `data-*` attributes (e.g. `data-variant`, `data-size`)
- Use `:has()` selectors for conditional styling based on descendants
- Each component includes browser resets as needed (`appearance: none`, `margin: 0`, `font: inherit`, `outline: none`, etc.)

## Dark Mode

Components use `light-dark(lightValue, darkValue)` CSS tokens with `color-scheme: light dark` on `:root`. All colors meet WCAG AA contrast (4.5:1).

| Token                 | Light       | Dark        |
| --------------------- | ----------- | ----------- |
| `--color-bg`          | white       | gray-950    |
| `--color-bg-subtle`   | gray-50     | gray-900    |
| `--color-bg-muted`    | gray-100    | gray-800    |
| `--color-text`        | gray-900    | gray-50     |
| `--color-text-muted`  | gray-700    | gray-300    |
| `--color-text-subtle` | gray-500    | gray-400    |
| `--color-border`      | gray-200    | gray-700    |
| `--color-primary`     | primary-600 | primary-400 |
| `--color-error`       | red-700     | red-300     |
