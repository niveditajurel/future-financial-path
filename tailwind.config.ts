
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
				// Semantic tokens mapped to new palette
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',

				primary: {
					DEFAULT: 'hsl(var(--primary))', // deep-navy
					foreground: 'hsl(var(--primary-foreground))', // soft-white
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))', // gentle-lavender
					foreground: 'hsl(var(--secondary-foreground))', // deep-navy
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))', // vivid-violet
					foreground: 'hsl(var(--accent-foreground))', // soft-white
				},
				cta: {
					DEFAULT: 'hsl(var(--cta))', // coral
					foreground: 'hsl(var(--cta-foreground))', // soft-white
				},
				success: {
					DEFAULT: 'hsl(var(--success))', // mint-green
					foreground: 'hsl(var(--success-foreground))', // deep-navy
				},
				border: 'hsl(var(--border))', // warm-grey
				highlight: 'hsl(var(--highlight))', // accent-yellow

				// Chart colors for visualizations
				chart: {
					navy: '#172347',
					violet: '#7F5CFF',
					coral: '#FF7A5A',
					mint: '#7CF7C0',
					lavender: '#D8D3F8',
					grey: '#E5E7EB',
					yellow: '#FFD567'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
