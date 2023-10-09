"use client"

import { useEffect, useRef, useState } from 'react';
import { useAuthContext } from "@/context/auth-context"
import { useRouter, usePathname } from 'next/navigation';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated, deviceType } = useAuthContext()

    const ignore = useRef(false)
    const router = useRouter()
    const pathname = usePathname()
    const [checked, setChecked] = useState(false)

    useEffect(() => {

        if (ignore.current) return
        ignore.current = true

        if (!isAuthenticated) {
            console.log("login please");
            router.replace("./login")
        } else {
            console.log("welcome!");

            if (deviceType === "3" && !pathname.startsWith("/type-400")) {
                router.replace("/type-400/farm-list")
            }

            setChecked(true)
        }

    }, [isAuthenticated, deviceType])

    // 比写 checked === false 要好， 细品
    if (!checked) return null

    return children
}


