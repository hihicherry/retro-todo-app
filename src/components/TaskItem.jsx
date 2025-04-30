import React, { useContext, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TodoContext } from "../context/TodoContext";

function TaskItem({ todo }) {
	const { toggleTodo, deleteTodo, editTodo, reorderTodo } = useContext(TodoContext);
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

    const [{ isDragging }, drag] = useDrag({
		type: "TASK",
		item: { id: todo.id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: "TASK",
		hover: (item) => {
			if (item.index !== index) {
				reorderTodo(item.index, index);
				item.index = index; // 更新拖動項的索引
			}
		},
	});

	return (
		<div
			ref={(node) => drag(drop(node))}
			className={`flex items-center p-2 border-b-2 border-indigo-900 ${
				isDragging ? "opacity-50" : ""
			}`}
		>
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
						aria-label="編輯項目名稱"
						title="編輯待辦事項"
					/>
					<button
						type="submit"
						className="bg-violet-300 text-white px-2 py-1 ml-2 font-pixel border-2 border-t-white border-l-white border-b-indigo-400 border-r-indigo-400"
						title="儲存修改"
					>
						儲存
					</button>
					<button
						onClick={() => setIsEditing(false)}
						className="text-gray-500 px-2 py-1 ml-2 font-pixel"
						title="取消編輯"
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
						aria-label={`將 ${todo.text} 標記為 ${
							todo.completed ? "未完成" : "已完成"
						}`}
						title={`將 ${todo.text} 標記為 ${
							todo.completed ? "未完成" : "已完成"
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
						aria-label={`編輯 ${todo.text}`}
						title="編輯待辦事項"
					>
						修改
					</button>
					<button
						onClick={() => deleteTodo(todo.id)}
						className="text-pink-500 font-pixel hover:text-pink-700"
						aria-label={`刪除 ${todo.text}`}
						title="刪除待辦事項"
					>
						刪除
					</button>
				</>
			)}
		</div>
	);
}

export default memo(TaskItem);  //使用React.memo優化性能
