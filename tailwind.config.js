/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				pixel: ["VT323", "monospace"], // 像素字型，與網站一致
			},
			colors: {
				primary: "#F4A7C4", // 粉色
				secondary: "#A78BFA", // 紫色
			},
		},
	},
	plugins: [],
};

