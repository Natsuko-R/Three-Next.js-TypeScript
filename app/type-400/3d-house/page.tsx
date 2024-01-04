"use client"

import { useModelDataStore } from "@/app/dashboard/project/hooks/useModelDataStore"
import { PlayCanvas } from "./components/playground-canvas"
import { LeftPanel } from "./components/left-panel";
import { useEffect } from "react"

const Panel = () => {

    const { getModels } = useModelDataStore()

    useEffect(() => {
        getModels()
    }, []);

    return (
        // <div
        //     className="h-full w-full flex-1 select-none p-2 
        // flex justify-between relative"
        // >

        //     <div className="absolute top-0 bottom-0 left-0 right-0 w-auto">
        //     </div>

        //     {/* <LeftPanel /> */}

        // </div>
        <PlayCanvas />

    );
}

export default Panel
