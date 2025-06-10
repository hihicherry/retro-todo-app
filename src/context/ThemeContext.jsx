import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("pastel");

	// 將主題儲存到 localStorage，確保刷新後保留選擇
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") || "pastel";
		setTheme(savedTheme);
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
