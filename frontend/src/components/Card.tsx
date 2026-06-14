type CardProps = {
  title: string
  description: string
  label: string
}

export function Card({ title, description, label }: CardProps) {
  return (
    <article className="feature-card">
      <span className="feature-card__label">{label}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  )
}