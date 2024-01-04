import { useCallback } from "react"

import { Button } from "@/components/ui/button"
import {AlertModal} from '@/components/custom-ui/alert-modal'

interface AdditionButtonsProps {
  onSetting: () => void
  onDelete: () => void
}

export const AdditionButtons: React.FC<AdditionButtonsProps> = ({
  onSetting,
  onDelete,
}) => {
  const handleDelete = useCallback(() => {
    onDelete()
  }, [onDelete])

  const handleSetting = useCallback(() => {
    onSetting()
  }, [onSetting])

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        className="text-center p-2 h-8 text-xs"
        onClick={handleSetting}
      >
        設定
      </Button>
      <AlertModal
        title=""
        alertTitle="積算情報削除"
        description="削除してよろしいですか？"
        cancelText="キャンセル"
        okText="確認"
        onOk={handleDelete}
      >
      <Button
        size="sm"
        variant="destructive"
        className="text-center p-2 h-8 text-xs"
      >
        削除
      </Button>
      </AlertModal>

    </div>
  )
}
