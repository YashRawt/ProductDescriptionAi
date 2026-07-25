import { useEffect } from 'react'

/**
 * Props for the Toast component.
 */
export type ToastProps = {
  open: boolean
  title: string
  message: string
  variant?: 'success' | 'info' | 'warning' | 'error'
  duration?: number
  onClose: () => void
}

function Toast({
  open,
  title,
  message,
  variant = 'success',
  duration = 2800,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    const timeoutId = window.setTimeout(onClose, duration)
    return () => window.clearTimeout(timeoutId)
  }, [duration, onClose, open])

  if (!open) {
    return null
  }

  return (
    <div className={`ui-toast ui-toast--${variant}`} role="status" aria-live="polite">
      <div>
        <strong className="ui-toast__title">{title}</strong>
        <p className="ui-toast__message">{message}</p>
      </div>
      <button className="ui-toast__close" type="button" onClick={onClose} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  )
}

export default Toast