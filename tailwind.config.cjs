const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		colors: {
			lightestGreen: '#CAD2C5',
			lightGreen: '#84A98C',
			green: '#52796F',
			darkGreen: '#354F52',
			darkestGreen: '#2F3E46',
			red: '#F77F7F',
		},

		spacing: {
			0: '0px',
			1: '8px',
			2: '16px',
			3: '24px',
			5: '40px',
			8: '64px',
			'1col': '216px',
			'2col': '456px',
			page: '936px',
		},
		maxWidth: {
			'1col': '216px',
			'2col': '456px',
			page: '936px',
		},
		borderRadius: {
			1: '8px',
		},
		boxShadow: {
			glow: '0 0 20px',
		},

		fontWeight: {
			normal: 400,
			bold: 700,
		},
		fontFamily: {
			inter: '"Inter", sans-serif',
			newsreader: '"Newsreader", serif',
		},
		fontSize: {
			title: ['4.25rem', '5rem'],
			header: ['2.625rem', '3rem'],
			// subheader: ['1.25rem', '2rem'],
			base: ['1rem', '1.5rem'],
		},
	},
	plugins: [
		plugin(({ addVariant, addUtilities }) => {
			// "child:" selector
			addVariant('child', '&>*');
			addUtilities({
				// For body text. Changes to Newsreader and adjusts size to fit with body text
				'.emphasis': {
					'font-family': '"Newsreader", serif',
					//
					'font-size': '1.125rem',
					'line-height': '1.5rem',
				},
				// For links
				'.link': {
					'font-weight': 700,
					color: module.exports.theme.colors.lightGreen,
				},
			});
		}),
		require('@tailwindcss/forms'),
	],
};
