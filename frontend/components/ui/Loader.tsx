/**
 * Props for the Loader component.
 */
export type LoaderProps = {
  size?: number
  label?: string
}

function Loader({ size = 20, label = 'Loading' }: LoaderProps) {
  return (
    <span className="ui-loader" aria-label={label} role="status">
      <span className="ui-loader__spinner" style={{ width: size, height: size }} />
      <span className="ui-loader__text">{label}</span>
    </span>
  )
}

export default Loader