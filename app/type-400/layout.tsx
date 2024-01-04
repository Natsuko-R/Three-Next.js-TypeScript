import { FC, PropsWithChildren } from "react"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { Nav } from "./components/nav"

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SiteHeader simple parentPath="/type-400" extraMenu={<Nav />} />
      <main className="flex flex-1">{children}</main>
      <SiteFooter />
    </>
  )
}

export default DashboardLayout
