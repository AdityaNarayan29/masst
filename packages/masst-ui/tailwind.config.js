import baseConfig from "../tailwind-config/tailwind.config.cjs";

export default {
  ...baseConfig,
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ], theme: {
    extend: {},
  },
  plugins: [],
};
