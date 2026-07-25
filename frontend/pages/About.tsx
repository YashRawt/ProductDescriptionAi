import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <section className="about-section">
          <div className="about-shell">
            {/* Hero Block */}
            <div className="about-hero">
              <span className="about-badge">OUR MISSION</span>
              <h1 className="about-title">
                Empowering stores with <span className="highlight-text">AI copywriters</span>
              </h1>
              <p className="about-subtitle">
                We design tools that help e-commerce brands transform raw product parameters into conversion-focused, readable, and SEO-optimized copy in seconds.
              </p>
            </div>

            {/* Impact/Stats Grid */}
            <div className="about-stats-grid">
              <div className="about-stat-card">
                <span className="about-stat-value">10x</span>
                <span className="about-stat-label">Faster listing setup</span>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-value">3+</span>
                <span className="about-stat-label">Tailored tone styles</span>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-value">100%</span>
                <span className="about-stat-label">Consistent brand voice</span>
              </div>
            </div>

            {/* Content Cards Grid */}
            <div className="about-content-grid">
              <div className="about-content-card">
                <div className="about-card-icon">🎯</div>
                <h3>Conversion Focused</h3>
                <p>
                  Every generation prioritizes readability and copy frameworks (like AIDA) to hook buyers and drive sales.
                </p>
              </div>
              <div className="about-content-card">
                <div className="about-card-icon">⚡</div>
                <h3>Instant Workflow</h3>
                <p>
                  Skip draft block. Generate options immediately, refine inline, and save directly to your dashboard.
                </p>
              </div>
              <div className="about-content-card">
                <div className="about-card-icon">🌐</div>
                <h3>SEO Optimization</h3>
                <p>
                  Naturally incorporate key search parameters, features, and specs to help search engines crawl and rank listings.
                </p>
              </div>
            </div>

            {/* Tech Info Panel */}
            <div className="about-tech-panel">
              <div className="about-tech-info">
                <span className="about-badge-sm">THE SYSTEM</span>
                <h2>Behind the Generations</h2>
                <p>
                  Our application bridges the gap between raw database metrics and customer-friendly language. By combining modern Natural Language Processing (NLP) models with curated context templates, the system outputs high-quality descriptions tailored to your specific audience: whether they demand professional clarity, health-oriented safety details, or luxury style.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About