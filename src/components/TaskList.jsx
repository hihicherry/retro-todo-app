import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TaskItem from "./TaskItem";

function TaskList() {
	const { todos } = useContext(TodoContext);

	return (
		<div className="max-h-64 overflow-y-auto">
			{todos.length === 0 ? (
				<p className="text-gray-500 font-pixel text-center">
					尚未新增待辦事項！
				</p>
			) : (
				todos.map((todo) => <TaskItem key={todo.id} todo={todo} />)
			)}
		</div>
	);
}

export default TaskList;
