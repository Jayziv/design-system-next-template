import * as React from "react"
import { Button, Heading, Text, Badge, Card, CardContent, CardHeader } from "@jayziv/design-system-core"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <div className="space-y-4 mb-16">
          <Badge variant="secondary">Design System v1.1.0</Badge>
          <Heading level={1} className="text-5xl font-bold">
            Your project is ready.
          </Heading>
          <Text className="text-xl text-muted-foreground max-w-2xl">
            Built with Next.js 15, Tailwind CSS 4, and{" "}
            <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
              @jayziv/design-system-core
            </code>
            . Start by editing{" "}
            <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </Text>
          <div className="flex gap-3 pt-2">
            <Button>Get started</Button>
            <Button variant="outline">View components</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <Heading level={3} className="text-base font-semibold">Theme</Heading>
            </CardHeader>
            <CardContent>
              <Text className="text-sm text-muted-foreground">
                Edit <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">src/themes/active.css</code> or set{" "}
                <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">data-color-theme</code> on{" "}
                <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;html&gt;</code>.
              </Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Heading level={3} className="text-base font-semibold">Components</Heading>
            </CardHeader>
            <CardContent>
              <Text className="text-sm text-muted-foreground">
                59 components available. Import from{" "}
                <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">@jayziv/design-system-core</code>.
                Check <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">MANIFEST.json</code> before building.
              </Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Heading level={3} className="text-base font-semibold">Agents</Heading>
            </CardHeader>
            <CardContent>
              <Text className="text-sm text-muted-foreground">
                Use Page Planner → Page Builder for each page. Component Requester for DS gaps. Theme Customizer for brand setup.
              </Text>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
