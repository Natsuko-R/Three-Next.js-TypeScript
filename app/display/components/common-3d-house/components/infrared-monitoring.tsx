"use client"

import { useCallback, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"

import useController from "@/hooks/use-controller"
import { Card } from "@/components/ui/card"
import { useCameraListStore } from "@/app/dashboard/farm-list/hooks/useCameraListStore"

export function InfraredMonitoring() {
  const { controllerValue } = useController()
  const router = useRouter()
  const { data, getData } = useCameraListStore()

  useEffect(() => {
    getData({ controller_id: Number(controllerValue) })
  }, [controllerValue, getData])

  const { link, camera_id } = useMemo(() => {
    return data && data.length !== 0
      ? data[0]
      : { link: "", camera_id: undefined }
  }, [data])

  const handleJumpToCamera = useCallback(() => {
    router.push(`/dashboard/camera/${camera_id}`)
  }, [camera_id])

  return (
    <Card
      className="mt-2 rounded-none border-0 bg-transparent cursor-pointer"
      onClick={handleJumpToCamera}
    >
      {link ? (
        <img
          src={link}
          alt=""
          className="h-auto w-full aspect-video object-fit"
        />
      ) : null}
    </Card>
  )
}
