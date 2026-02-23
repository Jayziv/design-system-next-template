# [Project Name]

Next.js 15 + Tailwind CSS 4 + `@jayziv/design-system-core` v1.1.0

## Prerequisites

- Node.js 22+
- pnpm
- GitHub token with `read:packages` scope → [create one](https://github.com/settings/tokens/new?scopes=read:packages)

## Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd <repo-name>

# 2. Add your GitHub token to .env
cp .env.example .env
# Edit .env and set GITHUB_TOKEN=<your-token>

# 3. Install
pnpm install

# 4. Run
pnpm dev   # http://localhost:3000
```

## Theme

Apply a colour palette by setting `data-color-theme` on `<html>` in `src/app/layout.tsx`:

```tsx
<html lang="en" data-color-theme="ocean">  // ocean | forest | sunset | default
```

Or paste custom brand tokens into `src/themes/active.css`. See `src/themes/README.md`.

## Agents (VS Code)

Open the agent picker (Copilot chat → agent dropdown) and use:

| Agent | When |
|-------|------|
| **Page Planner** | Before building any page — audits DS component availability |
| **Page Builder** | After planning — builds the page with correct DS imports |
| **Component Requester** | When DS is missing a component — creates placeholder + request file |
| **Theme Customizer** | Brand setup — converts hex colours to semantic token overrides |

## Structure

```
src/
├── app/           # Next.js app router pages
├── components/    # App-level compositions
│   └── placeholders/  # Temporary DS gap placeholders
└── themes/
    ├── active.css     # ← Your active theme (paste here)
    └── examples/      # Theme snippets from the design system
component-requests/    # Pending DS component requests
```

## Design system

59 components available. Full list: `node_modules/@jayziv/design-system-core/MANIFEST.json`

```tsx
import { Button, Card, Heading, Text, Badge } from "@jayziv/design-system-core"
```

Rules:
- Semantic tokens only (`bg-primary`, `text-foreground`) — never hardcoded colours
- Typography: `<Heading>`, `<Text>`, `<Caption>` — never `<h1>`, `<p>`, `<span>`
- Always `import * as React from "react"`
