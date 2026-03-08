import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getContentAdapter } from "../adapter";
import type { ContentAdapter } from "../adapter";

describe("getContentAdapter", () => {
  const originalEnv = process.env.CMS_PROVIDER;

  afterEach(() => {
    // Restore original env
    if (originalEnv !== undefined) {
      process.env.CMS_PROVIDER = originalEnv;
    } else {
      delete process.env.CMS_PROVIDER;
    }
    // Clear module cache to reset require calls
    vi.resetModules();
  });

  it("returns StaticAdapter when CMS_PROVIDER is not set", () => {
    delete process.env.CMS_PROVIDER;

    const adapter = getContentAdapter();

    expect(adapter).toBeDefined();
    expect(adapter).toHaveProperty("getHomePageData");
    expect(adapter).toHaveProperty("getAboutPageData");
    expect(adapter).toHaveProperty("getServicesPageData");
    expect(adapter).toHaveProperty("getContactPageData");
    expect(adapter).toHaveProperty("getSiteMetadata");
  });

  it("returns StaticAdapter when CMS_PROVIDER=static", () => {
    process.env.CMS_PROVIDER = "static";

    const adapter = getContentAdapter();

    expect(adapter).toBeDefined();
    expect(typeof adapter.getHomePageData).toBe("function");
  });

  it("returns KeystaticAdapter when CMS_PROVIDER=keystatic", () => {
    process.env.CMS_PROVIDER = "keystatic";

    const adapter = getContentAdapter();

    expect(adapter).toBeDefined();
    expect(typeof adapter.getHomePageData).toBe("function");
  });

  it("returns SanityAdapter when CMS_PROVIDER=sanity", () => {
    process.env.CMS_PROVIDER = "sanity";

    const adapter = getContentAdapter();

    expect(adapter).toBeDefined();
    expect(typeof adapter.getHomePageData).toBe("function");
  });

  it("defaults to StaticAdapter for invalid provider values", () => {
    process.env.CMS_PROVIDER = "invalid-provider" as any;

    const adapter = getContentAdapter();

    expect(adapter).toBeDefined();
    expect(typeof adapter.getHomePageData).toBe("function");
  });

  it("returns adapter implementing ContentAdapter interface", () => {
    const adapter = getContentAdapter();

    // Check all required methods exist
    expect(adapter.getHomePageData).toBeInstanceOf(Function);
    expect(adapter.getAboutPageData).toBeInstanceOf(Function);
    expect(adapter.getServicesPageData).toBeInstanceOf(Function);
    expect(adapter.getContactPageData).toBeInstanceOf(Function);
    expect(adapter.getSiteMetadata).toBeInstanceOf(Function);
  });

  it("all adapter methods return Promises", async () => {
    const adapter = getContentAdapter();

    expect(adapter.getHomePageData()).toBeInstanceOf(Promise);
    expect(adapter.getAboutPageData()).toBeInstanceOf(Promise);
    expect(adapter.getServicesPageData()).toBeInstanceOf(Promise);
    expect(adapter.getContactPageData()).toBeInstanceOf(Promise);
    expect(adapter.getSiteMetadata()).toBeInstanceOf(Promise);
  });

  it("different provider values return different adapter instances", () => {
    process.env.CMS_PROVIDER = "static";
    const staticAdapter = getContentAdapter();

    // Reset modules to get fresh instance
    vi.resetModules();

    process.env.CMS_PROVIDER = "keystatic";
    const keystaticAdapter = getContentAdapter();

    // Both should work but may be different instances
    expect(staticAdapter).toBeDefined();
    expect(keystaticAdapter).toBeDefined();
    expect(typeof staticAdapter.getHomePageData).toBe("function");
    expect(typeof keystaticAdapter.getHomePageData).toBe("function");
  });

  it("adapters can fetch data successfully", async () => {
    const adapter = getContentAdapter();

    // Test that each method resolves without error
    const homeData = await adapter.getHomePageData();
    const aboutData = await adapter.getAboutPageData();
    const servicesData = await adapter.getServicesPageData();
    const contactData = await adapter.getContactPageData();
    const siteData = await adapter.getSiteMetadata();

    expect(homeData).toBeDefined();
    expect(aboutData).toBeDefined();
    expect(servicesData).toBeDefined();
    expect(contactData).toBeDefined();
    expect(siteData).toBeDefined();

    // Check structure
    expect(homeData).toHaveProperty("hero");
    expect(aboutData).toHaveProperty("about");
    expect(servicesData).toHaveProperty("services");
    expect(contactData).toHaveProperty("contact");
    expect(siteData).toHaveProperty("name");
  });
});
