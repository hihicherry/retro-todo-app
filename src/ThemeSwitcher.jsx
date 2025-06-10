import React, { useContext } from "react";
import Select from "react-select";
import { ThemeContext } from "./context/ThemeContext";

function ThemeSwitcher() {
	const { theme, setTheme } = useContext(ThemeContext);

	const themeOptions = [
		{ value: "pastel", label: "粉彩" },
		{ value: "ocean", label: "海洋" },
		{ value: "forest", label: "森林" },
		{ value: "sunset", label: "夕陽" },
		{ value: "night", label: "暗夜" },
	];

	const customStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: "var(--theme-secondary)",
			border: "2px solid var(--theme-accent)",
			borderRadius: 0,
			padding: "2px 8px",
			fontFamily: "pixel, monospace",
			color: "var(--theme-dark)",
			boxShadow: "none",
			"&:hover": {
				borderColor: "var(--theme-accent)",
			},
			"&:focus-within": {
				borderColor: "var(--theme-accent)",
				boxShadow: "0 0 0 3px rgba(109, 40, 217, 0.3)",
			},
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "var(--theme-secondary)",
			border: "2px solid var(--theme-accent)",
			borderRadius: 0,
			fontFamily: "pixel, monospace",
			color: "var(--theme-dark)",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected
				? "var(--theme-primary)"
				: "var(--theme-secondary)",
			color: "var(--theme-dark)",
			"&:hover": {
				backgroundColor: "var(--theme-primary)",
			},
		}),
		singleValue: (provided) => ({
			...provided,
			color: "var(--theme-dark)",
		}),
		indicatorSeparator: () => ({ display: "none" }),
		dropdownIndicator: (provided) => ({
			...provided,
			color: "var(--theme-dark)",
			"&:hover": {
				color: "var(--theme-accent)",
			},
		}),
	};

	return (
		<div className="min-w-[150px] mb-4">
			<label htmlFor="theme-select" className="sr-only">
				選擇主題
			</label>
			<Select
				inputId="theme-select"
				options={themeOptions}
				value={themeOptions.find((option) => option.value === theme)}
				onChange={(selectedOption) =>
					setTheme(selectedOption ? selectedOption.value : "pastel")
				}
				styles={customStyles}
				className="w-full"
				aria-label="選擇主題"
				title="選擇應用程式主題"
				menuPlacement="auto"
			/>
		</div>
	);
}

export default ThemeSwitcher;
