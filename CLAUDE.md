# Southore

Design system component library built with React 19, TypeScript, Vite 7 (via rolldown-vite), and Storybook 10.

## Architecture

- Components are built on top of [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html) for accessibility
- Library is bundled as an ES module via Vite's library mode (`src/index.ts` is the entry point)
- React Compiler is enabled via `babel-plugin-react-compiler`
- `react`, `react-dom`, and `react/jsx-runtime` are externalized from the build

## Current Focus

- Building accessible, styled components using React Aria Components

## Commands

- `npm run storybook` — start Storybook dev server on port 6006
- `npm run build` — typecheck and build the library
- `npm run lint` — run ESLint

## Project Structure

```
src/
  index.ts           # Library entry point — export all components here
  tokens.css         # Design tokens (colors, spacing, radius, font sizes)
  Button.tsx         # Component implementations
  Button.css         # Component styles
  Button.stories.tsx
  ...
```

## Conventions

- Components should wrap or compose React Aria Components, not reimplement accessibility primitives
- Export every public component from `src/index.ts`
- Each component gets a corresponding `*.stories.tsx` file

## Styling

- Design tokens are defined as CSS custom properties in `src/tokens.css`
- Each component has a corresponding `.css` file that imports tokens
- Styles target React Aria's default class names (e.g. `.react-aria-Button`) and data attributes (e.g. `[data-hovered]`, `[data-pressed]`, `[data-focus-visible]`, `[data-disabled]`)
- Custom variants are passed via `data-*` attributes (e.g. `data-variant`, `data-size`)
- Use `:has()` selectors for conditional styling based on descendants
- Each component includes browser resets as needed (e.g. `appearance: none`, `margin: 0`, `padding: 0`, `font: inherit`, `color: inherit`, `outline: none`, `-webkit-tap-highlight-color: transparent`)

## Dark Mode

Components support light and dark modes via the CSS `light-dark()` function and `color-scheme` property.

### How it works

- `tokens.css` sets `color-scheme: light dark` on `:root`, enabling automatic system preference detection
- Semantic tokens use `light-dark(lightValue, darkValue)` to switch colors based on the computed color scheme
- All colors meet WCAG AA contrast requirements (4.5:1 for text)

### Usage for consumers

**Auto (system preference):** Works by default - no configuration needed.

**Force light mode:**
```css
:root { color-scheme: light; }
/* or on a specific container */
.my-container { color-scheme: light; }
```

**Force dark mode:**
```css
:root { color-scheme: dark; }
```

**Toggle with JavaScript:**
```js
document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
```

### Core semantic tokens

| Token | Light | Dark |
|-------|-------|------|
| `--color-bg` | white | gray-950 |
| `--color-bg-subtle` | gray-50 | gray-900 |
| `--color-bg-muted` | gray-100 | gray-800 |
| `--color-text` | gray-900 | gray-50 |
| `--color-text-muted` | gray-700 | gray-300 |
| `--color-text-subtle` | gray-500 | gray-400 |
| `--color-border` | gray-200 | gray-700 |
| `--color-primary` | primary-600 | primary-400 |
| `--color-error` | red-700 | red-300 |

## Tools

- The React Aria MCP server is available for looking up React Aria Components documentation
- The `/react-aria` agent skill can be used for building components with React Aria
- **Always consult the Storybook MCP server** (`get-storybook-story-instructions`) before writing or updating stories to get the correct patterns and imports
