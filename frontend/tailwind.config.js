/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Pure Minimal Luxury Monochrome Palette (No Gold Tint)
        jet: {
          DEFAULT: '#0F0F0F',
          surface: '#171717',
          hover: '#222222',
          border: '#2A2A2A',
        },
        white: '#FFFFFF',
        silver: {
          DEFAULT: '#B0B0B0',
          light: '#D4D4D4',
          subtle: '#E8E8E8',
          border: '#DEDEDE',
          muted: '#808080',
          dark: '#5A5A5A',
        },
        neutral: {
          DEFAULT: '#2C2C2C',
          hover: '#383838',
          light: '#424242',
          border: '#3F3F3F',
        },
        soft: {
          DEFAULT: '#F5F5F5',
          alt: '#EFEFEF',
          card: '#FFFFFF',
        },
        sidebar: {
          DEFAULT: '#0F0F0F',
          surface: '#161616',
          hover: '#222222',
          active: '#2C2C2C',
          border: '#222222',
          text: '#B0B0B0',
          textActive: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'dropdown': '0 14px 35px -4px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
