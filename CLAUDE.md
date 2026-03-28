# Southore

Design system component library built with React 19, TypeScript, Vite 8 (via Vite+), and Storybook 10. Components are built on top of [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html) for accessibility.

## Commands

This project uses [Vite+](https://viteplus.dev/guide/) — run `vp help` for the full command reference. Use `vp` for everything; do not invoke `pnpm`, `npm`, `npx`, or tool CLIs directly.

- `vp run storybook` — start Storybook dev server on port 6006
- `vp run build` — typecheck and build the library
- `vp lint .` — lint with Oxlint
- `vp run test` — run all tests (unit + visual, light + dark)
- `vp run test:unit` — run unit/interaction tests only
- `vp run test:visual` — run visual screenshot tests (light + dark)
- `vp run test:update -- <file>` — update baselines for specific visual test files (see Visual Testing)
- `vp run test:watch` — watch unit tests
- `vp run test:watch:visual` — watch visual tests
- `vp run test:coverage` — run unit tests with coverage

**Always run `vp run build && vp lint . && vp run test` after making changes.**

**Never suggest or initiate `git add`, `git commit`, or any git staging/committing steps. The user initiates all commits.**

### Key Vite+ rules

- Import from `vite-plus` (not `vite`) and `vite-plus/test` (not `vitest`)
- Run `vp install` after pulling changes before getting started
- Use `vp check` for fast format + lint + type validation in a loop

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
  shared/               # Run `ls src/shared/` for current contents
    Field.ts            # Shared field/label/description/error types
    Field.css           # Shared field layout styles
    Listbox.css         # Shared listbox styles (used by Select, Autocomplete)
    # ... more shared utilities — check the directory directly
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

## Releasing

1. `pnpm version patch` (or `minor`, `major`) — bumps version in `package.json` and creates a git tag
2. `git push && git push --tags` — triggers GitHub Actions to publish to npm

CI runs build + lint on all pushes to `main`. Storybook deploys to Vercel automatically (production: https://southore.perko.la).

## Tools

- The React Aria MCP server is available for looking up React Aria Components documentation
- The `/react-aria` agent skill can be used for building components with React Aria
- **Always consult the Storybook MCP server** (`get-storybook-story-instructions`) before writing or updating stories to get the correct patterns and imports. Prefer this over reading existing story files when starting a new story from scratch.
- The **Playwright MCP** can be used alongside Storybook (`http://localhost:6006`) to visually review UI changes before finalizing them. Use it when making significant visual changes to navigate to the relevant story, take screenshots, and confirm the result looks correct. It is also useful for troubleshooting unexpected UI/UX behavior interactively. Story URLs follow the pattern `/story/{component-kebab}--{story-kebab}` (e.g. `http://localhost:6006/?path=/story/datepicker--with-description`).
