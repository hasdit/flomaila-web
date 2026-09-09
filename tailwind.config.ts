import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { brand: { DEFAULT: "#C2410C", hover: "#9A3412", tint: "#FFF7ED", soft: "#FFEDD5" } } } },
  plugins: [],
};
export default config;
