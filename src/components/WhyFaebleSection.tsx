import * as React from "react"
import {
  Card,
  CardContent,
  Heading,
  Text,
  SectionLabel,
  ScrollReveal,
  cn,
} from "@jayziv/design-system-core"

const differentiators = [
  {
    icon: "⟡",
    title: "Opinionated by default",
    body: "We bring a perspective, not just a backlog. Every engagement starts with a discovery sprint to align on what actually matters.",
  },
  {
    icon: "◈",
    title: "Async-native team",
    body: "Timezone-flexible, documentation-first. You get structured updates, not standups for standups' sake.",
  },
  {
    icon: "✦",
    title: "Code you can own",
    body: "No proprietary lock-in. Everything we ship is yours — readable, documented, portable.",
  },
  {
    icon: "⬡",
    title: "Magic without mystery",
    body: "Premium craft that doesn't perform complexity. We explain every decision so you build confidence, not dependency.",
  },
]

export interface WhyFaebleSectionProps {
  className?: string
}

export const WhyFaebleSection = React.forwardRef<HTMLElement, WhyFaebleSectionProps>(
  ({ className }, ref) => {
    return (
      <ScrollReveal direction="up">
        <section
          id="why-faeble"
          ref={ref}
          className={cn("py-16", className)}
        >
          <div className="container mx-auto px-6">
            <SectionLabel>Why us</SectionLabel>
            <Heading as="h2" className="mt-2 mb-12">
              Four things we never compromise on.
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {differentiators.map((item) => (
                <Card
                  key={item.title}
                  className="transition-shadow duration-500 hover:shadow-[var(--shadow-md)]"
                >
                  <CardContent className="p-6 flex flex-col gap-3">
                    <Text className="text-3xl text-primary leading-none">
                      {item.icon}
                    </Text>
                    <Heading as="h3" className="text-lg">
                      {item.title}
                    </Heading>
                    <Text className="text-muted-foreground">{item.body}</Text>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    )
  }
)
WhyFaebleSection.displayName = "WhyFaebleSection"
