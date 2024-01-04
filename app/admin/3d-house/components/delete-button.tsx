import { useCallback } from "react"

import { Button } from "@/components/ui/button"
import { AlertModal } from '@/components/custom-ui/alert-modal'

interface DeleteButtonProps {
  onDelete: () => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
}) => {
  const handleDelete = useCallback(() => {
    onDelete()
  }, [onDelete])

  return (
    <div className="flex gap-2">
      <AlertModal
        title=""
        alertTitle="削除確認"
        description="本当に削除してよろしいですか？"
        cancelText="キャンセル"
        okText="確認"
        onOk={handleDelete}
      >
        <Button variant="destructive">削除</Button>
      </AlertModal>
    </div>
  )
}
