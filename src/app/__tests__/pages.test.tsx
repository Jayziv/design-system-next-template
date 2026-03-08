import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock the design system components
vi.mock("@jayziv/design-system-core", () => ({
  HeroSection: ({ title, subtitle }: any) => (
    <div data-testid="hero-section">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  ),
  StatsSection: ({ label, stats }: any) => (
    <div data-testid="stats-section">
      <span>{label}</span>
      <div>{stats?.length || 0} stats</div>
    </div>
  ),
  TestimonialsSection: ({ heading, testimonials }: any) => (
    <div data-testid="testimonials-section">
      <h2>{heading}</h2>
      <div>{testimonials?.length || 0} testimonials</div>
    </div>
  ),
  CTABannerSection: ({ heading, subtext }: any) => (
    <div data-testid="cta-section">
      <h2>{heading}</h2>
      <p>{subtext}</p>
    </div>
  ),
  AboutSection: ({ title, content }: any) => (
    <div data-testid="about-section">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  ),
  TeamSection: ({ heading, members }: any) => (
    <div data-testid="team-section">
      <h2>{heading}</h2>
      <div>{members?.length || 0} members</div>
    </div>
  ),
  ServicesSection: ({ title, services }: any) => (
    <div data-testid="services-section">
      <h2>{title}</h2>
      <div>{services?.length || 0} services</div>
    </div>
  ),
  FAQSection: ({ heading, faqs }: any) => (
    <div data-testid="faq-section">
      <h2>{heading}</h2>
      <div>{faqs?.length || 0} questions</div>
    </div>
  ),
  ContactForm: ({ onSubmit }: any) => (
    <form data-testid="contact-form" onSubmit={onSubmit}>
      <input name="email" />
      <button type="submit">Submit</button>
    </form>
  ),
}));

// Mock the CMS adapter
const mockAdapter = {
  getHomePageData: vi.fn(),
  getAboutPageData: vi.fn(),
  getServicesPageData: vi.fn(),
  getContactPageData: vi.fn(),
  getSiteMetadata: vi.fn(),
};

vi.mock("@/lib/cms", () => ({
  getContentAdapter: () => mockAdapter,
}));

