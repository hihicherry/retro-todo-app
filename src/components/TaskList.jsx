import React, { useContext, memo } from "react";
import { useDrop } from "react-dnd";
import { TodoContext } from "../context/TodoContext";
import TaskItem from "./TaskItem";

function TaskList() {
	const { todos } = useContext(TodoContext);

	const [, drop] = useDrop({
		accept: "TASK",
	});

	return (
		<div
			ref={drop}
			className="max-h-64 overflow-y-auto custom-scrollbar"
			role="list"
			aria-label="待辦事項列表"
		>
			{todos.length === 0 ? (
				<p className="text-gray-600 font-pixel text-center">
					尚未新增待辦事項！
				</p>
			) : (
				todos.map((todo, index) => (
					<TaskItem key={todo.id} todo={todo} index={index} />
				))
			)}
		</div>
	);
}

export default memo(TaskList);
