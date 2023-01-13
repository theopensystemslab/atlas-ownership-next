/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      colors: {
        rent: 'rgb(var(--color-rent) / <alpha-value>)',
        transfer: 'rgb(var(--color-transfer) / <alpha-value>)',
        administration: 'rgb(var(--color-administration) / <alpha-value>)',
        eligibility: 'rgb(var(--color-eligibility) / <alpha-value>)',
        security: 'rgb(var(--color-security) / <alpha-value>)',
        develop: 'rgb(var(--color-develop) / <alpha-value>)',
        stewardship: 'rgb(var(--color-stewardship) / <alpha-value>)',
        use: 'rgb(var(--color-use) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
