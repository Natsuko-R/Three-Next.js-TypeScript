"use client"

import { useCallback } from "react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useIntegrationAddModal } from "@/components/common-3d-house/hooks/useIntegrationAddModal"
import { Box } from "@/components/custom-ui/box"

interface ModalProps {
  title: string
  innerContentStyle?: string
  className?: string
  children?: React.ReactNode
  isOpen: boolean
  onOpen?: () => void
  onClose?: () => void
}

export const Modal: React.FC<ModalProps> = ({
  title,
  className,
  innerContentStyle,
  children,
}) => {
  const { isOpen, onClose, onOpen } = useIntegrationAddModal()
  const handleOpenChange = useCallback(
    (openState: boolean) => {
      openState ? onOpen() : onClose()
    },
    [onClose, onOpen]
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={cn("max-w-[800px]", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Box className={cn("p-0 flex-col", innerContentStyle)}>{children}</Box>
      </DialogContent>
    </Dialog>
  )
}
