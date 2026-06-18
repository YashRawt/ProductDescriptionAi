type CardProps = {
  title: string
  description: string
}

function Card({ title, description }: CardProps) {
  return (
    <article className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

export default Card
