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
			backgroundColor: "#f3e8ff",
			border: "2px solid #818cf8",
			borderRadius: 0,
			padding: "2px 8px",
			fontFamily: "pixel, monospace",
			color: "#4B5EAA",
			boxShadow: "none",
			"&:hover": {
				borderColor: "#c4b5fd",
			},
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "#f3e8ff",
			border: "2px solid #818cf8",
			borderRadius: 0,
			fontFamily: "pixel, monospace",
			color: "#4B5EAA",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? "#D2B4DE" : "#f3e8ff",
			color: "#4B5EAA",
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
			<input
				type="text"
				placeholder="搜尋項目..."
				onChange={(e) => setSearch(e.target.value)}
				className="border-2 border-indigo-400 p-2 flex-1 font-pixel text-indigo-900 focus:outline-none focus:border-violet-300 hover:border-violet-300 mb-2 sm:mb-0"
				aria-label="搜尋項目"
				title="輸入關鍵字搜尋待辦事項"
			/>
			<Select
				options={filterOptions}
				onChange={(selectedOption) =>
					setFilter(selectedOption ? selectedOption.value : "all")
				}
				styles={customStyles}
				className="min-w-[100px]"
				aria-label="篩選待辦事項"
				title="選擇篩選條件"
				menuPortalTarget={document.body} // 將選單渲染到 body 上
				menuPlacement="auto" // 自動調整選單位置
			/>
		</div>
	);
}

export default FilterBar;
