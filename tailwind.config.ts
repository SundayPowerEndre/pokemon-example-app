/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
];
export const prefix = "";
export const theme = {
  aspectRatio: {
    auto: "auto",
    square: "1 / 1",
    video: "16 / 9",
    "pokemon-card": "2.5 / 3.5",
    "reverse-pokemon-card": "3.5 / 2.5",
    "pokemon-card-image": "10 / 7",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    13: "13",
    14: "14",
    15: "15",
    16: "16",
  },
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    fontFamily: {
      "sans": [defaultTheme.fontFamily.mono, defaultTheme.fontFamily.sans]
    },
    colors: {
      "pastel-earth": "#D3C1A5",
      "pastel-rock": "#AFAF9A",

      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      "brand-primary": {
        DEFAULT: "hsl(var(--teal))",
        light: "hsl(var(--teal-light))",
        dark: "hsl(var(--teal-dark))",
        lightest: "hsl(var(--teal-lightest))",
      },
      "brand-secondary": {
        DEFAULT: "hsl(var(--soft-pink))",
        light: "hsl(var(--soft-pink-light))",
        dark: "hsl(var(--soft-pink-dark))",
        lightest: "hsl(var(--soft-pink-lightest))",
      },
      "brand-lavender": {
        DEFAULT: "hsl(var(--light-lavender))",
        light: "hsl(var(--light-lavender-light))",
        dark: "hsl(var(--light-lavender-dark))",
        lightest: "hsl(var(--light-lavender-lightest))",
      },
      "brand-green": {
        DEFAULT: "hsl(var(--pale-green))",
        light: "hsl(var(--pale-green-light))",
        dark: "hsl(var(--pale-green-dark))",
        lightest: "hsl(var(--pale-green-lightest))",
      },
      "brand-yellow": {
        DEFAULT: "hsl(var(--pastel-yellow))",
        light: "hsl(var(--pastel-yellow-light))",
        dark: "hsl(var(--pastel-yellow-dark))",
        lightest: "hsl(var(--pastel-yellow-lightest))",
      },
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
};
export const plugins = [require("tailwindcss-animate")];
