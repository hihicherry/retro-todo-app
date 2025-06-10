/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				pixel: ['"pixel"', "sans-serif"], // 像素字型，與網站一致
			},
			colors: {
				themes: {
					pastel: {
						primary: "#fae3f9", // 粉色
						secondary: "#ede3fa", // 紫色
						accent: "#818cf8", // 藍色
					},
					ocean: {
						primary: "#d1e7ff", // 淺藍
						secondary: "#a3bffa", // 中藍
						accent: "#3b82f6", // 深藍
					},
					forest: {
						primary: "#d1fae5", // 淺綠
						secondary: "#a7f3d0", // 中綠
						accent: "#059669", // 深綠
					},
					sunset: {
						primary: "#fef3c7", // 淺黃
						secondary: "#fed7aa", // 橙色
						accent: "#f97316", // 深橙
					},
					night: {
						primary: "#e2e8f0", // 淺灰
						secondary: "#94a3b8", // 中灰
						accent: "#475569", // 深灰
					},
				},
			},
		},
	},
	plugins: [],
};
