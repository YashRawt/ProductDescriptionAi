import type { ReactNode } from 'react'

/**
 * Props for the Model component.
 */
export type ModelProps = {
  open: boolean
  title: string
  description?: string
  children?: ReactNode
  onClose: () => void
}

function Model({ open, title, description, children, onClose }: ModelProps) {
  if (!open) {
    return null
  }

  return (
    <div className="ui-modal" role="presentation" onClick={onClose}>
      <div
        className="ui-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ui-modal__header">
          <div>
            <p className="ui-modal__eyebrow">Preview</p>
            <h3>{title}</h3>
            {description ? <p className="ui-modal__description">{description}</p> : null}
          </div>
          <button className="ui-modal__close" type="button" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <div className="ui-modal__body">{children}</div>
      </div>
    </div>
  )
}

export default Model