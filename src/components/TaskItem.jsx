import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function TaskItem({ todo }) {
	const { toggleTodo, deleteTodo } = useContext(TodoContext);

	return (
		<div className="flex items-center p-2 border-b-2 border-indigo-900">
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() => toggleTodo(todo.id)}
				className="mr-2 accent-primary"
				aria-label={`Mark ${todo.text} as ${
					todo.completed ? "incomplete" : "complete"
				}`}
			/>
			<span
				className={`flex-1 font-pixel ${
					todo.completed
						? "line-through text-indigo-500"
						: "text-indigo-900"
				}`}
			>
				{todo.text} ({todo.category})
			</span>
			<button
				onClick={() => deleteTodo(todo.id)}
				className="text-pink-500 font-pixel hover:pink-red-700"
				aria-label={`Delete ${todo.text}`}
			>
				刪除
			</button>
		</div>
	);
}

export default TaskItem;
