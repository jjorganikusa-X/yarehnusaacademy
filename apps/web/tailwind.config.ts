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
                        surface: '#FFFFFF',       // Pure white background
                        primary: '#1a2847',       // Navy Blue (from logo)
                        secondary: '#d4af37',     // Gold (from logo)
                        accent: '#000000',        // Black for text
                        soft: '#F8F9FA',          // Very light gray
                        calm: '#A8DADC',          // Light blue
                        ocean: '#5390d9',         // Ocean blue
                    },
                    boxShadow: {
                        'soft': '0 10px 40px -10px rgba(0,0,0,0.05)',
                        'card': '0 4px 20px -2px rgba(26, 40, 71, 0.08)',
                        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
                    },
                    animation: {
                        'breathe': 'breathe 6s ease-in-out infinite',
                        'breathe-circle': 'breatheCircle 4s ease-in-out infinite',
                        'float': 'float 8s ease-in-out infinite',
                        'pop': 'pop 0.3s ease-out',
                        'wave': 'wave 1s ease-in-out infinite',
                        'slide-up': 'slideUp 0.4s ease-out',
                        'fade-in': 'fadeIn 0.3s ease-out',
                    },
                    keyframes: {
                        breathe: {
                            '0%, 100%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.02)' },
                        },
                        breatheCircle: {
                            '0%, 100%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.1)' },
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-10px)' },
                        },
                        pop: {
                            '0%': { transform: 'scale(0.8)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' },
                        },
                        wave: {
                            '0%, 100%': { height: '4px' },
                            '50%': { height: '12px' },
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' },
                        },
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        }
                    }
                }
            },
  plugins: [],
};
export default config;
