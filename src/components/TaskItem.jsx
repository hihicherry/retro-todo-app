import React, { useContext, useState, useEffect, memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TodoContext } from "../context/TodoContext";
import HeartAnimation from "./HeartAnimation";

function TaskItem({ todo, index }) {
	const { toggleTodo, deleteTodo, editTodo, reorderTodo } =
		useContext(TodoContext);
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.text);
	const [showHeart, setShowHeart] = useState(false);

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

	// 切換完成狀態並觸發愛心動畫;
	const handleToggle = () => {
		toggleTodo(todo.id);
		if (!todo.completed) {
			setShowHeart(true); // 當任務從未完成變為完成時觸發
		}
	};

	// 重置 showHeart 狀態以支援重複觸發
	useEffect(() => {
		if (showHeart) {
			const timer = setTimeout(() => setShowHeart(false), 1000); // 動畫持續 1 秒後重置
			return () => clearTimeout(timer);
		}
	}, [showHeart]);

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
			if (item.id !== todo.id) {
				// 避免自己與自己交換
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
					className="flex-1 flex flex-col sm:flex-row sm:items-center w-full"
				>
					<div className="flex-1">
						<label
							htmlFor={`edit-input-${todo.id}`}
							className="sr-only"
						>
							編輯 {todo.text}
						</label>
						<input
							id={`edit-input-${todo.id}`}
							type="text"
							value={editText}
							onChange={(e) => setEditText(e.target.value)}
							className="border-2 border-indigo-400 p-2 flex-1 font-pixel text-indigo-900 focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-300"
							aria-label={`編輯 ${todo.text}`}
							title="編輯待辦事項"
						/>
					</div>

					<div className="flex sm:space-x-2 mt-2 sm:mt-0 w-full justify-start">
						<button
							type="submit"
							className="bg-violet-300 text-white px-2 py-1 ml-2 font-pixel border-2 border-t-white border-l-white border-b-indigo-400 border-r-indigo-400 w-full sm:w-auto hover:bg-violet-400 focus:ring-2 focus:ring-violet-300 focus:outline-none"
							title="儲存修改"
						>
							儲存
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className="text-gray-500 px-2 py-1 ml-2 font-pixel w-full sm:w-auto mt-2 sm:mt-0 hover:text-gray-800 focus:ring-2 focus:ring-gray-300 focus:outline-none"
							title="取消編輯"
						>
							取消
						</button>
					</div>
				</form>
			) : (
				<>
					<input
						type="checkbox"
						id={`todo-${todo.id}`}
						checked={todo.completed}
						onChange={handleToggle}
						className="mr-2 accent-violet-300 focus:ring-2 focus:ring-violet-300"
						aria-label={`將 ${todo.text} 標記為 ${
							todo.completed ? "未完成" : "已完成"
						}`}
						title={`將 ${todo.text} 標記為 ${
							todo.completed ? "未完成" : "已完成"
						}`}
					/>
					<label
						htmlFor={`todo-${todo.id}`}
						className={`flex-1 font-pixel ${
							todo.completed
								? "line-through text-indigo-500"
								: "text-indigo-900"
						}`}
					>
						{todo.text} ({getCategoryText(todo.category)})
					</label>
					<button
						onClick={() => setIsEditing(true)}
						className="text-violet-500 font-pixel hover:text-violet-700 mr-2 focus:ring-2 focus:ring-violet-300 focus:outline-none"
						aria-label={`編輯 ${todo.text}`}
						title="編輯待辦事項"
					>
						修改
					</button>
					<button
						onClick={() => deleteTodo(todo.id)}
						className="text-pink-500 font-pixel hover:text-pink-700 focus:ring-2 focus:ring-pink-300 focus:outline-none"
						aria-label={`刪除 ${todo.text}`}
						title="刪除待辦事項"
					>
						刪除
					</button>
					<HeartAnimation trigger={showHeart} />
				</>
			)}
		</div>
	);
}

export default memo(TaskItem); //使用React.memo優化性能
