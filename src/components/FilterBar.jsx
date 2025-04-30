import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function FilterBar() {
	const { setFilter, setSearch } = useContext(TodoContext);

	return (
		<div className="flex flex-col sm:flex-row sm:space-x-2 mb-4">
			<input
				type="text"
				placeholder="搜尋項目..."
				onChange={(e) => setSearch(e.target.value)}
				className="border-2 border-indigo-400 p-2 flex-1 font-pixel text-indigo-900 focus:outline-none focus:border-violet-300 mb-2 sm:mb-0"
				aria-label="搜尋項目"
				title="輸入關鍵字搜尋待辦事項"
			/>
			<select
				onChange={(e) => setFilter(e.target.value)}
				className="custom-select border-2 border-indigo-400 p-2 font-pixel text-indigo-900 focus:outline-none min-w-[100px]"
				aria-label="篩選待辦事項"
				title="選擇篩選條件"
			>
				<option value="all">全部</option>
				<option value="completed">已完成</option>
				<option value="active">未完成</option>
			</select>
		</div>
	);
}

export default FilterBar;
