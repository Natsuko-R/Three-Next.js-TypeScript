"use client"

import { Canvas } from "./MyCanvas"
import { useEffect } from "react"
import { useModelDataStore } from "../hooks/useModelDataStore";

export const Panel = () => {

    const { getModels } = useModelDataStore()

    useEffect(() => {
        getModels()
    }, []);

    return (
        <div className="h-full" >
            <Canvas />
        </div>
    )
}
