"use client";

import { HouseCanvas as Canvas } from "./house-canvas";

export const HouseContainer: React.FC = () => {

	return (
		<div className="absolute top-0 bottom-0 left-0 right-0 w-auto h-64">

			<Canvas />

		</div>
	);
};

// className="h-full w-full flex-1 bg-gradient-to-r select-none
//         to-indigo-500 from-10% via-sky-500 via-30%
//         from-emerald-500 to-90% rounded p-2 relative
//         overflow-hidden flex justify-between"
//  className="absolute top-0 bottom-0 left-0 right-0 w-auto h-64"