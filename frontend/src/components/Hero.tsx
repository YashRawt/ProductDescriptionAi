import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="hero-card">
      <div className="hero-card__glow hero-card__glow--left" aria-hidden="true" />
      <div className="hero-card__glow hero-card__glow--right" aria-hidden="true" />

      <div className="hero-card__content">
        <span className="hero-card__eyebrow">ProductDescriptionAi</span>
        <h1>Write product descriptions that sound clear, polished, and persuasive.</h1>
        <p>
          Turn a product name, a few features, and the right tone into ready-to-use
          copy for your store, landing page, or marketplace listing. It is designed
          to help small businesses, interns, and ecommerce teams write better copy
          faster.
        </p>

        <div className="hero-card__chips" aria-label="Product highlights">
          <span>Fast first drafts</span>
          <span>Brand tone control</span>
          <span>Shop-ready copy</span>
        </div>

        <div className="hero-card__actions">
          <Link to="/dashboard" className="button button--primary">
            Start generating
          </Link>
          <Link to="/about" className="button button--secondary">
            See how it works
          </Link>
        </div>
      </div>

      <div className="hero-card__panel" aria-hidden="true">
        <div className="hero-card__preview">
          <span className="hero-card__preview-label">Live preview</span>
          <p>
            Lightweight wireless earbuds with premium sound, long battery life, and a
            compact charging case for everyday use.
          </p>
        </div>

        <div className="hero-card__stat">
          <strong>SEO</strong>
          <span>optimized copy</span>
        </div>
        <div className="hero-card__stat">
          <strong>Fast</strong>
          <span>first draft generation</span>
        </div>
        <div className="hero-card__stat">
          <strong>Tone</strong>
          <span>friendly, premium, bold</span>
        </div>
      </div>
    </section>
  )
}