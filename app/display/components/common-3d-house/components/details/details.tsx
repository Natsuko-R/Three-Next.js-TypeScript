"use client"

import React, { useEffect, useState } from "react"

import useController from "@/hooks/use-controller"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BaseSearchHeader } from "@/components/sensor-form-base/base-search-header"

import { useDetailDataStore } from "../../hooks/useDetailDataStore"
import { IntegrationClient } from "./integration/client"
// import { PresentValue } from "./present-value/client"
import { RealValuePage } from "./present-value/realvalue-page"

enum TabKeyEnum {
  realValue = "realValue",
  addition = "addition",
  // presentValue = "presentValue",
}

export const Details = () => {
  const { controllerValue, houseValue, areaValue } = useController()
  const { getList } = useDetailDataStore()

  const [tabKey, setTabKey] = useState<TabKeyEnum>(TabKeyEnum.realValue)

  useEffect(() => {
    if (!controllerValue || !houseValue || !areaValue) return
    getList({
      controller_id: Number(controllerValue),
      house_id: Number(houseValue),
      area_id: Number(areaValue),
    })
  }, [getList, controllerValue, houseValue, areaValue])

  //現在値・積算切替用
  return (
    <div className="h-full w-full overflow-hidden">
      <BaseSearchHeader
        className="max-w-screen-2xl"
        hideArea={tabKey === TabKeyEnum.realValue}
      />
      <Tabs
        onValueChange={(value) => setTabKey(value as TabKeyEnum)}
        // defaultValue={TabKeyEnum.realValue}
        defaultValue={TabKeyEnum.realValue}
        className="mt-2"
      >
        <TabsList>
          <TabsTrigger value={TabKeyEnum.realValue}>現在値</TabsTrigger>
          <TabsTrigger value={TabKeyEnum.addition}>積算</TabsTrigger>
          {/* <TabsTrigger value={TabKeyEnum.presentValue}>現在値2</TabsTrigger> */}
        </TabsList>
        <TabsContent value={TabKeyEnum.realValue}>
          <RealValuePage />
        </TabsContent>
        <TabsContent value={TabKeyEnum.addition}>
          <IntegrationClient />
        </TabsContent>
        {/* <TabsContent value={TabKeyEnum.presentValue}>
          <PresentValue />
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
