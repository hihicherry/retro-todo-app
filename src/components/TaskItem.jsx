import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

function TaskItem({ todo }) {
	const { toggleTodo, deleteTodo, editTodo } = useContext(TodoContext);
    const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.text);

	// 將類別轉換為中文
	const getCategoryText = (category) => {
		return category === "Work" ? "工作" : "個人";
	};

    // 提交編輯
     const handleEditSubmit = (e) => {
			e.preventDefault();
			if (editText.trim()) {
				editTodo(todo.id, editText);
				setIsEditing(false);
			}
		};

	return (
		<div className="flex items-center p-2 border-b-2 border-indigo-900">
			{isEditing ? (
				<form
					onSubmit={handleEditSubmit}
					className="flex-1 flex items-center"
				>
					<input
						type="text"
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
						className="border-2 border-indigo-400 p-2 flex-1 font-pixel text-indigo-900 focus:outline-none focus:border-violet-300"
						aria-label="Edit task description"
					/>
					<button
						type="submit"
						className="bg-violet-300 text-white px-2 py-1 ml-2 font-pixel border-2 border-t-white border-l-white border-b-indigo-400 border-r-indigo-400"
					>
						儲存
					</button>
					<button
						onClick={() => setIsEditing(false)}
						className="text-gray-500 px-2 py-1 ml-2 font-pixel"
					>
						取消
					</button>
				</form>
			) : (
				<>
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={() => toggleTodo(todo.id)}
						className="mr-2 accent-violet-300"
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
						{todo.text} ({getCategoryText(todo.category)})
					</span>
					<button
						onClick={() => setIsEditing(true)}
						className="text-violet-500 font-pixel hover:text-violet-700 mr-2"
						aria-label={`Edit ${todo.text}`}
					>
						修改
					</button>
					<button
						onClick={() => deleteTodo(todo.id)}
						className="text-pink-500 font-pixel hover:text-pink-700"
						aria-label={`Delete ${todo.text}`}
					>
						刪除
					</button>
				</>
			)}
		</div>
	);
}

export default TaskItem;
