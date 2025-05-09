import React, { useState, useEffect } from "react";

function PixelWindow({ title, children, progress = 0, autoProgress = false }) {
	const [isMinimized, setIsMinimized] = useState(false); //最小化管理
	const [dynamicProgress, setDynamicProgress] = useState(0); //動態進度條管理

	const handleMinimize = () => setIsMinimized(!isMinimized);

	useEffect(() => {
		let interval;
		if (autoProgress && progress === 0) {
			interval = setInterval(() => {
				setDynamicProgress((prev) => {
					if (prev >= 100) {
						clearInterval(interval);
						setTimeout(() => setDynamicProgress(0), 1000);
						return 100;
					}
					return prev + 1;
				});
			}, 50);
		} else {
			setDynamicProgress(progress);
		}
		return () => clearInterval(interval);
	}, [autoProgress, progress]);

	return (
		<div
			className="pixel-window border-2 border-gray-800 shadow-[4px_4px_0_#4A2A4A] max-w-lg w-full relative"
			style={{ fontFamily: "pixel, monospace" }}
			role="dialog"
			aria-labelledby="window-title"
		>
			<div className="pixel-header text-white py-1">
				<div className="bg-indigo-400 px-2 py-1 flex justify-between items-center">
					<span id="window-title" className="font-pixel text-sm">
						{title}
					</span>
					<div className="flex space-x-1">
						<button
							onClick={handleMinimize}
							className="hover:scale-125 active:translate-x-1 active:translate-y-1 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
							aria-label="最小化視窗"
							title="最小化視窗"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
									fill="#C4B5FD"
									stroke="#230F3D"
									strokeWidth="2"
								/>
							</svg>
						</button>
						<button
							className="hover:scale-110 active:translate-x-1 active:translate-y-1 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
							aria-label="最大化視窗"
							title="最大化視窗"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
									fill="#A78BFA"
									stroke="#230F3D"
									strokeWidth="2"
								/>
							</svg>
						</button>
						<button
							className="hover:scale-110 active:translate-x-1 active:translate-y-1 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
							aria-label="關閉視窗"
							titile="關閉視窗"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
									fill="#8B5CF6"
									stroke="#230F3D"
									strokeWidth="2"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className={`p-2 bg-violet-100 ${isMinimized ? "hidden" : ""}`}>
				{progress > 0 && progress <= 100 && (
					<div className="progress-bar mb-2">
						<div
							className="progress-bar-inner"
							style={{ width: `${progress}%` }}
						/>
					</div>
				)}
				{children}
			</div>
		</div>
	);
}

export default PixelWindow;
