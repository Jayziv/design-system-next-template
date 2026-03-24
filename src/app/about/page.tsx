// About page — content fetched from CMS adapter
// Sections: About → Stats → Team
//
// This is a server component. Content is fetched at build time (static)
// or request time (dynamic CMS) based on CMS_PROVIDER env var.

import {
  AboutSection,
  TeamSection,
  StatsSection,
  Text,
} from "@jayziv/design-system-core"
import type { Metadata } from "next"
import { getContentAdapter } from "@/lib/cms"

export const metadata: Metadata = {
  title: "About",
  description: "Meet the team behind Faeble Studio. 7+ years of web development experience, now focused on building fast, accessible websites for UK businesses.",
}

export default async function AboutPage() {
  const adapter = getContentAdapter()
  const data = await adapter.getAboutPageData()

  return (
    <main>
      <AboutSection
        title={data.about.title}
        subtitle={data.about.subtitle}
        content={<Text>{data.about.content}</Text>}
        stats={data.about.stats}
      />

      <StatsSection
        label={data.stats.label}
        stats={data.stats.items}
        columns={data.stats.columns}
        variant={data.stats.variant}
      />

      <TeamSection
        heading={data.team.heading}
        label={data.team.label}
        members={data.team.members}
        columns={data.team.columns}
      />
    </main>
  )
}
