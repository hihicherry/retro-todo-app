import React, { createContext, useState, useEffect } from "react";

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

	// 每次 todos 變更時，儲存到 LocalStorage
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	// 新增待辦事項
	const addTodo = (text, category) => {
		setTodos([
			...todos,
			{ id: Date.now(), text, category, completed: false },
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
    const editTodo = (id, newText) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, text: newText } : todo
			)
		);
	};

	// 篩選和搜尋邏輯
	const filteredTodos = todos
		.filter((todo) => {
			if (filter === "completed") return todo.completed;
			if (filter === "active") return !todo.completed;
			return true;
		})
		.filter((todo) =>
			todo.text.toLowerCase().includes(search.toLowerCase())
		);

	return (
		<TodoContext.Provider
			value={{
				todos: filteredTodos,
				addTodo,
				toggleTodo,
				deleteTodo,
				editTodo,
				setFilter,
				setSearch,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
