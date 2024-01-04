import { HouseContainer } from "./house-container";
import { Box } from "@/components/custom-ui/box";

export default function ThreeDHouse() {
	return (
		<>
			<Box className="p-4 w-full h-full flex-1 flex-col gap-4 max-w-screen-2xl">
				<HouseContainer />
			</Box>
		</>
	);
}
