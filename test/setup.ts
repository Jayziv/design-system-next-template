import "@testing-library/jest-dom/vitest";

// Polyfill DOM APIs not available in jsdom
if (typeof HTMLElement !== "undefined") {
  HTMLElement.prototype.hasPointerCapture =
    HTMLElement.prototype.hasPointerCapture || (() => false);
  HTMLElement.prototype.setPointerCapture =
    HTMLElement.prototype.setPointerCapture || (() => {});
  HTMLElement.prototype.releasePointerCapture =
    HTMLElement.prototype.releasePointerCapture || (() => {});
  HTMLElement.prototype.scrollIntoView =
    HTMLElement.prototype.scrollIntoView || (() => {});
}

// Polyfill ResizeObserver
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
