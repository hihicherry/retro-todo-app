import React, { useContext } from "react";
import Select from "react-select";
import { TodoContext } from "../context/TodoContext";

function FilterBar() {
	const { setFilter, setSearch } = useContext(TodoContext);

	const filterOptions = [
		{ value: "all", label: "全部" },
		{ value: "completed", label: "已完成" },
		{ value: "active", label: "未完成" },
	];

	const customStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: "#f3e8ff", // 淺紫色背景
			border: "2px solid #818cf8", // 藍色邊框
			borderRadius: 0,
			padding: "2px 8px",
			fontFamily: "pixel, monospace",
			color: "#1E3A8A", // 深藍色文字，提升對比度
			boxShadow: "none",
			"&:hover": {
				borderColor: "#c4b5fd",
			},
			"&:focus-within": {
				borderColor: "#6D28D9", // 聚焦時紫色邊框
				boxShadow: "0 0 0 3px rgba(109, 40, 217, 0.3)", // 聚焦光暈
			},
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "#f3e8ff",
			border: "2px solid #818cf8",
			borderRadius: 0,
			fontFamily: "pixel, monospace",
			color: "#1E3A8A",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? "#D2B4DE" : "#f3e8ff", // 選擇時紫色背景
			color: "#1E3A8A",
			"&:hover": {
				backgroundColor: "#D2B4DE",
			},
		}),
		singleValue: (provided) => ({
			...provided,
			color: "#4B5EAA",
		}),
		indicatorSeparator: () => ({ display: "none" }),
		dropdownIndicator: (provided) => ({
			...provided,
			color: "#4B5EAA",
			"&:hover": {
				color: "#6D28D9",
			},
		}),
	};

	return (
		<div className="flex flex-col sm:flex-row sm:space-x-2 mb-4">
			<div className="flex-1">
				<label htmlFor="search-input" className="sr-only">
					搜尋待辦事項
				</label>
				<input
					id="search-input"
					type="text"
					placeholder="搜尋項目..."
					onChange={(e) => setSearch(e.target.value)}
					className="border-2 border-indigo-400 p-2 w-full font-pixel text-indigo-900 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-300 hover:border-violet-300 mb-2 sm:mb-0"
					aria-label="搜尋待辦事項"
					title="輸入關鍵字搜尋待辦事項"
				/>
			</div>
			<div className="min-w-[150px]">
				<label htmlFor="filter-select" className="sr-only">
					篩選待辦事項
				</label>
				<Select
					inputId="filter-select"
					options={filterOptions}
					defaultValue={filterOptions[0]}
					onChange={(selectedOption) =>
						setFilter(selectedOption ? selectedOption.value : "all")
					}
					styles={customStyles}
					className="w-full"
					aria-label="篩選待辦事項"
					aria-describedby="filter-description"
					title="選擇篩選條件"
					menuPortalTarget={document.body}
					menuPlacement="auto"
				/>
				<span id="filter-description" className="sr-only">
					選擇篩選條件以顯示全部、已完成或未完成的待辦事項
				</span>
			</div>
		</div>
	);
}

export default FilterBar;
