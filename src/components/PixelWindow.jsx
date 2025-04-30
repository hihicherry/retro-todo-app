import React from "react";

function PixelWindow({ title, children }) {
	return (
		<div className="border-4 border-sky-500 bg-gray-100 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] max-w-lg w-full">
			<div className="bg-sky-500 text-white px-2 py-1 flex justify-between items-center">
				<span className="font-pixel text-sm">{title}</span>
				<div className="flex space-x-1">
					<button className="w-4 h-4 bg-pink-300 rounded-full"></button>
					<button className="w-4 h-4 bg-yellow-300 rounded-full"></button>
					<button className="w-4 h-4 bg-green-300 rounded-full"></button>
				</div>
			</div>
			<div className="p-2">{children}</div>
		</div>
	);
}

export default PixelWindow;
