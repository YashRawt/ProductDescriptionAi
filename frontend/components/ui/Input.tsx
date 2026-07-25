import type { InputHTMLAttributes } from 'react'

/**
 * Props for the Input component.
 */
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
}

function Input({ label, hint, error, id, className = '', ...props }: InputProps) {
  const inputId = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, '-')
  const helperText = error ?? hint

  return (
    <label className="ui-field" htmlFor={inputId}>
      {label ? <span className="ui-field__label">{label}</span> : null}
      <input
        id={inputId}
        className={`ui-input ${error ? 'ui-input--error' : ''} ${className}`.trim()}
        {...props}
      />
      {helperText ? (
        <span className={`ui-field__help ${error ? 'ui-field__help--error' : ''}`}>
          {helperText}
        </span>
      ) : null}
    </label>
  )
}

export default Input