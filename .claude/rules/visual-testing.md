---
paths:
  - "**/*.visual.test.tsx"
---

# Visual Testing

Screenshot tests live in `Component.visual.test.tsx`, separate from unit/interaction tests in `Component.test.tsx`. Each visual test file covers every meaningful visual state: default, key variants, open/expanded (for overlays), error state (for field components), and on/off (for toggles).

Both light and dark mode screenshots are captured automatically — the `visual-dark` test project runs all visual tests with dark mode forced, storing references as `{name}-dark-{browser}-{platform}.png` alongside the light ones. No extra test code needed.

## Updating baselines

**Always scope updates to only the component(s) you changed — never run a blanket update:**

```bash
vp run test:update -- src/Select/Select.visual.test.tsx src/Autocomplete/Autocomplete.visual.test.tsx
```

After updating, run `git diff src/**/__screenshots__` and verify that only the expected `.png` files changed. Any change outside the component you touched is an unintentional regression, not a baseline to accept.

Commit updated baselines in the same PR as the code change so reviewers see both the implementation and the visual result.

Only use `vp run test:update` with no arguments when a global change intentionally affects all components (e.g. editing `tokens.css`).

Always use accessible queries (`page.getByRole()`, `getByText()`), never `document.querySelector`. Do not commit auto-captured failure screenshots (named `{test-name}-1.png`).

## Known Vite+ bug: `test:update` does not overwrite screenshots (v0.1.11)

`vp run test:update` runs tests with `-u` but **does not actually write new screenshot files** — existing files are silently skipped. Workaround when you need to regenerate baselines:

1. Delete the old screenshots: `rm src/ComponentName/__screenshots__/ComponentName.visual.test.tsx/*.png`
2. Run `vp run test:visual` — first run creates new baselines (tests fail on missing files)
3. Run `vp run test:visual` again — all tests pass against the new baselines

**Always scope deletions to only the component(s) you changed.**
