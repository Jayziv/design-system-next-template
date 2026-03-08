# [Project Name]

Next.js 15 + Tailwind CSS 4 + `@jayziv/design-system-core` v2.6.1

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

## Content Management (CMS)

This template includes a 3-tier CMS adapter system. Set `CMS_PROVIDER` in your `.env`:

| Provider | Description | Admin URL |
|----------|-------------|-----------|
| `static` (default) | Hardcoded content in code | N/A |
| `keystatic` | Local file-based CMS | `/keystatic` |
| `sanity` | Headless cloud CMS | `/studio` |

### Quick setup

**Static (default):** No setup required. Edit `src/lib/cms/adapters/static.ts`.

**Keystatic:**
```bash
pnpm add @keystatic/core @keystatic/next
# Set CMS_PROVIDER=keystatic in .env
# Visit http://localhost:3000/keystatic
```

**Sanity:**
```bash
pnpm add @sanity/client sanity next-sanity @sanity/vision
# Set CMS_PROVIDER=sanity and SANITY_* vars in .env
# Visit http://localhost:3000/studio
```

See [`src/lib/cms/README.md`](./src/lib/cms/README.md) for full documentation.

## Theming

### How it works

The colour palette is **baked** into `src/themes/active.css`. The `ThemeProvider` only manages light/dark mode at runtime — no runtime palette switching happens in consumer apps.

### Switching palettes

Run `pnpm generate:theme` in the design system repo to export a compiled CSS file for any colour theme + structural preset combination:

```bash
# In the design system repo (design-system-a/)
pnpm generate:theme --color ocean --preset bold --out ./ocean-bold.css

# Available colours: default | ocean | forest | sunset
# Available presets: minimal | bold | editorial | corporate
```

Then paste the generated file's contents into `src/themes/active.css` in this project.

### Brand customisation

Edit `src/themes/active.css` directly to override any CSS custom property with your client's brand values. Only semantic tokens (`--primary`, `--background`, `--foreground`, etc.) — never hardcoded colours.

Example overrides:

```css
:root {
  --primary: 220 80% 45%;   /* brand blue */
  --radius: 0.5rem;         /* rounder corners */
}
```

### Light / dark mode

`ThemeProvider` persists the user's `colorMode` preference (`light` or `dark`) in `localStorage`. The active palette is used for both modes — `src/themes/active.css` should include both `:root` (light) and `.dark` (dark) variable blocks.

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
├── lib/
│   └── cms/       # CMS adapter system
│       ├── adapters/  # Static, Keystatic, Sanity
│       ├── types.ts   # Content type definitions
│       └── adapter.ts # Factory function
└── themes/
    ├── active.css     # ← Your active theme (paste here)
    └── examples/      # Theme snippets from the design system
content/               # Keystatic JSON content files
sanity/                # Sanity schema definitions
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
