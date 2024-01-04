import { Box } from "@/components/custom-ui/box"

import { GraphClient } from "./components/client"

export default function GraphPage() {
    return (
        <Box className="w-full p-0 flex-col items-center">
            <GraphClient />
        </Box>
    )
}
