// About page — edit content below to match your client's brand
// Sections: About → Stats → Team
//
// AboutSection uses `title` + `content` props (required).
// Replace all placeholder text with real client copy.

import {
  AboutSection,
  TeamSection,
  StatsSection,
  Text,
} from "@jayziv/design-system-core"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about our team and our story.", // ← Customise
}

export default function AboutPage() {
  return (
    <main>
      {/* ← Replace title/content with client brand story */}
      <AboutSection
        title="We help businesses grow"
        subtitle="About us"
        content={
          <Text>
            Tell your brand story here. Who are you, what do you do, and why does it matter?
            This section supports rich content — add multiple paragraphs, lists, or images.
          </Text>
        }
        stats={[
          { value: "10+", label: "Years in business" },
          { value: "500+", label: "Projects delivered" },
        ]}
      />

      {/* ← Replace with real client metrics */}
      <StatsSection
        label="Our track record"
        stats={[
          { value: "10+", label: "Years experience" },
          { value: "500+", label: "Projects completed" },
          { value: "50+", label: "Team members" },
          { value: "20+", label: "Countries served" },
        ]}
        columns={4}
        variant="minimal"
      />

      {/* ← Replace with real team members */}
      <TeamSection
        heading="Meet the team"
        label="Our people"
        members={[
          {
            name: "Alex Rivera",
            role: "Founder & CEO",
            bio: "Short bio about this team member.",
            avatarFallback: "AR",
          },
          {
            name: "Jordan Kim",
            role: "Head of Design",
            bio: "Short bio about this team member.",
            avatarFallback: "JK",
          },
          {
            name: "Sam Patel",
            role: "Lead Developer",
            bio: "Short bio about this team member.",
            avatarFallback: "SP",
          },
        ]}
        columns={3}
      />
    </main>
  )
}
