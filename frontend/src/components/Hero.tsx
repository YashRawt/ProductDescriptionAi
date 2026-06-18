import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">Ready To Create Heart Catching Product Descriptions</p>
          <h1>Generate product descriptions from product details and tone.</h1>
          <p>
            Product Description Ai turns your product keypoints into clear,
            attractive descriptions and supports tones like professional,
            health related, and luxury.
          </p>

          <div className="hero-actions">
            <a className="button-primary" href="#features">
              See tone options
            </a>
            <Link className="button-secondary" to="/dashboard">
              Open dashboard
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <span className="orb one" />
          <span className="orb two" />
          <div className="visual-card">
            <div className="visual-card-header">
              <span className="chip">
                <span className="chip-dot" />
                Live generation
              </span>
              <span className="chip">Ready in seconds</span>
            </div>

            <div className="prompt-box">
              <p className="prompt-label">Sample input</p>
              <p className="prompt-title">
                Waterproof material, lightweight build, fast charging, and a
                premium finish.
              </p>
            </div>

            <div className="prompt-metrics">
              <div className="metric">
                <strong>120+</strong>
                <span>templates</span>
              </div>
              <div className="metric">
                <strong>3x</strong>
                <span>faster workflow</span>
              </div>
              <div className="metric">
                <strong>24/7</strong>
                <span>content engine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
