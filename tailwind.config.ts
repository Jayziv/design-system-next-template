import { designSystemPlugin } from "@jayziv/design-system-core/plugin";

const brandConfig = {};

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [designSystemPlugin(brandConfig)],
};
