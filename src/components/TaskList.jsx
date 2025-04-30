import React, { useContext } from "react";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TodoContext } from "../context/TodoContext";
import TaskItem from "./TaskItem";

function TaskList() {
	const { todos } = useContext(TodoContext);

    const [, drop] = useDrop({
		accept: "TASK",
		drop: (item, monitor) => {
			const fromIndex = item.index;
			const toIndex = todos.length - 1; // 默認放到最後
			if (fromIndex !== toIndex) {
				reorderTodo(fromIndex, toIndex);
			}
		},
	});

	return (
		<DndProvider backend={HTML5Backend}>
			<div
				ref={drop}
				className="max-h-64 overflow-y-auto custom-scrollbar"
			>
				{todos.length === 0 ? (
					<p className="text-gray-500 font-pixel text-center">
						尚未新增待辦事項！
					</p>
				) : (
					todos.map((todo, index) => (
						<TaskItem key={todo.id} todo={todo} index={index} />
					))
				)}
			</div>
		</DndProvider>
	);
}

export default TaskList;