describe("Page Components Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("HomePage", () => {
    it("renders without crashing with static adapter", async () => {
      mockAdapter.getHomePageData.mockResolvedValue({
        hero: {
          title: "Welcome",
          subtitle: "Subtitle",
          primaryAction: { label: "Start", href: "/" },
        },
        stats: {
          label: "Stats",
          items: [{ value: "100", label: "Clients" }],
        },
        testimonials: {
          heading: "Reviews",
          label: "Testimonials",
          items: [],
        },
        cta: {
          heading: "Join",
          subtext: "Today",
          primaryAction: { label: "Sign up", href: "/signup" },
        },
      });

      // Dynamic import to handle async component
      const { default: HomePage } = await import("../page");
      const result = await HomePage();

      render(result);

      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
      expect(screen.getByTestId("stats-section")).toBeInTheDocument();
      expect(screen.getByTestId("testimonials-section")).toBeInTheDocument();
      expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    });

    it("displays hero content correctly", async () => {
      mockAdapter.getHomePageData.mockResolvedValue({
        hero: {
          title: "Test Title",
          subtitle: "Test Subtitle",
          primaryAction: { label: "Action", href: "/" },
        },
        stats: {
          label: "Stats",
          items: [],
        },
        testimonials: {
          heading: "Testimonials",
          label: "Label",
          items: [],
        },
        cta: {
          heading: "CTA",
          subtext: "Text",
          primaryAction: { label: "CTA", href: "/" },
        },
      });

      const { default: HomePage } = await import("../page");
      const result = await HomePage();

      render(result);

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    });

    it("handles adapter errors gracefully", async () => {
      mockAdapter.getHomePageData.mockRejectedValue(new Error("API Error"));

      const { default: HomePage } = await import("../page");

      // Should throw and be caught by error boundary in real app
      await expect(HomePage()).rejects.toThrow("API Error");
    });
  });

  describe("AboutPage", () => {
    it("renders without crashing with static adapter", async () => {
      mockAdapter.getAboutPageData.mockResolvedValue({
        about: {
          title: "About Us",
          subtitle: "Our Story",
          content: "Content",
          stats: [],
        },
        stats: {
          label: "Stats",
          items: [],
        },
        team: {
          heading: "Team",
          label: "Our People",
          members: [],
        },
      });

      const { default: AboutPage } = await import("../about/page");
      const result = await AboutPage();

      render(result);

      expect(screen.getByTestId("about-section")).toBeInTheDocument();
      expect(screen.getByTestId("stats-section")).toBeInTheDocument();
      expect(screen.getByTestId("team-section")).toBeInTheDocument();
    });

    it("displays about content correctly", async () => {
      mockAdapter.getAboutPageData.mockResolvedValue({
        about: {
          title: "About Our Company",
          subtitle: "Story",
          content: "We are great",
          stats: [],
        },
        stats: {
          label: "Stats",
          items: [],
        },
        team: {
          heading: "Our Team",
          label: "People",
          members: [
            {
              name: "John",
              role: "CEO",
              bio: "Leader",
              avatarFallback: "J",
            },
          ],
        },
      });

      const { default: AboutPage } = await import("../about/page");
      const result = await AboutPage();

      render(result);

      expect(screen.getByText("About Our Company")).toBeInTheDocument();
      expect(screen.getByText("Our Team")).toBeInTheDocument();
      expect(screen.getByText("1 members")).toBeInTheDocument();
    });
  });

  describe("ServicesPage", () => {
    it("renders without crashing with static adapter", async () => {
      mockAdapter.getServicesPageData.mockResolvedValue({
        services: {
          title: "Services",
          label: "What we do",
          items: [],
        },
        faq: {
          heading: "FAQ",
          label: "Questions",
          items: [],
        },
        cta: {
          heading: "CTA",
          subtext: "Text",
          primaryAction: { label: "Contact", href: "/contact" },
        },
      });

      const { default: ServicesPage } = await import("../services/page");
      const result = await ServicesPage();

      render(result);

      expect(screen.getByTestId("services-section")).toBeInTheDocument();
      expect(screen.getByTestId("faq-section")).toBeInTheDocument();
      expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    });

    it("displays services correctly", async () => {
      mockAdapter.getServicesPageData.mockResolvedValue({
        services: {
          title: "Our Services",
          label: "Services",
          items: [
            { id: "s1", title: "Service 1", description: "Desc 1" },
            { id: "s2", title: "Service 2", description: "Desc 2" },
          ],
        },
        faq: {
          heading: "FAQ",
          label: "Questions",
          items: [],
        },
        cta: {
          heading: "CTA",
          subtext: "Text",
          primaryAction: { label: "Contact", href: "/contact" },
        },
      });

      const { default: ServicesPage } = await import("../services/page");
      const result = await ServicesPage();

      render(result);

      expect(screen.getByText("Our Services")).toBeInTheDocument();
      expect(screen.getByText("2 services")).toBeInTheDocument();
    });
  });

  describe("ContactPage", () => {
    it("renders without crashing with static adapter", async () => {
      mockAdapter.getContactPageData.mockResolvedValue({
        contact: {
          title: "Contact",
          subtitle: "Get in touch",
          label: "Contact Us",
        },
        form: {
          submitLabel: "Send",
          loadingLabel: "Sending...",
          successMessage: "Sent!",
          fields: {
            name: { label: "Name", placeholder: "Your name" },
            email: { label: "Email", placeholder: "Your email" },
            subject: { label: "Subject", placeholder: "Subject" },
            message: { label: "Message", placeholder: "Message", rows: 5 },
          },
        },
      });

      const { default: ContactPage } = await import("../contact/page");
      const result = await ContactPage();

      render(result);

      // Contact page uses HeroSection and ContactForm
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    });

    it("displays contact content correctly", async () => {
      mockAdapter.getContactPageData.mockResolvedValue({
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
            name: { label: "Name", placeholder: "Name" },
            email: { label: "Email", placeholder: "Email" },
            subject: { label: "Subject", placeholder: "Subject" },
            message: { label: "Message", placeholder: "Message", rows: 5 },
          },
        },
      });

      const { default: ContactPage } = await import("../contact/page");
      const result = await ContactPage();

      render(result);

      expect(screen.getByText("Get in Touch")).toBeInTheDocument();
      expect(screen.getByText("We'd love to hear from you")).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("pages handle null data gracefully", async () => {
      // Test that pages don't crash when adapter returns unexpected data
      mockAdapter.getHomePageData.mockResolvedValue({
        hero: {
          title: "",
          subtitle: "",
          primaryAction: { label: "", href: "" },
        },
        stats: {
          label: "",
          items: [],
        },
        testimonials: {
          heading: "",
          label: "",
          items: [],
        },
        cta: {
          heading: "",
          subtext: "",
          primaryAction: { label: "", href: "" },
        },
      });

      const { default: HomePage } = await import("../page");
      const result = await HomePage();

      render(result);

      // Should still render sections
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    });

    it("adapter is called once per page render", async () => {
      mockAdapter.getHomePageData.mockResolvedValue({
        hero: {
          title: "Test",
          subtitle: "Test",
          primaryAction: { label: "Test", href: "/" },
        },
        stats: { label: "Test", items: [] },
        testimonials: { heading: "Test", label: "Test", items: [] },
        cta: {
          heading: "Test",
          subtext: "Test",
          primaryAction: { label: "Test", href: "/" },
        },
      });

      const { default: HomePage } = await import("../page");
      await HomePage();

      expect(mockAdapter.getHomePageData).toHaveBeenCalledTimes(1);
    });
  });
});
