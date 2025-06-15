import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				background: '#090A0B', // blackBG
				foreground: '#FFFFFF', // whiteFG

				primary: {
					DEFAULT: '#00D26A', // strong green
					foreground: '#090A0B'
				},
				secondary: {
					DEFAULT: '#111113', // deep off-black/grey
					foreground: '#FFFFFF',
				},
				accent: {
					DEFAULT: '#F5F5F5', // light accent (white)
					foreground: '#00D26A',
				},
				cta: {
					DEFAULT: '#14B8A6', // accent teal (optional for pop)
					foreground: '#FFFFFF',
				},
				success: {
					DEFAULT: '#00D26A',
					foreground: '#FFFFFF',
				},
				muted: {
					DEFAULT: '#222325', // mid-dark gray for cards/sections
					foreground: '#CCCCCC',
				},
				border: '#16181A',
				highlight: '#50FA7B',

				// Custom chart and UI colors for branding
				chart: {
					violet: '#7c3aed',
					teal: '#14b8a6',
					orange: '#f59e42',
					gold: '#FDE68A',
					navy: '#18181B',
					mint: '#00D26A',
				}
			},
			borderRadius: {
				lg: '0.8rem',
				md: '0.55rem',
				sm: '0.3rem'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				wiggle: {
					'0%, 100%': { transform: 'rotate(-2deg)' },
					'50%': { transform: 'rotate(2deg)' },
				},
				flicker: {
					'0%, 100%': { opacity: '0.99' },
					'10%, 40%, 60%, 80%': { opacity: '0.4' },
					'20%, 50%, 70%, 90%': { opacity: '1' },
					'30%, 55%, 75%': { opacity: '0.7' },
				},
				heroGlow: {
          '0%': { filter: 'brightness(1) blur(12px)' },
          '50%': { filter: 'brightness(1.2) blur(18px)' },
          '100%': { filter: 'brightness(1) blur(12px)' }
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				wiggle: "wiggle 0.5s ease-in-out infinite",
				flicker: "flicker 1.5s infinite alternate",
				heroGlow: "heroGlow 3s ease-in-out infinite",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
