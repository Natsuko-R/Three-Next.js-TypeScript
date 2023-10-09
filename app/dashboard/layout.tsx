import React, { FC, PropsWithChildren } from "react"
// import { withAuthGuard } from "@/hocs/with-auth-guard"
// ? 
// const DashboardLayout: FC<PropsWithChildren> = withAuthGuard(


const DashboardLayout: FC<PropsWithChildren> = (
    ({ children }) => {
        return (
            <>
                <main className="flex flex-1">{children}</main>
            </>
        )
    }
)

export default DashboardLayout