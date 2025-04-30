import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function TaskForm() {
	const [text, setText] = useState("");
	const [category, setCategory] = useState("Work");
	const { addTodo } = useContext(TodoContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim()) {
			addTodo(text, category);
			setText("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="新增項目"
				className="border-2 border-gray-800 p-2 w-full mb-2 font-pixel text-gray-800 focus:outline-none focus:border-primary"
				aria-label="Task description"
			/>
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				className="border-2 border-gray-800 p-2 w-full mb-2 font-pixel text-gray-800 focus:outline-none"
				aria-label="項目類別"
			>
				<option value="Work">工作</option>
				<option value="Personal">個人</option>
			</select>
			<button
				type="submit"
				className="bg-primary text-white px-4 py-2 border-2 border-gray-800 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-none transition-all font-pixel"
			>
				新增待辦事項
			</button>
		</form>
	);
}

export default TaskForm;
