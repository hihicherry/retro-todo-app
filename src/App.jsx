import React from "react";
import { TodoProvider } from "./context/TodoContext";
import PixelWindow from "./components/PixelWindow";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./index.css";

function App() {
	return (
		<TodoProvider>
			<div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-4">
				<PixelWindow title="待辦事項清單">
					<div className="p-4">
						<TaskForm />
						<TaskList />
					</div>
				</PixelWindow>
			</div>
		</TodoProvider>
	);
}

export default App;
