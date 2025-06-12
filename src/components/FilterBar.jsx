import React, { useContext, useMemo } from "react";
import Select from "react-select";
import { TodoContext } from "../context/TodoContext";

function FilterBar() {
	const { setFilter, setSearch } = useContext(TodoContext);

	const filterOptions = useMemo(
		() => [
			{ value: "all", label: "全部" },
			{ value: "completed", label: "已完成" },
			{ value: "active", label: "未完成" },
			{ value: "highest", label: "十萬火急！⏰" },
			{ value: "urgent", label: "等一下再說～🙆" },
			{ value: "minor", label: "慢慢來💤" },
		],
		[]
	);

	const customStyles = useMemo(
		() => ({
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
		}),
		[]
	);

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
					className="border-2 border-[var(--theme-accent)] p-2 w-full font-pixel focus:outline-none focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)] hover:border-[var(--theme-accent)] mb-2 sm:mb-0"
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
					menuPlacement="auto"
					onMenuOpen={() => {}}
				/>
				<span id="filter-description" className="sr-only">
					選擇篩選條件以顯示全部、已完成、未完成或特定優先順序的待辦事項
				</span>
			</div>
		</div>
	);
}

export default FilterBar;
