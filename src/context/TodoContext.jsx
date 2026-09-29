import React, { createContext, useState, useEffect, useMemo } from "react";

export const TodoContext = createContext();

const PRIORITY_ORDER = {
	highest: 1,
	urgent: 2,
	minor: 3,
};

export const TodoProvider = ({ children }) => {
	// 從 LocalStorage 初始化任務數據
	const [todos, setTodos] = useState(() => {
		const saved = localStorage.getItem("todos");
		return saved ? JSON.parse(saved) : [];
	});

	// 篩選和搜尋狀態
	const [filter, setFilter] = useState("all");
	const [search, setSearch] = useState("");
	const [sortByPriority, setSortByPriorityState] = useState(false); //優先順序排序狀態

	// 每次 todos 變更時，儲存到 LocalStorage
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const getVisibleTodos = (list) =>
		list
			.filter((todo) => {
				if (filter === "completed") return todo.completed;
				if (filter === "active") return !todo.completed;
				if (filter === "highest") return todo.priority === "highest";
				if (filter === "urgent") return todo.priority === "urgent";
				if (filter === "minor") return todo.priority === "minor";
				return true;
			})
			.filter((todo) =>
				todo.text.toLowerCase().includes(search.toLowerCase())
			);

	const compareByPriority = (a, b) => {
		const aOrder = PRIORITY_ORDER[a.priority] ?? 99;
		const bOrder = PRIORITY_ORDER[b.priority] ?? 99;
		return aOrder - bOrder;
	};

	const sortTodosByPriority = (list) => [...list].sort(compareByPriority);

	const isSameOrder = (a, b) =>
		a.length === b.length && a.every((todo, index) => todo.id === b[index].id);

	// 自動排序開啟時，整份清單都要依優先順序重排並寫回狀態
	useEffect(() => {
		if (!sortByPriority) return;
		setTodos((prev) => {
			const sorted = sortTodosByPriority(prev);
			return isSameOrder(prev, sorted) ? prev : sorted;
		});
	}, [todos, sortByPriority]);

	// 自動排序要重寫整份清單順序，而不是只改畫面上被拖過的項目
	const setSortByPriority = (enabled) => {
		if (enabled) {
			setTodos((prev) => sortTodosByPriority(prev));
		}
		setSortByPriorityState(enabled);
	};

	// 新增待辦事項
	const addTodo = (text, category, priority = "minor") => {
		setTodos((prev) => [
			...prev,
			{ id: Date.now(), text, category, completed: false, priority },
		]);
	};

	// 切換待辦事項完成狀態
	const toggleTodo = (id) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	// 刪除待辦事項
	const deleteTodo = (id) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	// 編輯待辦事項
	const editTodo = (id, newText, newPriority) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id
					? { ...todo, text: newText, priority: newPriority }
					: todo
			)
		);
	};

	// 處理項目排序
	const reorderTodo = (fromIndex, toIndex) => {
		if (fromIndex === toIndex) return;
		setTodos((prev) => {
			const visibleTodos = getVisibleTodos(prev);
			const fromTodo = visibleTodos[fromIndex];
			const toTodo = visibleTodos[toIndex];
			if (!fromTodo || !toTodo) return prev;

			const fromOriginalIndex = prev.findIndex(
				(todo) => todo.id === fromTodo.id
			);
			const toOriginalIndex = prev.findIndex(
				(todo) => todo.id === toTodo.id
			);
			if (fromOriginalIndex < 0 || toOriginalIndex < 0) return prev;

			const updatedTodos = [...prev];
			const [movedTodo] = updatedTodos.splice(fromOriginalIndex, 1);
			updatedTodos.splice(toOriginalIndex, 0, movedTodo);
			return updatedTodos;
		});
	};

	// 篩選和搜尋邏輯
	const filteredTodos = useMemo(() => {
		const visibleTodos = getVisibleTodos(todos);
		if (!sortByPriority) return visibleTodos;
		return sortTodosByPriority(visibleTodos);
	}, [todos, filter, search, sortByPriority]);

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
