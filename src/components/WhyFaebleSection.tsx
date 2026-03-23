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
    title: "No agency overhead",
    body: "You work directly with the person building your site. No account managers, no juniors, no game of telephone.",
  },
  {
    icon: "◈",
    title: "Built for speed",
    body: "Every site ships with 90+ Lighthouse scores. Your visitors won't wait — and neither will Google.",
  },
  {
    icon: "✦",
    title: "You own everything",
    body: "No lock-in, ever. Full source code, documentation, and hosting freedom. If we part ways, you keep it all.",
  },
  {
    icon: "⬡",
    title: "Honest pricing",
    body: "Fixed-price quotes before we start. No scope creep surprises, no hidden fees. You know the cost upfront.",
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
