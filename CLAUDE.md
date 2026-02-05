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

## Tools

- The React Aria MCP server is available for looking up React Aria Components documentation
- The `/react-aria` agent skill can be used for building components with React Aria
- **Always consult the Storybook MCP server** (`get-storybook-story-instructions`) before writing or updating stories to get the correct patterns and imports
