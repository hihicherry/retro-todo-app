import React from "react";

function PixelWindow({ title, children }) {
	return (
		<div className="border-4 border-violet-300 bg-gray-100 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] max-w-lg w-full">
			<div className="bg-violet-300 text-white py-1">
				<div className="bg-indigo-400 px-2 py-1 flex justify-between items-center">
					<span className="font-pixel text-sm">{title}</span>
					<div className="flex space-x-1">
						<button className="w-4 h-4 bg-violet-300"></button>
						<button className="w-4 h-4 bg-violet-400"></button>
						<button className="w-4 h-4 bg-violet-500"></button>
					</div>
				</div>
			</div>
			<div className="p-2 bg-violet-100">{children}</div>
		</div>
	);
}

export default PixelWindow;
