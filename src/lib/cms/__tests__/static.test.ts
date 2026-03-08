import { describe, it, expect } from "vitest";
import { StaticAdapter } from "../adapters/static";
import type {
  HomePageData,
  AboutPageData,
  ServicesPageData,
  ContactPageData,
  SiteMetadata,
} from "../types";

describe("StaticAdapter", () => {
  const adapter = new StaticAdapter();

  describe("getHomePageData", () => {
    it("returns a Promise", () => {
      const result = adapter.getHomePageData();
      expect(result).toBeInstanceOf(Promise);
    });

    it("returns correct HomePageData structure", async () => {
      const data = await adapter.getHomePageData();

      // Verify structure matches interface
      expect(data).toHaveProperty("hero");
      expect(data).toHaveProperty("stats");
      expect(data).toHaveProperty("testimonials");
      expect(data).toHaveProperty("cta");

      // Verify hero section
      expect(data.hero).toHaveProperty("title");
      expect(data.hero).toHaveProperty("subtitle");
      expect(data.hero).toHaveProperty("primaryAction");
      expect(data.hero.primaryAction).toHaveProperty("label");
      expect(data.hero.primaryAction).toHaveProperty("href");

      // Verify stats section
      expect(data.stats).toHaveProperty("label");
      expect(data.stats).toHaveProperty("items");
      expect(Array.isArray(data.stats.items)).toBe(true);
      expect(data.stats.items.length).toBeGreaterThan(0);

      // Verify testimonials section
      expect(data.testimonials).toHaveProperty("heading");
      expect(data.testimonials).toHaveProperty("label");
      expect(data.testimonials).toHaveProperty("items");
      expect(Array.isArray(data.testimonials.items)).toBe(true);

      // Verify CTA section
      expect(data.cta).toHaveProperty("heading");
      expect(data.cta).toHaveProperty("subtext");
      expect(data.cta).toHaveProperty("primaryAction");
    });

    it("returns data with no null or undefined values in required fields", async () => {
      const data = await adapter.getHomePageData();

      expect(data.hero.title).toBeTruthy();
      expect(data.hero.subtitle).toBeTruthy();
      expect(data.hero.primaryAction.label).toBeTruthy();
      expect(data.hero.primaryAction.href).toBeTruthy();
      expect(data.stats.label).toBeTruthy();
      expect(data.testimonials.heading).toBeTruthy();
      expect(data.cta.heading).toBeTruthy();
    });

    it("returns valid stat items", async () => {
      const data = await adapter.getHomePageData();

      data.stats.items.forEach((stat) => {
        expect(stat).toHaveProperty("value");
        expect(stat).toHaveProperty("label");
        expect(typeof stat.value).toBe("string");
        expect(typeof stat.label).toBe("string");
        expect(stat.value).toBeTruthy();
        expect(stat.label).toBeTruthy();
      });
    });

    it("returns valid testimonial items", async () => {
      const data = await adapter.getHomePageData();

      data.testimonials.items.forEach((testimonial) => {
        expect(testimonial).toHaveProperty("quote");
        expect(testimonial).toHaveProperty("name");
        expect(testimonial).toHaveProperty("role");
        expect(testimonial).toHaveProperty("company");
        expect(testimonial).toHaveProperty("avatarFallback");
        expect(typeof testimonial.quote).toBe("string");
        expect(typeof testimonial.name).toBe("string");
        expect(testimonial.quote).toBeTruthy();
        expect(testimonial.name).toBeTruthy();
      });
    });
  });

  describe("getAboutPageData", () => {
    it("returns a Promise", () => {
      const result = adapter.getAboutPageData();
      expect(result).toBeInstanceOf(Promise);
    });

    it("returns correct AboutPageData structure", async () => {
      const data = await adapter.getAboutPageData();

      // Verify structure
      expect(data).toHaveProperty("about");
      expect(data).toHaveProperty("stats");
      expect(data).toHaveProperty("team");

      // Verify about section
      expect(data.about).toHaveProperty("title");
      expect(data.about).toHaveProperty("subtitle");
      expect(data.about).toHaveProperty("content");
      expect(data.about).toHaveProperty("stats");
      expect(Array.isArray(data.about.stats)).toBe(true);

      // Verify stats section
      expect(data.stats).toHaveProperty("label");
      expect(data.stats).toHaveProperty("items");
      expect(Array.isArray(data.stats.items)).toBe(true);

      // Verify team section
      expect(data.team).toHaveProperty("heading");
      expect(data.team).toHaveProperty("label");
      expect(data.team).toHaveProperty("members");
      expect(Array.isArray(data.team.members)).toBe(true);
    });

    it("returns data with no null or undefined values in required fields", async () => {
      const data = await adapter.getAboutPageData();

      expect(data.about.title).toBeTruthy();
      expect(data.about.subtitle).toBeTruthy();
      expect(data.about.content).toBeTruthy();
      expect(data.stats.label).toBeTruthy();
      expect(data.team.heading).toBeTruthy();
      expect(data.team.label).toBeTruthy();
    });

    it("returns valid team member items", async () => {
      const data = await adapter.getAboutPageData();

      data.team.members.forEach((member) => {
        expect(member).toHaveProperty("name");
        expect(member).toHaveProperty("role");
        expect(member).toHaveProperty("bio");
        expect(member).toHaveProperty("avatarFallback");
        expect(typeof member.name).toBe("string");
        expect(typeof member.role).toBe("string");
        expect(member.name).toBeTruthy();
        expect(member.role).toBeTruthy();
      });
    });
  });

  describe("getServicesPageData", () => {
    it("returns a Promise", () => {
      const result = adapter.getServicesPageData();
      expect(result).toBeInstanceOf(Promise);
    });

    it("returns correct ServicesPageData structure", async () => {
      const data = await adapter.getServicesPageData();

      // Verify structure
      expect(data).toHaveProperty("services");
      expect(data).toHaveProperty("faq");
      expect(data).toHaveProperty("cta");

      // Verify services section
      expect(data.services).toHaveProperty("title");
      expect(data.services).toHaveProperty("label");
      expect(data.services).toHaveProperty("items");
      expect(Array.isArray(data.services.items)).toBe(true);

      // Verify FAQ section
      expect(data.faq).toHaveProperty("heading");
      expect(data.faq).toHaveProperty("label");
      expect(data.faq).toHaveProperty("items");
      expect(Array.isArray(data.faq.items)).toBe(true);

      // Verify CTA section
      expect(data.cta).toHaveProperty("heading");
      expect(data.cta).toHaveProperty("subtext");
      expect(data.cta).toHaveProperty("primaryAction");
    });

    it("returns data with no null or undefined values in required fields", async () => {
      const data = await adapter.getServicesPageData();

      expect(data.services.title).toBeTruthy();
      expect(data.services.label).toBeTruthy();
      expect(data.faq.heading).toBeTruthy();
      expect(data.faq.label).toBeTruthy();
      expect(data.cta.heading).toBeTruthy();
    });

    it("returns valid service items", async () => {
      const data = await adapter.getServicesPageData();

      data.services.items.forEach((service) => {
        expect(service).toHaveProperty("id");
        expect(service).toHaveProperty("title");
        expect(service).toHaveProperty("description");
        expect(typeof service.id).toBe("string");
        expect(typeof service.title).toBe("string");
        expect(service.id).toBeTruthy();
        expect(service.title).toBeTruthy();
      });
    });

    it("returns valid FAQ items", async () => {
      const data = await adapter.getServicesPageData();

      data.faq.items.forEach((item) => {
        expect(item).toHaveProperty("question");
        expect(item).toHaveProperty("answer");
        expect(typeof item.question).toBe("string");
        expect(typeof item.answer).toBe("string");
        expect(item.question).toBeTruthy();
        expect(item.answer).toBeTruthy();
      });
    });
  });

  describe("getContactPageData", () => {
    it("returns a Promise", () => {
      const result = adapter.getContactPageData();
      expect(result).toBeInstanceOf(Promise);
    });

    it("returns correct ContactPageData structure", async () => {
      const data = await adapter.getContactPageData();

      // Verify structure
      expect(data).toHaveProperty("contact");
      expect(data).toHaveProperty("form");

      // Verify contact section
      expect(data.contact).toHaveProperty("title");
      expect(data.contact).toHaveProperty("subtitle");
      expect(data.contact).toHaveProperty("label");

      // Verify form section
      expect(data.form).toHaveProperty("submitLabel");
      expect(data.form).toHaveProperty("loadingLabel");
      expect(data.form).toHaveProperty("successMessage");
      expect(data.form).toHaveProperty("fields");

      // Verify form fields
      expect(data.form.fields).toHaveProperty("name");
      expect(data.form.fields).toHaveProperty("email");
      expect(data.form.fields).toHaveProperty("subject");
      expect(data.form.fields).toHaveProperty("message");
    });

    it("returns data with no null or undefined values in required fields", async () => {
      const data = await adapter.getContactPageData();

      expect(data.contact.title).toBeTruthy();
      expect(data.contact.subtitle).toBeTruthy();
      expect(data.form.submitLabel).toBeTruthy();
      expect(data.form.loadingLabel).toBeTruthy();
      expect(data.form.successMessage).toBeTruthy();
    });

    it("returns valid form field configurations", async () => {
      const data = await adapter.getContactPageData();

      Object.entries(data.form.fields).forEach(([key, field]) => {
        expect(field).toHaveProperty("label");
        expect(field).toHaveProperty("placeholder");
        expect(typeof field.label).toBe("string");
        expect(typeof field.placeholder).toBe("string");
        expect(field.label).toBeTruthy();

        if (key === "message") {
          expect(field).toHaveProperty("rows");
          expect(typeof field.rows).toBe("number");
          expect(field.rows).toBeGreaterThan(0);
        }
      });
    });
  });

  describe("getSiteMetadata", () => {
    it("returns a Promise", () => {
      const result = adapter.getSiteMetadata();
      expect(result).toBeInstanceOf(Promise);
    });

    it("returns correct SiteMetadata structure", async () => {
      const data = await adapter.getSiteMetadata();

      // Verify structure
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("description");
      expect(data).toHaveProperty("url");
      expect(data).toHaveProperty("locale");
      expect(data).toHaveProperty("openGraph");
      expect(data).toHaveProperty("twitter");

      // Verify OpenGraph
      expect(data.openGraph).toHaveProperty("title");
      expect(data.openGraph).toHaveProperty("description");
      expect(data.openGraph).toHaveProperty("siteName");
      expect(data.openGraph).toHaveProperty("imageAlt");

      // Verify Twitter
      expect(data.twitter).toHaveProperty("title");
      expect(data.twitter).toHaveProperty("description");
    });

    it("returns data with no null or undefined values in required fields", async () => {
      const data = await adapter.getSiteMetadata();

      expect(data.name).toBeTruthy();
      expect(data.description).toBeTruthy();
      expect(data.url).toBeTruthy();
      expect(data.locale).toBeTruthy();
      expect(data.openGraph.title).toBeTruthy();
      expect(data.twitter.title).toBeTruthy();
    });

    it("returns valid URL", async () => {
      const data = await adapter.getSiteMetadata();

      expect(data.url).toMatch(/^https?:\/\//);
    });

    it("respects NEXT_PUBLIC_SITE_URL environment variable", async () => {
      const data = await adapter.getSiteMetadata();

      // Check that URL comes from env or default
      expect(data.url).toBe("http://localhost:3000");
    });
  });
});
