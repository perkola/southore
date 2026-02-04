# Southore

Design system component library built with React 19, TypeScript, Vite 7 (via rolldown-vite), and Storybook 10.

## Architecture

- Components are built on top of [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html) for accessibility
- Library is bundled as an ES module via Vite's library mode (`src/index.ts` is the entry point)
- React Compiler is enabled via `babel-plugin-react-compiler`
- `react`, `react-dom`, and `react/jsx-runtime` are externalized from the build

## Current Focus

- Building accessible, unstyled components using React Aria Components
- Styling and testing are not in scope yet

## Commands

- `npm run storybook` — start Storybook dev server on port 6006
- `npm run build` — typecheck and build the library
- `npm run lint` — run ESLint

## Project Structure

```
src/
  index.ts          # Library entry point — export all components here
  stories/          # Storybook stories (default examples, will be replaced)
```

## Conventions

- Components should wrap or compose React Aria Components, not reimplement accessibility primitives
- Export every public component from `src/index.ts`
- Each component gets a corresponding `*.stories.ts` file

## Tools

- The React Aria MCP server is available for looking up React Aria Components documentation
- The `/react-aria` agent skill can be used for building components with React Aria
