import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TodoProvider } from "./context/TodoContext";
import PixelWindow from "./components/PixelWindow";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import "./index.css";
import ThemeSwitcher from "./ThemeSwitcher";

// 創建一個內部組件來使用 ThemeContext
function AppContent() {
	const { theme } = useContext(ThemeContext); // 現在這行在 ThemeProvider 內部

	return (
		<div
			className={`min-h-screen bg-[var(--theme-background)] flex items-center justify-center p-4 theme-${theme}`}
		>
			<PixelWindow title="待辦事項清單">
				<div className="p-4">
					<ThemeSwitcher />
					<TaskForm />
					<FilterBar />
					<TaskList />
				</div>
			</PixelWindow>
		</div>
	);
}

function App() {
	return (
		<ThemeProvider>
			<TodoProvider>
				<DndProvider backend={HTML5Backend}>
					<AppContent /> {/* 將主要內容移動到 AppContent 組件 */}
				</DndProvider>
			</TodoProvider>
		</ThemeProvider>
	);
}

export default App;
