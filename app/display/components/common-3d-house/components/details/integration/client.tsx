"use client"

import React, { useCallback, useMemo, useState } from "react"
import dayjs from "dayjs"

import useController from "@/hooks/use-controller"
import { Button } from "@/components/ui/button"

import { useDetailDataStore } from "../../../hooks/useDetailDataStore"
import { useIntegrationAddModal } from "../../../hooks/useIntegrationAddModal"
import { Addition_columns } from "../columns"
import { DataTable } from "../data-table"
import { IntegrationForm } from "./form"
import { Modal } from "./modal"

export const IntegrationClient = () => {
  const [curId, setCurId] = useState<number | undefined>()
  // const [mode, setMode] = useState<"add" | "edit">()

  const { controllerValue, houseValue, areaValue } = useController()
  const { data, delIntegration } = useDetailDataStore()
  const { isOpen, onOpen, onClose } = useIntegrationAddModal()

  const onSetting = useCallback(
    (id: number) => {
      onOpen()
      setCurId(id)
    },
    [onOpen]
  )

  const onDelete = useCallback(
    (initial_date: string) => {
      delIntegration({
        controller_id: Number(controllerValue),
        house_id: Number(houseValue),
        area_id: Number(areaValue),
        initial_date: dayjs(initial_date).format("YYYY-MM-DD"),
      })
    },
    [delIntegration]
  )

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const isEditing = useMemo(() => !!curId, [curId])

  const curData = useMemo(() => {
    return data?.find((item) => item.integrationId === curId) || null
  }, [curId, data])

  const handleOpen = useCallback(() => {
    onOpen()
    setCurId(undefined)
  }, [onOpen])

  return (
    <div>
      <DataTable
        columns={Addition_columns({
          onSetting,
          onDelete,
        })}
        data={data || []}
        mainHeader=""
        type={1}
      />
      <Button
        className="text-md text-center mt-2"
        variant="secondary"
        onClick={handleOpen}
      >
        設定を追加する
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose} title="設定を追加する">
        <IntegrationForm isEditing={isEditing} data={curData} />
      </Modal>
    </div>
  )
}
