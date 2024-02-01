import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        rent: "rgb(var(--color-rent) / <alpha-value>)",
        transfer: "rgb(var(--color-transfer) / <alpha-value>)",
        administration: "rgb(var(--color-administration) / <alpha-value>)",
        eligibility: "rgb(var(--color-eligibility) / <alpha-value>)",
        security: "rgb(var(--color-security) / <alpha-value>)",
        develop: "rgb(var(--color-develop) / <alpha-value>)",
        stewardship: "rgb(var(--color-stewardship) / <alpha-value>)",
        use: "rgb(var(--color-use) / <alpha-value>)",
        access: "rgb(var(--color-access) / <alpha-value>)",
        safety: "#FAFF00",
      },
    },
  },
  plugins: [],
}
export default config
