import { describe, it, expect, vi, beforeEach } from "vitest";
import { KeystaticAdapter } from "../adapters/keystatic";

// Mock the Keystatic reader
const mockReader = {
  singletons: {
    home: {
      read: vi.fn(),
    },
    about: {
      read: vi.fn(),
    },
    services: {
      read: vi.fn(),
    },
    contact: {
      read: vi.fn(),
    },
    site: {
      read: vi.fn(),
    },
  },
};

vi.mock("@keystatic/core/reader", () => ({
  createReader: vi.fn(() => mockReader),
}));

vi.mock("../../../../keystatic.config", () => ({
  default: {},
}));

describe("KeystaticAdapter", () => {
  let adapter: KeystaticAdapter;

  beforeEach(() => {
    vi.clearAllMocks();
    adapter = new KeystaticAdapter();
  });

  describe("getHomePageData", () => {
    it("returns data from Keystatic when available", async () => {
      const mockData = {
        hero: {
          title: "Test Title",
          subtitle: "Test Subtitle",
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
            { value: "100", label: "Items" },
          ],
        },
        testimonials: {
          heading: "Testimonials",
          label: "What they say",
          items: [
            {
              quote: "Great!",
              name: "John Doe",
              role: "CEO",
              company: "Acme",
              avatarFallback: "JD",
            },
          ],
        },
        cta: {
          heading: "CTA",
          subtext: "Subtext",
          variant: "primary",
          primaryAction: {
            label: "CTA Button",
            href: "/cta",
          },
          secondaryAction: {
            label: "Secondary",
            href: "/secondary",
          },
        },
      };

      mockReader.singletons.home.read.mockResolvedValue(mockData);

      const result = await adapter.getHomePageData();

      expect(result.hero.title).toBe("Test Title");
      expect(result.hero.subtitle).toBe("Test Subtitle");
      expect(result.stats.items).toHaveLength(1);
      expect(result.testimonials.items).toHaveLength(1);
    });

    it("falls back to StaticAdapter when Keystatic returns null", async () => {
      mockReader.singletons.home.read.mockResolvedValue(null);

      const result = await adapter.getHomePageData();

      // Should return static data
      expect(result).toHaveProperty("hero");
      expect(result.hero).toHaveProperty("title");
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
          variant: "cards",
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

      mockReader.singletons.home.read.mockResolvedValue(mockData);

      const result = await adapter.getHomePageData();

      expect(result.hero.secondaryAction).toBeUndefined();
      expect(result.cta.secondaryAction).toBeUndefined();
    });
  });

  describe("getAboutPageData", () => {
    it("returns data from Keystatic when available", async () => {
      const mockData = {
        about: {
          title: "About Us",
          subtitle: "Who we are",
          content: "Our story",
          stats: [
            { value: "10", label: "Years" },
          ],
        },
        stats: {
          label: "By numbers",
          columns: "4",
          variant: "minimal",
          items: [
            { value: "100", label: "Clients" },
          ],
        },
        team: {
          heading: "Our Team",
          label: "Meet us",
          columns: "3",
          members: [
            {
              name: "Jane Doe",
              role: "CEO",
              bio: "Leader",
              avatarFallback: "JD",
            },
          ],
        },
      };

      mockReader.singletons.about.read.mockResolvedValue(mockData);

      const result = await adapter.getAboutPageData();

      expect(result.about.title).toBe("About Us");
      expect(result.stats.columns).toBe(4);
      expect(result.team.columns).toBe(3);
      expect(result.team.members).toHaveLength(1);
    });

    it("falls back to StaticAdapter when Keystatic returns null", async () => {
      mockReader.singletons.about.read.mockResolvedValue(null);

      const result = await adapter.getAboutPageData();

      expect(result).toHaveProperty("about");
      expect(result.about.title).toBeTruthy();
    });

    it("correctly parses column numbers from strings", async () => {
      const mockData = {
        about: {
          title: "Test",
          subtitle: "Test",
          content: "Test",
          stats: [],
        },
        stats: {
          label: "Test",
          columns: "2",
          variant: "default",
          items: [],
        },
        team: {
          heading: "Test",
          label: "Test",
          columns: "4",
          members: [],
        },
      };

      mockReader.singletons.about.read.mockResolvedValue(mockData);

      const result = await adapter.getAboutPageData();

      expect(result.stats.columns).toBe(2);
      expect(result.team.columns).toBe(4);
    });
  });

  describe("getServicesPageData", () => {
    it("returns data from Keystatic when available", async () => {
      const mockData = {
        services: {
          title: "Our Services",
          label: "What we do",
          items: [
            {
              id: "service-1",
              title: "Service 1",
              description: "Description 1",
            },
          ],
        },
        faq: {
          heading: "FAQ",
          label: "Questions",
          items: [
            {
              question: "Question?",
              answer: "Answer.",
            },
          ],
        },
        cta: {
          heading: "CTA",
          subtext: "Text",
          variant: "muted",
          primaryAction: {
            label: "Contact",
            href: "/contact",
          },
          secondaryAction: null,
        },
      };

      mockReader.singletons.services.read.mockResolvedValue(mockData);

      const result = await adapter.getServicesPageData();

      expect(result.services.title).toBe("Our Services");
      expect(result.services.items).toHaveLength(1);
      expect(result.faq.items).toHaveLength(1);
    });

    it("falls back to StaticAdapter when Keystatic returns null", async () => {
      mockReader.singletons.services.read.mockResolvedValue(null);

      const result = await adapter.getServicesPageData();

      expect(result).toHaveProperty("services");
      expect(result.services.title).toBeTruthy();
    });
  });

  describe("getContactPageData", () => {
    it("returns data from Keystatic when available", async () => {
      const mockData = {
        contact: {
          title: "Contact Us",
          subtitle: "Get in touch",
          label: "Contact",
        },
        form: {
          submitLabel: "Submit",
          loadingLabel: "Sending...",
          successMessage: "Success!",
          fields: {
            name: {
              label: "Name",
              placeholder: "Your name",
            },
            email: {
              label: "Email",
              placeholder: "Your email",
            },
            subject: {
              label: "Subject",
              placeholder: "Subject",
            },
            message: {
              label: "Message",
              placeholder: "Your message",
              rows: 10,
            },
          },
        },
      };

      mockReader.singletons.contact.read.mockResolvedValue(mockData);

      const result = await adapter.getContactPageData();

      expect(result.contact.title).toBe("Contact Us");
      expect(result.form.fields.message.rows).toBe(10);
    });

    it("falls back to StaticAdapter when Keystatic returns null", async () => {
      mockReader.singletons.contact.read.mockResolvedValue(null);

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

      mockReader.singletons.contact.read.mockResolvedValue(mockData);

      const result = await adapter.getContactPageData();

      expect(result.form.fields.message.rows).toBe(5);
    });
  });

  describe("getSiteMetadata", () => {
    it("returns data from Keystatic when available", async () => {
      const mockData = {
        name: "My Site",
        description: "Site description",
        locale: "en_US",
        openGraph: {
          title: "OG Title",
          description: "OG Description",
          siteName: "My Site",
          imageAlt: "Image",
        },
        twitter: {
          title: "Twitter Title",
          description: "Twitter Description",
        },
      };

      mockReader.singletons.site.read.mockResolvedValue(mockData);

      const result = await adapter.getSiteMetadata();

      expect(result.name).toBe("My Site");
      expect(result.description).toBe("Site description");
      expect(result.locale).toBe("en_US");
      expect(result.url).toBe("http://localhost:3000");
    });

    it("falls back to StaticAdapter when Keystatic returns null", async () => {
      mockReader.singletons.site.read.mockResolvedValue(null);

      const result = await adapter.getSiteMetadata();

      expect(result).toHaveProperty("name");
      expect(result.name).toBeTruthy();
    });
  });
});
