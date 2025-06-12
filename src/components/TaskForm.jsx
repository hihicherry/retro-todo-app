import React, { useState, useContext } from "react";
import Select from "react-select";
import { TodoContext } from "../context/TodoContext";

function TaskForm() {
	const [text, setText] = useState("");
	const [category, setCategory] = useState("Work");
	const [priority, setPriority] = useState("minor");
	const { addTodo } = useContext(TodoContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim()) {
			addTodo(text, category, priority);
			setText("");
			setCategory("Work");
			setPriority("minor");
		}
	};

	const categoryOptions = [
		{ value: "Work", label: "工作" },
		{ value: "Personal", label: "個人" },
	];

	const priorityOptions = [
		{ value: "highest", label: "十萬火急！⏰" },
		{ value: "urgent", label: "等一下再說～🙆" },
		{ value: "minor", label: "慢慢來💤" },
	];

	const customStyles = {
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
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="新增項目"
				className="border-2 border-[var(--theme-accent)] p-2 w-full mb-2 font-pixel text-[var(--theme-accent)] focus:outline-none focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)] hover:border-[var(--theme-accent)]"
				aria-label="項目名稱"
				title="輸入待辦事項名稱"
			/>
			<Select
				options={categoryOptions}
				value={categoryOptions.find(
					(option) => option.value === category
				)}
				onChange={(selectedOption) =>
					setCategory(selectedOption ? selectedOption.value : "")
				}
				styles={customStyles}
				className="w-full mb-2"
				aria-label="項目類別"
				title="選擇待辦事項類別"
			/>
			<Select
				options={priorityOptions}
				value={priorityOptions.find(
					(option) => option.value === priority
				)}
				onChange={(selectedOption) =>
					setPriority(selectedOption ? selectedOption.value : "minor")
				}
				styles={customStyles}
				className="w-full mb-2"
				aria-label="優先順序"
				title="選擇優先順序"
			/>
			<button
				type="submit"
				className="bg-[var(--theme-accent)] text-white px-2 py-2 border-2 border-t-white border-l-white border-b-[var(--theme-accent)] border-r-[var(--theme-accent)] shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-none hover:bg-[var(--theme-secondary)] transition-all font-pixel"
				title="新增待辦事項"
			>
				新增待辦事項
			</button>
		</form>
	);
}

export default TaskForm;
