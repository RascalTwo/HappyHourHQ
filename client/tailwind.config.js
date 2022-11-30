/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		minWidth: {
			'1/2': '50%',
			'1/4': '25%',
			'1/3': '33%',
			'2/3': '66%', 
		},
		maxWidth: {
			'1/2': '50%',
			'1/4': '25%', 
			'1/3': '33%',
			'2/3': '66%', 
		}
	},
	plugins: [require('daisyui')],
};
