import { useCallback, useRef, useState } from 'react'

import type { ConfirmDialogProps } from './ConfirmDialog'

export interface ConfirmDialogOptions {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
}

export const useConfirmDialog = () => {
  const [options, setOptions] = useState<ConfirmDialogOptions | null>(null)
  const resolveRef = useRef<((confirmed: boolean) => void) | null>(null)

  const showConfirmDialog = useCallback(
    (nextOptions: ConfirmDialogOptions) =>
      new Promise<boolean>((resolve) => {
        resolveRef.current = resolve
        setOptions(nextOptions)
      }),
    []
  )

  const close = (confirmed: boolean) => {
    resolveRef.current?.(confirmed)
    resolveRef.current = null
    setOptions(null)
  }

  const confirmDialogProps: ConfirmDialogProps | null = options && {
    ...options,
    onConfirm: () => close(true),
    onCancel: () => close(false),
  }

  return { showConfirmDialog, confirmDialogProps }
}
