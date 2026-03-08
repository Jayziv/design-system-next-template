import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: [
      "src/**/__tests__/**/*.test.{ts,tsx}",
    ],
    coverage: {
      provider: "v8",
      include: ["src/lib/cms/**/*.{ts,tsx}"],
      exclude: [
        "src/lib/cms/__tests__/**",
        "src/lib/cms/index.ts",
      ],
    },
  },
});
