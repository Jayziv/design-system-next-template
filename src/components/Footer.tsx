import * as React from "react"
import { Button, Separator, Text, cn } from "@jayziv/design-system-core"

export interface FooterProps {
  className?: string
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className }, ref) => {
    return (
      <footer ref={ref} className={cn(className)}>
        <Separator />
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Text className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Faeble Studio. Leeds, UK.
          </Text>
          <nav aria-label="Footer navigation" className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://www.linkedin.com/company/faeblestudio" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/faeblestudio" target="_blank" rel="noopener noreferrer">GitHub</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://x.com/faeblestudio" target="_blank" rel="noopener noreferrer">X</a>
            </Button>
          </nav>
        </div>
      </footer>
    )
  }
)
Footer.displayName = "Footer"
