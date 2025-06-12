import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function SortToggle() {
	const { sortByPriority, setSortByPriority } = useContext(TodoContext);

	return (
		<div className="mb-4">
			<button
				onClick={() => setSortByPriority(!sortByPriority)}
				className="bg-[var(--theme-accent)] text-white px-4 py-2 font-pixel border-2 border-t-white border-l-white border-b-[var(--theme-accent)] border-r-[var(--theme-accent)] shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-none hover:bg-[var(--theme-secondary)] transition-all"
				aria-label={
					sortByPriority ? "切換到手動排序" : "切換到優先順序排序"
				}
				title={sortByPriority ? "切換到手動排序" : "切換到優先順序排序"}
			>
				{sortByPriority ? "手動排序" : "按優先順序排序"}
			</button>
		</div>
	);
}

export default SortToggle;
