import { useCallback } from "react"

import { Button } from "@/components/ui/button"
import { AlertModal } from '@/components/custom-ui/alert-modal'

interface SaveButtonProps {
  onSave: () => void
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  onSave,
}) => {
  const handleSave = useCallback(() => {
    onSave()
  }, [onSave])

  return (
    <div className="flex gap-2">
      <AlertModal
        title=""
        alertTitle="提交確認"
        description="本当に提交してよろしいですか？"
        cancelText="キャンセル"
        okText="確認"
        onOk={handleSave}
      >
        <Button>変更を保存して終了</Button>
      </AlertModal>
    </div>
  )
}
