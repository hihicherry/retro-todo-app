/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				pixel: ['"pixel"', "sans-serif"], // 像素字型，與網站一致
			},
			colors: {
				primary: "#fae3f9", // 粉色
				secondary: "#ede3fa", // 紫色
			},
		},
	},
	plugins: [],
};

