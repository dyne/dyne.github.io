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
		'rotate-2',
		'-rotate-1',
	],
	theme: {
		extend: {
			colors: {
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
				secondary: {
					DEFAULT: '#4843EB',
					light: '#CBC8FA',
					80: '#6D69EF',
					60: '#918EF3',
					40: '#B6B4F7',
					20: '#DAD9FB',
					10: '#EDECFD',
					5: '#F6F6FE',
				},
				tertiary: {
					DEFAULT: '#154B45',
					light: '#3BC7B7',
					80: '#1C6058',
					60: '#22746B',
					40: '#28897E',
					20: '#2E9E91',
					10: '#35B3A4',
					5: '#3BC7B7',
				},
				black: {
					DEFAULT: '#000000',
					light: '#25282B',
					80: '#52575C',
					60: '#A0A4A8',
					40: '#CACCCF',
					20: '#DBDDE0',
					10: '#E8E8E8',
					5: '#F9F9FA',
				},
				gray: {
					DEFAULT: '#B0B0B0',
					light: '#FCFCFC',
					80: '#B0B0B0',
					60: '#BDBDBD',
					40: '#C9C9C9',
					20: '#D6D6D6',
					10: '#F0F0F0',
					5: '#FCFCFC',
				},
			},
			fontFamily: {
				sans: ['Syne', 'sans'],
				serif: ['Syne Tactile', 'cursive'],
				prose: ['Work Sans', 'sans-serif', 'sans'],
				mono: ['JetBrains Mono', 'monospace'],
				inter: ['Inter', 'sans-serif'],
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
				'4xl': '120px'
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
	darkMode: 'class',
};
