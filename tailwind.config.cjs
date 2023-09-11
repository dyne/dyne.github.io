/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
	safelist: [
		'bg-white',
		'bg-sustainability',
		'bg-open_source',
		'bg-crypto',
		'bg-interdisciplinarity',
		'bg-cybersecurity',
		'bg-primary',
    'bg-accent',
    'bg-saccent',
    'bg-taccent',
    'bg-baccent',
		'rotate-2',
		'-rotate-1',
	],
	theme: {
		extend: {
			colors: {
				dyne: {
					orange: '#D77733',
					green: '#36968C',
					purple: '#423E8E',
				},
				accent: 'var(--accent-color)',
				taccent: 'var(--text-accent-color)',
				background: 'var(--bg-color)',
				saccent: 'var(--secondary-accent-color)',
				baccent: 'var(--bg-accent-color)',
				sustainability: '#69C9BF',
				open_source: '#D77733',
				interdisciplinarity: '#fff',
				crypto: '#000000',
				cybersecurity: '#8980f5',
				primary: {
					DEFAULT: '#F4CC9C',
					light: '#FEFBF6',
					80: '#F6D6B0',
					60: '#F8E0C4',
					40: '#FBEBD7',
					20: '#FDF5EB',
					10: '#FEFAF5',
					5: '#FEFCFA',
				},
			},
			fontFamily: {
				sans: ['Syne', 'sans'],
				serif: ['Syne Tactile', 'cursive'],
				prose: ['Inter Variable', 'sans-serif', 'sans'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			fontSize: {
				mega: [
					'7.65rem',
					{
						lineHeight: '13.625rem',
					},
				],
			},
			letterSpacing: {
				normal: '-0.2rem',
			},
			typography: {
				DEFAULT: {
					css: {
						em: { fontFamily: 'Syne', fontStyle: 'italic' },
					},
				},
			},
			borderRadius: {
				'3xl': '60px',
				'4xl': '120px',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
	darkMode: 'class',
};
