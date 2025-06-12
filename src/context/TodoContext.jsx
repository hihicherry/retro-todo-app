import React, { createContext, useState, useEffect, useMemo } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
	// 從 LocalStorage 初始化任務數據
	const [todos, setTodos] = useState(() => {
		const saved = localStorage.getItem("todos");
		return saved ? JSON.parse(saved) : [];
	});

	// 篩選和搜尋狀態
	const [filter, setFilter] = useState("all");
	const [search, setSearch] = useState("");
	const [sortByPriority, setSortByPriority] = useState(false); //優先順序排序狀態

	// 每次 todos 變更時，儲存到 LocalStorage
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	// 新增待辦事項
	const addTodo = (text, category, priority = "minor") => {
		setTodos([
			...todos,
			{ id: Date.now(), text, category, completed: false, priority },
		]);
	};

	// 切換待辦事項完成狀態
	const toggleTodo = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	// 刪除待辦事項
	const deleteTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	// 編輯待辦事項
	const editTodo = (id, newText, newPriority) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id
					? { ...todo, text: newText, priority: newPriority }
					: todo
			)
		);
	};

	// 處理項目排序
	const reorderTodo = (fromIndex, toIndex) => {
		const updatedTodos = [...todos];
		const [movedTodo] = updatedTodos.splice(fromIndex, 1);
		updatedTodos.splice(toIndex, 0, movedTodo);
		setTodos(updatedTodos);
	};

	// 定義優先順序權重
	const priorityOrder = {
		highest: 3,
		urgent: 2,
		minor: 1,
	};

	// 篩選和搜尋邏輯
	const filteredTodos = useMemo(
		() =>
			todos
				.filter((todo) => {
					if (filter === "completed") return todo.completed;
					if (filter === "active") return !todo.completed;
					if (filter === "highest")
						return todo.priority === "highest";
					if (filter === "urgent") return todo.priority === "urgent";
					if (filter === "minor") return todo.priority === "minor";
					return true;
				})
				.filter((todo) =>
					todo.text.toLowerCase().includes(search.toLowerCase())
				)
				.sort((a, b) => {
					if (sortByPriority) {
						return (
							priorityOrder[b.priority] -
							priorityOrder[a.priority]
						);
					}
					return 0;
				}),
		[todos, filter, search, sortByPriority]
	);

	return (
		<TodoContext.Provider
			value={{
				todos: filteredTodos,
				addTodo,
				toggleTodo,
				deleteTodo,
				editTodo,
				reorderTodo,
				setFilter,
				setSearch,
				sortByPriority,
				setSortByPriority,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
