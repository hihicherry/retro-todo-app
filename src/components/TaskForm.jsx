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
				className="border-2 border-indigo-400 p-2 w-full mb-2 font-pixel text-indigo-900 focus:outline-none focus:border-violet-300"
				aria-label="項目名稱"
				title="輸入待辦事項名稱"
			/>
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				className="custom-select border-2 border-indigo-400 p-2 w-full mb-2 font-pixel text-indigo-900 focus:outline-none"
				aria-label="項目類別"
				title="選擇待辦事項類別"
			>
				<option value="Work">工作</option>
				<option value="Personal">個人</option>
			</select>
			<button
				type="submit"
				className="bg-violet-300 text-white px-2 py-2 border-2 border-t-white border-l-white border-b-indigo-400 border-r-indigo-400 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-none transition-all font-pixel"
				title="新增待辦事項"
			>
				新增待辦事項
			</button>
		</form>
	);
}

export default TaskForm;
