import { describe, it, expect, vi, beforeEach } from "vitest";
import { SanityAdapter } from "../adapters/sanity";

// Mock the sanity module
const mockSanityFetch = vi.fn();
const mockQueries = {
  homeQuery: "home-query",
  aboutQuery: "about-query",
  servicesQuery: "services-query",
  contactQuery: "contact-query",
  siteQuery: "site-query",
};

vi.mock("../../sanity", () => ({
  sanityFetch: mockSanityFetch,
  homeQuery: "home-query",
  aboutQuery: "about-query",
  servicesQuery: "services-query",
  contactQuery: "contact-query",
  siteQuery: "site-query",
}));

describe("SanityAdapter", () => {
  let adapter: SanityAdapter;

  beforeEach(() => {
    vi.clearAllMocks();
    adapter = new SanityAdapter();
  });

  describe("getHomePageData", () => {
    it("returns data from Sanity when available", async () => {
      const mockData = {
        hero: {
          title: "Sanity Title",
          subtitle: "Sanity Subtitle",
          primaryAction: {
            label: "Primary",
            href: "/primary",
          },
          secondaryAction: {
            label: "Secondary",
            href: "/secondary",
          },
        },
        stats: {
          label: "Stats",
          variant: "cards",
          items: [
            { value: "200", label: "Customers" },
          ],
        },
        testimonials: {
          heading: "Testimonials",
          label: "Reviews",
          items: [
            {
              quote: "Excellent!",
              name: "Jane Smith",
              role: "CTO",
              company: "TechCo",
              avatarFallback: "JS",
            },
          ],
        },
        cta: {
          heading: "Get Started",
          subtext: "Join us today",
          variant: "primary",
          primaryAction: {
            label: "Sign Up",
            href: "/signup",
          },
          secondaryAction: {
            label: "Learn More",
            href: "/learn",
          },
        },
      };

      mockSanityFetch.mockResolvedValue(mockData);

      const result = await adapter.getHomePageData();

      expect(mockSanityFetch).toHaveBeenCalledWith("home-query");
      expect(result.hero.title).toBe("Sanity Title");
      expect(result.stats.items).toHaveLength(1);
      expect(result.testimonials.items).toHaveLength(1);
    });

    it("falls back to StaticAdapter when Sanity returns null", async () => {
      mockSanityFetch.mockResolvedValue(null);

      const result = await adapter.getHomePageData();

      expect(result).toHaveProperty("hero");
      expect(result.hero.title).toBeTruthy();
    });

    it("handles missing secondary actions", async () => {
      const mockData = {
        hero: {
          title: "Test",
          subtitle: "Test",
          primaryAction: {
            label: "Primary",
            href: "/primary",
          },
          secondaryAction: null,
        },
        stats: {
          label: "Stats",
          variant: "default",
          items: [],
        },
        testimonials: {
          heading: "Test",
          label: "Test",
          items: [],
        },
        cta: {
          heading: "Test",
          subtext: "Test",
          variant: "default",
          primaryAction: {
            label: "CTA",
            href: "/cta",
          },
          secondaryAction: null,
        },
      };

      mockSanityFetch.mockResolvedValue(mockData);

      const result = await adapter.getHomePageData();

      expect(result.hero.secondaryAction).toBeUndefined();
      expect(result.cta.secondaryAction).toBeUndefined();
    });

    it("correctly casts variant types", async () => {
      const mockData = {
        hero: {
          title: "Test",
          subtitle: "Test",
          primaryAction: { label: "Test", href: "/" },
        },
        stats: {
          label: "Test",
          variant: "minimal",
          items: [],
        },
        testimonials: {
          heading: "Test",
          label: "Test",
          items: [],
        },
        cta: {
          heading: "Test",
          subtext: "Test",
          variant: "muted",
          primaryAction: { label: "Test", href: "/" },
        },
      };

      mockSanityFetch.mockResolvedValue(mockData);

      const result = await adapter.getHomePageData();

      expect(result.stats.variant).toBe("minimal");
      expect(result.cta.variant).toBe("muted");
    });
  });

  describe("getAboutPageData", () => {
    it("returns data from Sanity when available", async () => {
      const mockData = {
        about: {
          title: "About Our Company",
          subtitle: "Our Story",
          content: "We are amazing",
          stats: [
            { value: "15", label: "Years" },
          ],
        },
        stats: {
          label: "Statistics",
          columns: 3,
          variant: "cards",
          items: [
            { value: "500", label: "Projects" },
          ],
        },
        team: {
          heading: "Meet the Team",
          label: "Team",
          columns: 4,
          members: [
            {
              name: "John Smith",
              role: "Developer",
              bio: "Expert coder",
              avatarFallback: "JS",
            },
          ],
        },
      };

      mockSanityFetch.mockResolvedValue(mockData);

      const result = await adapter.getAboutPageData();

      expect(mockSanityFetch).toHaveBeenCalledWith("about-query");
      expect(result.about.title).toBe("About Our Company");
      expect(result.stats.columns).toBe(3);
      expect(result.team.columns).toBe(4);
      expect(result.team.members).toHaveLength(1);
    });

    it("falls back to StaticAdapter when Sanity returns null", async () => {
      mockSanityFetch.mockResolvedValue(null);

      const result = await adapter.getAboutPageData();

      expect(result).toHaveProperty("about");
      expect(result.about.title).toBeTruthy();
    });

    it("correctly casts column numbers", async () => {
      const mockData = {
        about: {
          title: "Test",
          subtitle: "Test",
          content: "Test",
          stats: [],
        },
        stats: {
          label: "Test",
          columns: 2,
          variant: "default",
          items: [],
        },
        team: {
          heading: "Test",
          label: "Test",
          columns: 3,
          members: [],
        },
      };

      mockSanityFetch.mockResolvedValue(mockData);

      const result = await adapter.getAboutPageData();

      expect(result.stats.columns).toBe(2);
      expect(result.team.columns).toBe(3);
    });
  });

  describe("getServicesPageData", () => {
    it("returns data from Sanity when available", async () => {
      const mockData = {
        services: {
          title: "Our Services",
          label: "Services",
          items: [
            {
              id: "svc-1",
              title: "Consulting",
              description: "Expert advice",
            },
            {
              id: "svc-2",
              title: "Development",
              description: "Custom solutions",
            },
          ],
        },
        faq: {
          heading: "Frequently Asked Questions",
          label: "FAQ",
          items: [
            {
              question: "How much does it cost?",
              answer: "Contact us for pricing",
            },
          ],
        },
        cta: {
          heading: "Ready to start?",
          subtext: "Let's talk",
          variant: "primary",
          primaryAction: {
            label: "Contact Us",
            href: "/contact",
          },
          secondaryAction: null,
        },
      };

      mockSanityFetch.mockResolvedValue(mockData);

      const result = await adapter.getServicesPageData();

      expect(mockSanityFetch).toHaveBeenCalledWith("services-query");
      expect(result.services.items).toHaveLength(2);
      expect(result.faq.items).toHaveLength(1);
    });

    it("falls back to StaticAdapter when Sanity returns null", async () => {
      mockSanityFetch.mockResolvedValue(null);

      const result = await adapter.getServicesPageData();

      expect(result).toHaveProperty("services");
      expect(result.services.title).toBeTruthy();
    });
  });

  describe("getContactPageData", () => {
    it("returns data from Sanity when available", async () => {
      const mockData = {
        contact: {
          title: "Get in Touch",
          subtitle: "We'd love to hear from you",
          label: "Contact",
        },
        form: {
          submitLabel: "Send Message",
          loadingLabel: "Sending...",
          successMessage: "Message sent!",
          fields: {
            name: {
              label: "Full Name",
              placeholder: "Enter your name",
            },
            email: {
              label: "Email Address",
              placeholder: "your@email.com",
            },
            subject: {
              label: "Subject Line",
              placeholder: "What's this about?",
            },
            message: {
              label: "Your Message",
              placeholder: "Tell us more...",
              rows: 8,
            },
          },
        },
      };

      mockSanityFetch.mockResolvedValue(mockData);

      const result = await adapter.getContactPageData();

      expect(mockSanityFetch).toHaveBeenCalledWith("contact-query");
      expect(result.contact.title).toBe("Get in Touch");
      expect(result.form.fields.message.rows).toBe(8);
    });

    it("falls back to StaticAdapter when Sanity returns null", async () => {
      mockSanityFetch.mockResolvedValue(null);

      const result = await adapter.getContactPageData();

      expect(result).toHaveProperty("contact");
      expect(result.contact.title).toBeTruthy();
    });

    it("defaults message rows to 5 when not provided", async () => {
      const mockData = {
        contact: {
          title: "Test",
          subtitle: "Test",
          label: "Test",
        },
        form: {
          submitLabel: "Submit",
          loadingLabel: "Loading",
          successMessage: "Success",
          fields: {
            name: { label: "Name", placeholder: "Name" },
            email: { label: "Email", placeholder: "Email" },
            subject: { label: "Subject", placeholder: "Subject" },
            message: {
              label: "Message",
              placeholder: "Message",
              rows: null,
            },
          },
        },
      };

      mockSanityFetch.mockResolvedValue(mockData);

      const result = await adapter.getContactPageData();

      expect(result.form.fields.message.rows).toBe(5);
    });
  });

  describe("getSiteMetadata", () => {
    it("returns data from Sanity when available", async () => {
      const mockData = {
        name: "Sanity Site",
        description: "Powered by Sanity",
        locale: "en_US",
        openGraph: {
          title: "Sanity OG Title",
          description: "Sanity OG Description",
          siteName: "Sanity Site",
          imageAlt: "Logo",
        },
        twitter: {
          title: "Sanity Twitter",
          description: "Follow us",
        },
      };

      mockSanityFetch.mockResolvedValue(mockData);

      const result = await adapter.getSiteMetadata();

      expect(mockSanityFetch).toHaveBeenCalledWith("site-query");
      expect(result.name).toBe("Sanity Site");
      expect(result.description).toBe("Powered by Sanity");
      expect(result.url).toBe("http://localhost:3000");
    });

    it("falls back to StaticAdapter when Sanity returns null", async () => {
      mockSanityFetch.mockResolvedValue(null);

      const result = await adapter.getSiteMetadata();

      expect(result).toHaveProperty("name");
      expect(result.name).toBeTruthy();
    });
  });
});
