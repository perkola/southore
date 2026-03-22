# Southore

[![CI](https://github.com/perkola/southore/actions/workflows/ci.yml/badge.svg)](https://github.com/perkola/southore/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/southore)](https://www.npmjs.com/package/southore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://southore.perko.la)

A design system component library built with React 19, TypeScript, and [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html).

## Features

- Accessible by default — built on React Aria Components, fully conformant with WCAG 2.2 Level AA ([VPAT](.claude/agent-memory/a11y-auditor/VPAT.md))
- Styled with CSS custom properties (design tokens)
- Tree-shakeable ES module build

## Installation

```bash
pnpm add southore
# or: npm install southore
```

```tsx
import { Button } from "southore";
import "southore/styles";
```

## Development

This project uses [Vite+](https://viteplus.dev/guide/). Install it globally first, then:

```bash
# Install dependencies
vp install

# Start Storybook
vp run storybook

# Build the library
vp run build

# Run linter
vp lint .

# Run all tests
vp run test

# Run unit tests only
vp run test:unit

# Run visual screenshot tests
vp run test:visual

# Update visual baselines after intentional changes
vp run test:update
```
