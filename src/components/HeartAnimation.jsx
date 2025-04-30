import React from "react";

function HeartAnimation({ trigger }) {
	if (!trigger) return null;

	return (
		<div className="ml-2 flex items-center">
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="animate-heart"
			>
				<path
					d="M8 14L2 8L4 4L8 6L12 4L14 8L8 14Z"
					fill="#FF69B4"
					stroke="#230F3D"
					strokeWidth="2"
				/>
			</svg>
		</div>
	);
}

export default HeartAnimation;
