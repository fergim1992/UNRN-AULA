import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lightPaper: '#FCF6F5',
        darkPaper: '#17222e',
        lightBackground: '##ddd4d3',
        darkBackground: '#101820',
      },
      light: {
        colors: {
          background: '#ddd4d3',
          foreground: '#101820',
        },
      },
      dark: {
        colors: {
          background: '#101820',
          foreground: '#FCF6F5',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    nextui({
      themes: {
        light: {
          colors: {
            background: '#ddd4d3',
            foreground: '#101820',
            primary: {
              50: '#e5ffe4',
              100: '#c5ffc4',
              200: '#91ff90',
              300: '#50ff55',
              400: '#00ff11',
              500: '#00e615',
              600: '#00b816',
              700: '#008b11',
              800: '#076d14',
              900: '#0b5c17',
              DEFAULT: '#00e615',
              foreground: '#101820',
            },
            focus: '#F182F6',
            success: '#00e615',
            warning: '#f6a609',
            danger: '#d00000',
          },
        },
        dark: {
          colors: {
            background: '#101820',
            foreground: '#FCF6F5',
            primary: {
              50: '#e5ffe4',
              100: '#c5ffc4',
              200: '#91ff90',
              300: '#50ff55',
              400: '#00ff11',
              500: '#00e615',
              600: '#00b816',
              700: '#008b11',
              800: '#076d14',
              900: '#0b5c17',
              DEFAULT: '#00e615',
              foreground: '#FCF6F5',
            },
            focus: '#F182F6',
            success: '#00e615',
            warning: '#f6a609',
            danger: '#d00000',
          },
        },
      },
    }),
  ],
  darkMode: 'class',
};
export default config;
