/** @type {import('tailwindcss').Config} */
const { mauve, violet, crimson, gray } = require('@radix-ui/colors');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
		  colors: {
			...mauve,
			...violet,
			...crimson,
			...gray,
		  },
		  keyframes: {
			slideDown: {
			  from: { height: 0 },
			  to: { height: 'var(--radix-accordion-content-height)' },
			},
			slideUp: {
			  from: { height: 'var(--radix-accordion-content-height)' },
			  to: { height: 0 },
			},
		  },
		  animation: {
			slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
			slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
		  },
		},
	  },
	plugins: [],
}
