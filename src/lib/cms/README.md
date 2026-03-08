# CMS Integration Architecture

This template includes a 3-tier content adapter system that allows switching between CMS providers via environment variable.

## Quick Start

By default, the template uses **static content** — no CMS setup required. Content is hardcoded in the static adapter.

### Switch CMS Provider

Set the `CMS_PROVIDER` environment variable:

```bash
# .env.local
CMS_PROVIDER=static     # Default — hardcoded content
CMS_PROVIDER=keystatic  # Local file-based CMS
CMS_PROVIDER=sanity     # Headless CMS (cloud)
```

---

## Provider 1: Static (Default)

Content is defined in `src/lib/cms/adapters/static.ts`. 

**Best for:**
- Simple sites
- Developers who prefer editing code directly
- Sites that rarely change content

**To customize:**
1. Edit `src/lib/cms/adapters/static.ts`
2. Update the return values for each `get*PageData()` method

---

## Provider 2: Keystatic

A file-based CMS with a visual admin UI. Content is stored as JSON in the `content/` directory.

**Best for:**
- Solo developers or small teams
- Sites with occasional content updates
- Git-based content workflows

### Setup

1. **Install dependencies:**
   ```bash
   pnpm add @keystatic/core @keystatic/next
   ```

2. **Set environment variable:**
   ```bash
   # .env.local
   CMS_PROVIDER=keystatic
   ```

3. **Start dev server:**
   ```bash
   pnpm dev
   ```

4. **Access admin UI:**
   Open http://localhost:3000/keystatic

### File Structure

```
content/
├── home.json      # Home page content
├── about.json     # About page content
├── services.json  # Services page content
├── contact.json   # Contact page content
└── site.json      # Global site settings
```

### GitHub Mode (Collaborative)

For teams, Keystatic supports GitHub-backed content:

1. Update `keystatic.config.tsx`:
   ```tsx
   storage: {
     kind: "github",
     repo: "owner/repo",
   }
   ```

2. See [Keystatic GitHub Mode docs](https://keystatic.com/docs/github-mode)

---

## Provider 3: Sanity

A headless CMS with real-time collaboration, visual editing, and CDN-backed delivery.

**Best for:**
- Multi-editor teams
- Content-heavy sites
- Advanced content modeling

### Setup

1. **Create a Sanity project:**
   - Go to https://sanity.io/manage
   - Create a new project
   - Copy your Project ID

2. **Install dependencies:**
   ```bash
   pnpm add @sanity/client sanity next-sanity @sanity/vision
   ```

3. **Set environment variables:**
   ```bash
   # .env.local
   CMS_PROVIDER=sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_VERSION=2024-01-01
   # SANITY_TOKEN=optional-read-token
   ```

4. **Start dev server:**
   ```bash
   pnpm dev
   ```

5. **Access Sanity Studio:**
   Open http://localhost:3000/studio

6. **Create initial content:**
   Use the Studio UI to create documents for:
   - Home Page
   - About Page
   - Services Page
   - Contact Page
   - Site Settings

---

## Architecture

### Adapter Interface

All adapters implement `ContentAdapter`:

```typescript
interface ContentAdapter {
  getHomePageData(): Promise<HomePageData>
  getAboutPageData(): Promise<AboutPageData>
  getServicesPageData(): Promise<ServicesPageData>
  getContactPageData(): Promise<ContactPageData>
  getSiteMetadata(): Promise<SiteMetadata>
}
```

### Factory Function

The `getContentAdapter()` factory reads `CMS_PROVIDER` and returns the appropriate adapter:

```typescript
import { getContentAdapter } from "@/lib/cms"

const adapter = getContentAdapter()
const data = await adapter.getHomePageData()
```

### Page Components

Pages are async server components that fetch data from the adapter:

```tsx
// src/app/page.tsx
export default async function HomePage() {
  const adapter = getContentAdapter()
  const data = await adapter.getHomePageData()

  return (
    <main>
      <HeroSection
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        // ... pass data to components
      />
    </main>
  )
}
```

### Type Definitions

All content types are defined in `src/lib/cms/types.ts`:

- `HomePageData` — Home page sections
- `AboutPageData` — About page sections
- `ServicesPageData` — Services page sections
- `ContactPageData` — Contact page sections
- `SiteMetadata` — Global site settings

---

## Adding New Content

### 1. Define Types

Add new types to `src/lib/cms/types.ts`:

```typescript
export interface BlogPostData {
  title: string
  slug: string
  content: string
  publishedAt: string
}
```

### 2. Update Adapter Interface

Add method to `ContentAdapter` in `src/lib/cms/adapter.ts`:

```typescript
export interface ContentAdapter {
  // ... existing methods
  getBlogPosts(): Promise<BlogPostData[]>
}
```

### 3. Implement in Each Adapter

Update all three adapters:
- `adapters/static.ts`
- `adapters/keystatic.ts`
- `adapters/sanity.ts`

### 4. Add CMS Schemas (if needed)

- Keystatic: Add collection to `keystatic.config.tsx`
- Sanity: Add schema to `sanity/schemas/`

---

## Best Practices

1. **Always use the adapter** — Don't access CMS libraries directly in pages
2. **Keep pages thin** — Pages should only fetch data and pass to components
3. **Type everything** — All content should flow through TypeScript interfaces
4. **Fallback gracefully** — Adapters fall back to static content if CMS fails
5. **Use server components** — All pages are async server components for optimal performance
