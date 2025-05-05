import React, { useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TodoProvider } from "./context/TodoContext";
import PixelWindow from "./components/PixelWindow";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import "./index.css";

function App() {

	return (
		<TodoProvider>
			<DndProvider backend={HTML5Backend}>
				<div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-4">
					<PixelWindow title="待辦事項清單">
						<div className="p-4">
							<TaskForm />
							<FilterBar />
							<TaskList />
						</div>
					</PixelWindow>
				</div>
			</DndProvider>
		</TodoProvider>
	);
}

export default App;
