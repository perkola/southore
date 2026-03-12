# Southore

Design system component library built with React 19, TypeScript, Vite 7 (via rolldown-vite), and Storybook 10. Components are built on top of [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html) for accessibility.

## Commands

- `npm run storybook` — start Storybook dev server on port 6006
- `npm run build` — typecheck and build the library
- `npm run lint` — run ESLint
- `npm run test` — run all tests (unit + visual, light + dark)
- `npm run test:unit` — run unit/interaction tests only
- `npm run test:visual` — run visual screenshot tests (light + dark)
- `npm run test:update -- <file>` — update baselines for specific visual test files (see Visual Testing)
- `npm run test:watch` — watch unit tests
- `npm run test:watch:visual` — watch visual tests
- `npm run test:coverage` — run unit tests with coverage

**Always run `npm run build && npm run lint && npm run test` after making changes.**

## Project Structure

```
src/
  index.ts              # Library entry point — export all components here
  tokens.css            # Design tokens (colors, spacing, radius, font sizes)
  Button/
    Button.tsx          # Component implementation
    Button.css          # Component styles
    Button.stories.tsx  # Storybook stories
    Button.test.tsx         # Unit/interaction tests
    Button.visual.test.tsx  # Visual screenshot tests
    __screenshots__/        # Visual test reference screenshots (macOS only)
  shared/
    Field.ts            # Shared field/label/description/error types
    Field.css           # Shared field layout styles
    Listbox.css         # Shared listbox styles (used by Select, Autocomplete)
  icons/
    index.ts            # Re-exports from lucide-react
    Icons.stories.tsx   # Icon gallery story
```

### Adding a new component

1. Create `src/ComponentName/` folder
2. Add `ComponentName.tsx`, `ComponentName.css`, `ComponentName.stories.tsx`, `ComponentName.test.tsx`, `ComponentName.visual.test.tsx`
3. Export from `src/index.ts`

## Icons

Icons are re-exported from Lucide React through `src/icons/index.ts`. **Never import directly from `lucide-react`** — always use `../icons`.

To add an icon: export it from `src/icons/index.ts`, then add it to the `iconMap` in `src/icons/Icons.stories.tsx`.

## Conventions

- Components should wrap or compose React Aria Components, not reimplement accessibility primitives
- Export every public component from `src/index.ts`
- Shared utilities (types, styles reused across components) go in `src/shared/`
- Cross-component imports use relative paths: `../Button/Button`, `../shared/Field`, `../icons`

## Visual Testing

Screenshot tests live in `Component.visual.test.tsx`, separate from unit/interaction tests in `Component.test.tsx`. Each visual test file covers every meaningful visual state: default, key variants, open/expanded (for overlays), error state (for field components), and on/off (for toggles).

Both light and dark mode screenshots are captured automatically — the `visual-dark` test project runs all visual tests with dark mode forced, storing references as `{name}-dark-{browser}-{platform}.png` alongside the light ones. No extra test code needed.

### Updating baselines

**Always scope updates to only the component(s) you changed — never run a blanket update:**

```bash
npm run test:update -- src/Select/Select.visual.test.tsx src/Autocomplete/Autocomplete.visual.test.tsx
```

After updating, run `git diff src/**/__screenshots__` and verify that only the expected `.png` files changed. Any change outside the component you touched is an unintentional regression, not a baseline to accept.

Commit updated baselines in the same PR as the code change so reviewers see both the implementation and the visual result.

Only use `npm run test:update` with no arguments when a global change intentionally affects all components (e.g. editing `tokens.css`).

Always use accessible queries (`page.getByRole()`, `getByText()`), never `document.querySelector`. Do not commit auto-captured failure screenshots (named `{test-name}-1.png`).

## Styling

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

## Releasing

1. `npm version patch` (or `minor`, `major`) — bumps version in `package.json` and creates a git tag
2. `git push && git push --tags` — triggers GitHub Actions to publish to npm

CI runs build + lint on all pushes to `main`. Storybook deploys to Vercel automatically (production: https://southore.perko.la).

## Tools

- The React Aria MCP server is available for looking up React Aria Components documentation
- The `/react-aria` agent skill can be used for building components with React Aria
- **Always consult the Storybook MCP server** (`get-storybook-story-instructions`) before writing or updating stories to get the correct patterns and imports. Prefer this over reading existing story files when starting a new story from scratch.
- The **Playwright MCP** can be used alongside Storybook (`http://localhost:6006`) to visually review UI changes before finalizing them. Use it when making significant visual changes to navigate to the relevant story, take screenshots, and confirm the result looks correct. It is also useful for troubleshooting unexpected UI/UX behavior interactively. Story URLs follow the pattern `/story/{component-kebab}--{story-kebab}` (e.g. `http://localhost:6006/?path=/story/datepicker--with-description`).
