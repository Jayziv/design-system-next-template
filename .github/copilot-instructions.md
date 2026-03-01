# Design System Consumer — Copilot Instructions

This is a Next.js website consuming `@jayziv/design-system-core` v1.1.0 (59 components).
Built with Tailwind CSS 4, React 19, TypeScript. No React compiler.

## Before building anything

1. Read `node_modules/@jayziv/design-system-core/MANIFEST.json` — the full component inventory
2. Check the component exists before importing it

## Critical: Tailwind CSS 4 source scanning

`globals.css` must always contain:

```css
@source "../../../node_modules/@jayziv/design-system-core";
```

This tells Tailwind CSS 4 to scan the DS package and include its utility classes in the build output. **Never remove this line.** If DS component styles appear to be missing (unstyled components, wrong colours, missing layout), this line is the first thing to check. If the DS package path in `node_modules` changes, update this path accordingly.

## Mandatory Rules

1. **Semantic tokens only** — `bg-primary`, `text-foreground`, `border-input`. Never `bg-blue-500`, `text-[#ff0000]`, or inline styles.
2. **Typography components** — use `<Heading>`, `<Text>`, `<Caption>` for content text. Never raw `<h1>`, `<p>`, `<span>`.
3. **Star imports** — always `import * as React from "react"`, never named or default React imports.
4. **DS components** — always import from `@jayziv/design-system-core`. Never recreate DS components locally.
5. **cn() utility** — `import { cn } from "@jayziv/design-system-core"` for className merging.
6. **Named exports** — all non-page components use named exports. Pages use `export default` (Next.js requirement).
7. **forwardRef + displayName** — all non-page components must use `forwardRef` and `.displayName`.
8. **No React compiler** — do not add `experimental.reactCompiler` to `next.config.mjs`.

## Import pattern

```tsx
import * as React from "react"
import { Button, Card, Heading, Text, cn } from "@jayziv/design-system-core"
```

## Theme system

- Active theme: `src/themes/active.css` — paste exported theme CSS here
- Color palette: set `data-color-theme="ocean|forest|sunset|default"` on `<html>`
- Custom brand: edit `src/themes/active.css` with `:root { ... }` overrides
- Token format: bare HSL — `215 70% 40%` not `hsl(215, 70%, 40%)`

## Agents

| Use | Agent |
|-----|-------|
| Starting a new project | Discovery |
| Planning a page | Page Planner |
| Building a page | Page Builder |
| Missing DS component | Component Requester |
| Brand/theme setup | Theme Designer |

## File locations

- Pages: `src/app/`
- App compositions: `src/components/`
- Placeholders: `src/components/placeholders/`
- Component requests: `component-requests/`
- Active theme: `src/themes/active.css`
- Theme examples: `src/themes/examples/`
