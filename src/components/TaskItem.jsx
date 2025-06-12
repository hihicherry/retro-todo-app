import React, { useContext, useState, useEffect, memo, useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TodoContext } from "../context/TodoContext";
import HeartAnimation from "./HeartAnimation";
import { FaGripVertical } from "react-icons/fa"; //react-icons 的拖曳圖標
import Select from "react-select";

function TaskItem({ todo, index }) {
	const { toggleTodo, deleteTodo, editTodo, reorderTodo, sortByPriority } =
		useContext(TodoContext);
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.text);
	const [editPriority, setEditPriority] = useState(todo.priority || "minor");
	const [showHeart, setShowHeart] = useState(false);

	// 將類別轉換為中文
	const getCategoryText = (category) => {
		return category === "Work" ? "工作" : "個人";
	};

	// 將優先順序轉換為中文
	const getPriorityText = (priority) => {
		switch (priority) {
			case "highest":
				return "十萬火急！⏰";
			case "urgent":
				return "等一下再說～🙆";
			case "minor":
				return "慢慢來💤";
			default:
				return "慢慢來💤";
		}
	};

	// 提交編輯
	const handleEditSubmit = (e) => {
		e.preventDefault();
		if (editText.trim()) {
			editTodo(todo.id, editText, editPriority);
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
		canDrag: !sortByPriority,
	});

	const [, drop] = useDrop({
		accept: "TASK",
		hover: (item) => {
			if (item.id !== todo.id && !sortByPriority) {
				// 避免自己與自己交換
				reorderTodo(item.index, index);
				item.index = index; // 更新拖動項的索引
			}
		},
	});

	const priorityOptions = useMemo(
		() => [
			{ value: "highest", label: "十萬火急！⏰" },
			{ value: "urgent", label: "等一下再說～🙆" },
			{ value: "minor", label: "慢慢來💤" },
		],
		[]
	);

	const customStyles = useMemo(
		() => ({
			control: (provided) => ({
				...provided,
				backgroundColor: "var(--theme-secondary)",
				border: "2px solid var(--theme-accent)",
				borderRadius: 0,
				padding: "2px 8px",
				fontFamily: "pixel, monospace",
				color: "var(--theme-dark)",
				boxShadow: "none",
				"&:hover": {
					borderColor: "var(--theme-accent)",
				},
				"&:focus-within": {
					borderColor: "var(--theme-accent)",
					boxShadow: "0 0 0 3px rgba(109, 40, 217, 0.3)",
				},
			}),
			menu: (provided) => ({
				...provided,
				backgroundColor: "var(--theme-secondary)",
				border: "2px solid var(--theme-accent)",
				borderRadius: 0,
				fontFamily: "pixel, monospace",
				color: "var(--theme-dark)",
			}),
			option: (provided, state) => ({
				...provided,
				backgroundColor: state.isSelected
					? "var(--theme-primary)"
					: "var(--theme-secondary)",
				color: "var(--theme-dark)",
				"&:hover": {
					backgroundColor: "var(--theme-primary)",
				},
			}),
			singleValue: (provided) => ({
				...provided,
				color: "var(--theme-dark)",
			}),
			indicatorSeparator: () => ({ display: "none" }),
			dropdownIndicator: (provided) => ({
				...provided,
				color: "var(--theme-dark)",
				"&:hover": {
					color: "var(--theme-accent)",
				},
			}),
		}),
		[]
	);

	return (
		<div
			ref={(node) => (sortByPriority ? null : drag(drop(node)))}
			className={`flex items-center p-2 border-b-2 border-[var(--theme-accent)] ${
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
							className="border-2 border-[var(--theme-accent) p-2 flex-1 font-pixel text-[var(--theme-accent)] focus:outline-none focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]"
							aria-label={`編輯 ${todo.text}`}
							title="編輯待辦事項"
						/>
						<Select
							options={priorityOptions}
							value={priorityOptions.find(
								(option) => option.value === editPriority
							)}
							onChange={(selectedOption) =>
								setEditPriority(
									selectedOption
										? selectedOption.value
										: "minor"
								)
							}
							styles={customStyles}
							className="mt-2 sm:mt-0 sm:ml-2"
							aria-label="選擇優先順序"
							title="選擇優先順序"
							onMenuOpen={() => {}}
						/>
					</div>

					<div className="flex sm:space-x-2 mt-2 sm:mt-0 w-full justify-start">
						<button
							type="submit"
							className="bg-[var(--theme-accent)] text-white px-2 py-1 ml-2 font-pixel border-2 border-t-white border-l-white border-b-[var(--theme-accent)] border-r-[var(--theme-accent)] w-full sm:w-auto hover:bg-[var(--theme-secondary)] focus:ring-2 focus:ring-[var(--theme-accent)] focus:outline-none"
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
					<div
						ref={sortByPriority ? null : drag} //將拖曳功能綁定到圖標
						className={`cursor-move mr-2 text-[var(--theme-accent)] hover:text-[var(--theme-secondary)] transition-all ${
							isDragging ? "scale-125" : ""
						} ${sortByPriority ? "opacity-0" : ""}`}
						aria-label="拖曳以重新排序"
						title="拖曳以重新排序"
					>
						<FaGripVertical size={10} />
					</div>
					<input
						type="checkbox"
						id={`todo-${todo.id}`}
						checked={todo.completed}
						onChange={handleToggle}
						className="mr-2 accent-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]"
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
								? "line-through text-[var(--theme-done)]"
								: "text-[var(--theme-accent)]"
						}`}
					>
						{todo.text} ({getCategoryText(todo.category)}) [
						<span
							className={
								todo.priority === "highest"
									? "text-red-600"
									: todo.priority === "urgent"
									? "text-orange-600"
									: "text-green-600"
							}
						>
							{getPriorityText(todo.priority)}
						</span>
						]
					</label>
					<button
						onClick={() => setIsEditing(true)}
						className="text-[var(--theme-accent)] font-pixel hover:text-[var(--theme-done)] mr-2 focus:ring-2 focus:ring-[var(--theme-secondary)] focus:outline-none"
						aria-label={`編輯 ${todo.text}`}
						title="編輯待辦事項"
					>
						修改
					</button>
					<button
						onClick={() => deleteTodo(todo.id)}
						className="text-pink-400 font-pixel hover:text-pink-600 focus:ring-2 focus:ring-[var(--theme-accent)] focus:outline-none"
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
