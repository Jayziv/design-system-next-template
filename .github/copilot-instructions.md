# Design System Consumer — Copilot Instructions

This is a Next.js website consuming `@jayziv/design-system-core` v1.1.0 (59 components).
Built with Tailwind CSS 4, React 19, TypeScript. No React compiler.

## Before building anything

1. Read `node_modules/@jayziv/design-system-core/MANIFEST.json` — the full component inventory
2. Check the component exists before importing it

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
- **Font overrides**: if your brand uses custom fonts via `next/font`, you MUST also set `--font-display` and `--font-body` in `active.css` `:root {}` — otherwise the DS preset fonts (e.g. `"Inter"` from the bold preset) will override your custom fonts after hydration

## Critical: Tailwind CSS 4 `@source` directive

DS components use Tailwind utility classes internally. Tailwind CSS 4 excludes `node_modules/` from automatic class scanning (gitignored). Without an explicit `@source` directive, **all utility classes used exclusively inside DS components will be missing from the compiled CSS** — causing broken layouts (e.g. nav items stacking vertically instead of horizontal, missing `fixed` positioning, missing responsive breakpoints).

`src/app/globals.css` **must** contain:

```css
@source "../../node_modules/@jayziv/design-system-core/dist";
```

This line must remain in `globals.css` whenever this project consumes the DS. Never remove it. If the DS package path changes, update this path accordingly.

## Agents

| Use | Agent |
|-----|-------|
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
