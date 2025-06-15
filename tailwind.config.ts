
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
				// Semantic tokens mapped to your palette
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',

				primary: {
					DEFAULT: 'hsl(var(--primary))', // dark-void
					foreground: 'hsl(var(--primary-foreground))', // marigold
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))', // liquid-lova
					foreground: 'hsl(var(--accent-foreground))', // dark-void or marigold
				},
				cta: {
					DEFAULT: 'hsl(var(--cta))', // gloun-lova
					foreground: 'hsl(var(--cta-foreground))', // marigold
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))', // slate-grey
					foreground: 'hsl(var(--secondary-foreground))' // marigold
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))', // dusty-grey
					foreground: 'hsl(var(--muted-foreground))', // dusty-grey or slate-grey
				},
				card: {
					DEFAULT: 'hsl(var(--card))', // dark-void
					foreground: 'hsl(var(--card-foreground))', // marigold or slate-grey
				},
				border: 'hsl(var(--border))', // dusty-grey
				highlight: 'hsl(var(--highlight))', // marigold
				// Chart colors
				chart: {
					void: '#16151A',
					lova: '#F67011',
					gloun: '#873800',
					slate: '#262626',
					dusty: '#878787',
					marigold: '#FFE4D0',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
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

