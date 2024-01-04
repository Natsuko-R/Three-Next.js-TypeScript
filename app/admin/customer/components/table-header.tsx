"use client"

import { Box } from "@/components/custom-ui/box"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export const SearchHeader = () => {

    const router = useRouter()

    const handleAdd = useCallback(() => {
        router.push("/admin/customer/container")
    }, [router])

    return (
        <Box className="p-0 w-full justify-between items-center">

            <Box>
                <span className="text-md">顾客一览</span>
            </Box>

            <Button onClick={handleAdd}>追加</Button>
            <Box>
                <Input placeholder="顧客を探す" className="w-[300px]" />
            </Box>
        </Box>

    )

}
