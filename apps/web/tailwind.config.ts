import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
                extend: {
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                    },
                    colors: {
                        surface: '#FDFCF8',
                        primary: '#2D6A4F',   // Deep calming green
                        secondary: '#E9C46A', // Warm focus yellow
                        accent: '#E76F51',    // Alert/Action orange
                        soft: '#F4F1DE',      // Paper background
                        calm: '#A8DADC',      // Light blue
                    },
                    boxShadow: {
                        'soft': '0 10px 40px -10px rgba(0,0,0,0.05)',
                        'card': '0 4px 20px -2px rgba(45, 106, 79, 0.08)',
                    },
                    animation: {
                        'breathe': 'breathe 6s ease-in-out infinite',
                        'float': 'float 8s ease-in-out infinite',
                    },
                    keyframes: {
                        breathe: {
                            '0%, 100%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.02)' },
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-10px)' },
                        }
                    }
                }
            },
  plugins: [],
};
export default config;
