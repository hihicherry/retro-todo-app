// src/App.jsx
import React from "react";
import { TodoProvider } from "./context/TodoContext";
import PixelWindow from "./components/PixelWindow";
import "./index.css";

function App() {
	return (
		<TodoProvider>
			<div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
				<PixelWindow title="Todo App">
					<div className="p-4">
						<h2 className="text-xl font-pixel text-gray-800 mb-4">
							Tasks
						</h2>
						{/* 後續添加 TaskForm、FilterBar、TaskList */}
					</div>
				</PixelWindow>
			</div>
		</TodoProvider>
	);
}

export default App;
