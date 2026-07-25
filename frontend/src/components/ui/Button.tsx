import type { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * Props for the Button component.
 */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`ui-button ui-button--${variant} ui-button--${size} ${fullWidth ? 'ui-button--full' : ''} ${className}`.trim()}
      {...props}
    >
      {leftIcon ? <span className="ui-button__icon">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="ui-button__icon">{rightIcon}</span> : null}
    </button>
  )
}

export default Button