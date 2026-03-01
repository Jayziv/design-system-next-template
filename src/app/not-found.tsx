// Custom 404 page
// Next.js renders this file at any unmatched route.
//
// Note: Heading uses `as` (h1–h4) for semantic level.
// Font size is controlled via `className` — there is no `size` prop.

import { Heading, Text, Button } from "@jayziv/design-system-core"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <Heading as="h1" className="text-8xl font-extrabold tabular-nums">
        404
      </Heading>
      <Heading as="h2">
        Page not found
      </Heading>
      <Text variant="muted" className="max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </Text>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  )
}
