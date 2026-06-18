import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

const workflowSteps = [
  {
    title: 'Add product context',
    description:
      'Start with a short product name, key features, and any brand details that should shape the tone.',
  },
  {
    title: 'Choose the style',
    description:
      'Pick a copy direction such as professional, health related, or luxury so the wording matches the audience.',
  },
  {
    title: 'Refine the draft',
    description:
      'Review the generated description and adjust the structure, length, or emphasis before publishing it.',
  },
]

const comparisonPoints = [
  'Built for product teams that need fast copy without starting from scratch.',
  'Helps keep descriptions consistent across multiple product categories and tones.',
  'Makes it easier to turn raw feature lists into customer-ready marketing language.',
]

const trustStats = [
  { value: '120+', label: 'description templates' },
  { value: '3', label: 'tone styles highlighted' },
  { value: '24/7', label: 'copy generation support' },
  { value: '1 workflow', label: 'for product teams' },
]

const featureCards = [
  {
    title: 'Professional',
    description:
      'Write clean and confident product descriptions for business, office, and B2B products using the given keypoints.',
  },
  {
    title: 'Health related',
    description:
      'Generate calm and trustworthy descriptions for wellness, fitness, and care items with the right tone.',
  },
  {
    title: 'Luxury',
    description:
      'Create elegant and premium copy for high-end products that needs a refined brand feel.',
  },
  {
    title: 'Key-point based',
    description:
      'Turn simple product keypoints into a full description with a consistent and readable structure.',
  },
]

function Home() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <Hero />

        <section className="section-shell" id="features">
          <div className="section-heading">
            <h2>Turn product keypoints into tone-aware descriptions.</h2>
            <p>
              Choose a tone for each product and generate descriptions that fit
              the audience, category, and brand style.
            </p>
          </div>

          <div className="card-grid">
            {featureCards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </section>

        <section className="section-shell" id="workflow">
          <div className="section-heading">
            <h2>How the workflow fits together.</h2>
            <p>
              The experience is designed to move from rough product notes to a polished description with a few
              clear steps.
            </p>
          </div>

          <div className="workflow-grid">
            {workflowSteps.map((step, index) => (
              <article key={step.title} className="workflow-card">
                <span className="workflow-card__index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="comparison">
          <div className="comparison-panel">
            <div className="comparison-copy">
              <p className="eyebrow">Why it matters</p>
              <h2>Designed to make product copy faster to create and easier to review.</h2>
              <p>
                When product catalogs grow, manual writing becomes repetitive. This experience gives you a repeatable
                structure for producing descriptions that are readable, consistent, and tailored to the intended tone.
              </p>
            </div>

            <ul className="comparison-list">
              {comparisonPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-shell" id="trust">
          <div className="section-heading">
            <h2>Useful for teams that ship frequently.</h2>
            <p>
              The landing page now explains the product more fully, with a clearer path from value proposition to
              workflow to supporting details.
            </p>
          </div>

          <div className="trust-grid">
            <div className="trust-panel">
              <h3>What the product helps with</h3>
              <p>
                It gives marketers and store owners a simple way to convert scattered feature notes into useful copy
                that can be reviewed and published faster.
              </p>
            </div>

            <div className="stats-grid">
              {trustStats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="cta">
          <div className="cta-panel">
            <div>
              <p className="eyebrow">Next step</p>
              <h2>Explore the demo page to see the reusable UI components in action.</h2>
              <p>
                The demo route now contains the interactive button, input, modal, toast, and loader components so you
                can test the shared building blocks separately from the landing page.
              </p>
            </div>

            <Link className="button-primary" to="/demo">
              Open the demo page
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home