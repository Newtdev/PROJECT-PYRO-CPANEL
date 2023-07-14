const { url } = require("inspector");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				section: "url('/src/assets/img/Sectionbg.svg')",
			},
			colors: {
				primary: "#002E66",
				accent: "#FFFF00",
				gray: "#F5F5F5",
				darkgray: "#4E4E4E",
				lightPurple: "#ADABFF80",
				darkPurple: "#4724D2",
			},
		},
	},
	plugins: [],
};
