"use client"

import React from "react"

import { Box } from "@/components/custom-ui/box"
// import { BaseSearchHeader } from "@/components/sensor-form-base/base-search-header"
// import { useSearchStore } from "../hooks/useSearchStore"
// import { columns } from "./columns"
// import { DataTable } from "./data-table"
// import { SearchHeader } from "./search-header"
// import { AlertSearchHeader } from "./search-header-pure"
// import { StorePagination } from "./store-pagination"

export const AlertListClient = () => {
  // const { data } = useSearchStore()

  return (
    <Box className="text-blue flex h-full w-full max-w-screen-2xl flex-col items-center gap-2 p-0 font-bold">
      {/* <AlertSearchHeader className="max-w-screen-2xl" /> 
       <BaseSearchHeader hideHouse className="max-w-screen-2xl">
        <SearchHeader />
      </BaseSearchHeader>
      <DataTable columns={columns} data={data} />
      <StorePagination /> */}
      pagination
    </Box>
  )
}

export default AlertListClient
