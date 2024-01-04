"use client";

import { HouseModificationCanvas } from "./house-modification-canvas";
import { LeftPanel } from "./components/left-panel";
import { useThreeHouseStore } from "./hooks/useThreeHouseStore";
import { useEffect } from "react";
import { useParams } from "next/navigation"
import { useJsonDataStore } from "./hooks/useJsonDataStore";
import { PlayCanvas } from "./playground-canvas";

export const HouseContainer: React.FC = () => {
	const { data, getData, has3D } = useThreeHouseStore()
	const { setJsonData } = useJsonDataStore() // Local 3D Data  
	const { customerId, controllerId, farmId, houseId } = useParams()
	const [id1, id2] = (customerId as string).split("-");

	useEffect(() => {

		getData({
			farm_id: Number(farmId),
			controller_id: Number(controllerId),
			house_id: Number(houseId),
			code1: id1,
			code2: id2,
		})

	}, [getData, id1, id2, controllerId, farmId, houseId])

	useEffect(() => {
		if (!data) return
		setJsonData(data)
	}, [has3D])

	return (
		<div
			className="h-full w-full flex-1 bg-gradient-to-r select-none
		to-indigo-500 from-10% via-sky-500 via-30%
		from-emerald-500 to-90% rounded p-2 
		overflow-hidden flex justify-between relative"
		>

			<div className="absolute top-0 bottom-0 left-0 right-0 w-auto">
				<HouseModificationCanvas />
			</div>

			<LeftPanel />

		</div>
	);
};
