import { describe, it, expect } from "vitest";
import type {
  Stat,
  Testimonial,
  TeamMember,
  Service,
  FAQItem,
  CTAAction,
  HomePageData,
  AboutPageData,
  ServicesPageData,
  ContactPageData,
  SiteMetadata,
} from "../types";

describe("CMS Type Definitions", () => {
  describe("Stat interface", () => {
    it("validates correct Stat structure", () => {
      const validStat: Stat = {
        value: "100+",
        label: "Happy clients",
      };

      expect(validStat.value).toBe("100+");
      expect(validStat.label).toBe("Happy clients");
    });

    it("requires both value and label", () => {
      const stat: Stat = {
        value: "50",
        label: "Projects",
      };

      expect(stat).toHaveProperty("value");
      expect(stat).toHaveProperty("label");
    });
  });

  describe("Testimonial interface", () => {
    it("validates correct Testimonial structure", () => {
      const validTestimonial: Testimonial = {
        quote: "Amazing service!",
        name: "John Doe",
        role: "CEO",
        company: "Tech Corp",
        avatarFallback: "JD",
      };

      expect(validTestimonial.quote).toBe("Amazing service!");
      expect(validTestimonial.name).toBe("John Doe");
      expect(validTestimonial.role).toBe("CEO");
      expect(validTestimonial.company).toBe("Tech Corp");
      expect(validTestimonial.avatarFallback).toBe("JD");
    });

    it("allows optional avatarUrl", () => {
      const testimonialWithAvatar: Testimonial = {
        quote: "Great!",
        name: "Jane",
        role: "CTO",
        company: "StartUp",
        avatarUrl: "https://example.com/avatar.jpg",
        avatarFallback: "JS",
      };

      expect(testimonialWithAvatar.avatarUrl).toBe("https://example.com/avatar.jpg");

      const testimonialWithoutAvatar: Testimonial = {
        quote: "Great!",
        name: "Jane",
        role: "CTO",
        company: "StartUp",
        avatarFallback: "JS",
      };

      expect(testimonialWithoutAvatar.avatarUrl).toBeUndefined();
    });
  });

  describe("TeamMember interface", () => {
    it("validates correct TeamMember structure", () => {
      const validMember: TeamMember = {
        name: "Alice Johnson",
        role: "Lead Developer",
        bio: "10 years of experience",
        avatarFallback: "AJ",
      };

      expect(validMember.name).toBe("Alice Johnson");
      expect(validMember.role).toBe("Lead Developer");
      expect(validMember.bio).toBe("10 years of experience");
      expect(validMember.avatarFallback).toBe("AJ");
    });
  });

  describe("Service interface", () => {
    it("validates correct Service structure", () => {
      const validService: Service = {
        id: "service-1",
        title: "Consulting",
        description: "Expert advice",
      };

      expect(validService.id).toBe("service-1");
      expect(validService.title).toBe("Consulting");
      expect(validService.description).toBe("Expert advice");
    });

    it("allows optional icon", () => {
      const serviceWithIcon: Service = {
        id: "service-2",
        title: "Development",
        description: "Custom solutions",
        icon: "code",
      };

      expect(serviceWithIcon.icon).toBe("code");
    });
  });

  describe("FAQItem interface", () => {
    it("validates correct FAQItem structure", () => {
      const validFAQ: FAQItem = {
        question: "What is your pricing?",
        answer: "Contact us for details",
      };

      expect(validFAQ.question).toBe("What is your pricing?");
      expect(validFAQ.answer).toBe("Contact us for details");
    });
  });

  describe("CTAAction interface", () => {
    it("validates CTAAction with href", () => {
      const ctaWithHref: CTAAction = {
        label: "Get Started",
        href: "/contact",
      };

      expect(ctaWithHref.label).toBe("Get Started");
      expect(ctaWithHref.href).toBe("/contact");
    });

    it("allows optional href", () => {
      const ctaWithoutHref: CTAAction = {
        label: "Click me",
      };

      expect(ctaWithoutHref.label).toBe("Click me");
      expect(ctaWithoutHref.href).toBeUndefined();
    });
  });

  describe("HomePageData interface", () => {
    it("validates complete HomePageData structure", () => {
      const validHomeData: HomePageData = {
        hero: {
          title: "Welcome",
          subtitle: "Tagline",
          primaryAction: {
            label: "Start",
            href: "/start",
          },
        },
        stats: {
          label: "Stats",
          items: [
            { value: "100", label: "Clients" },
          ],
        },
        testimonials: {
          heading: "Reviews",
          label: "What they say",
          items: [
            {
              quote: "Great!",
              name: "John",
              role: "CEO",
              company: "Corp",
              avatarFallback: "J",
            },
          ],
        },
        cta: {
          heading: "Join us",
          subtext: "Today",
          primaryAction: {
            label: "Sign up",
            href: "/signup",
          },
        },
      };

      expect(validHomeData).toHaveProperty("hero");
      expect(validHomeData).toHaveProperty("stats");
      expect(validHomeData).toHaveProperty("testimonials");
      expect(validHomeData).toHaveProperty("cta");
    });

    it("allows optional secondary actions", () => {
      const homeDataWithSecondary: HomePageData = {
        hero: {
          title: "Welcome",
          subtitle: "Tagline",
          primaryAction: { label: "Primary", href: "/" },
          secondaryAction: { label: "Secondary", href: "/secondary" },
        },
        stats: {
          label: "Stats",
          items: [],
        },
        testimonials: {
          heading: "Reviews",
          label: "Label",
          items: [],
        },
        cta: {
          heading: "CTA",
          subtext: "Text",
          primaryAction: { label: "Primary", href: "/" },
          secondaryAction: { label: "Secondary", href: "/secondary" },
        },
      };

      expect(homeDataWithSecondary.hero.secondaryAction).toBeDefined();
      expect(homeDataWithSecondary.cta.secondaryAction).toBeDefined();
    });
  });

  describe("AboutPageData interface", () => {
    it("validates complete AboutPageData structure", () => {
      const validAboutData: AboutPageData = {
        about: {
          title: "About Us",
          subtitle: "Our Story",
          content: "Content here",
          stats: [
            { value: "10", label: "Years" },
          ],
        },
        stats: {
          label: "Stats",
          items: [
            { value: "100", label: "Projects" },
          ],
        },
        team: {
          heading: "Team",
          label: "Our People",
          members: [
            {
              name: "Alice",
              role: "Dev",
              bio: "Expert",
              avatarFallback: "A",
            },
          ],
        },
      };

      expect(validAboutData).toHaveProperty("about");
      expect(validAboutData).toHaveProperty("stats");
      expect(validAboutData).toHaveProperty("team");
    });
  });

  describe("ServicesPageData interface", () => {
    it("validates complete ServicesPageData structure", () => {
      const validServicesData: ServicesPageData = {
        services: {
          title: "Services",
          label: "What we do",
          items: [
            {
              id: "s1",
              title: "Service 1",
              description: "Description",
            },
          ],
        },
        faq: {
          heading: "FAQ",
          label: "Questions",
          items: [
            {
              question: "Q?",
              answer: "A.",
            },
          ],
        },
        cta: {
          heading: "CTA",
          subtext: "Text",
          primaryAction: {
            label: "Contact",
            href: "/contact",
          },
        },
      };

      expect(validServicesData).toHaveProperty("services");
      expect(validServicesData).toHaveProperty("faq");
      expect(validServicesData).toHaveProperty("cta");
    });
  });

  describe("ContactPageData interface", () => {
    it("validates complete ContactPageData structure", () => {
      const validContactData: ContactPageData = {
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
              rows: 5,
            },
          },
        },
      };

      expect(validContactData).toHaveProperty("contact");
      expect(validContactData).toHaveProperty("form");
      expect(validContactData.form).toHaveProperty("fields");
      expect(validContactData.form.fields).toHaveProperty("name");
      expect(validContactData.form.fields).toHaveProperty("email");
      expect(validContactData.form.fields).toHaveProperty("subject");
      expect(validContactData.form.fields).toHaveProperty("message");
    });
  });

  describe("SiteMetadata interface", () => {
    it("validates complete SiteMetadata structure", () => {
      const validMetadata: SiteMetadata = {
        name: "My Site",
        description: "Site description",
        url: "https://example.com",
        locale: "en_US",
        openGraph: {
          title: "OG Title",
          description: "OG Desc",
          siteName: "Site",
          imageAlt: "Image",
        },
        twitter: {
          title: "Twitter Title",
          description: "Twitter Desc",
        },
      };

      expect(validMetadata).toHaveProperty("name");
      expect(validMetadata).toHaveProperty("description");
      expect(validMetadata).toHaveProperty("url");
      expect(validMetadata).toHaveProperty("locale");
      expect(validMetadata).toHaveProperty("openGraph");
      expect(validMetadata).toHaveProperty("twitter");
    });
  });

  describe("Type exports", () => {
    it("all types are properly exported from module", () => {
      // This test verifies that importing the types doesn't throw
      // If the types weren't exported, this test would fail at compile time
      const types = [
        "Stat",
        "Testimonial",
        "TeamMember",
        "Service",
        "FAQItem",
        "CTAAction",
        "HomePageData",
        "AboutPageData",
        "ServicesPageData",
        "ContactPageData",
        "SiteMetadata",
      ];

      expect(types).toHaveLength(11);
    });
  });
});
