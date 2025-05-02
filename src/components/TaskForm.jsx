import React, { useState, useContext } from "react";
import Select from "react-select";
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

	const categoryOptions = [
		{ value: "Work", label: "工作" },
		{ value: "Personal", label: "個人" },
	];

	const customStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: "#f3e8ff",
			border: "2px solid #818cf8",
			borderRadius: 0,
			padding: "2px 8px",
			fontFamily: "pixel, monospace",
			color: "#4B5EAA",
			boxShadow: "none",
			"&:hover": {
				borderColor: "#c4b5fd",
			},
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "#f3e8ff",
			border: "2px solid #818cf8",
			borderRadius: 0,
			fontFamily: "pixel, monospace",
			color: "#4B5EAA",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? "#D2B4DE" : "#f3e8ff",
			color: "#4B5EAA",
			"&:hover": {
				backgroundColor: "#D2B4DE",
			},
		}),
		singleValue: (provided) => ({
			...provided,
			color: "#4B5EAA",
		}),
		indicatorSeparator: () => ({ display: "none" }),
		dropdownIndicator: (provided) => ({
			...provided,
			color: "#4B5EAA",
			"&:hover": {
				color: "#6D28D9",
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
				className="border-2 border-indigo-400 p-2 w-full mb-2 font-pixel text-indigo-900 focus:outline-none focus:border-violet-300 hover:border-violet-300"
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
