import { Card } from '../components/Card'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'

const cards = [
  {
    label: 'Input',
    title: 'Give the AI the right product details',
    description:
      'Add the product name, materials, key features, audience, and preferred tone before generating a description.',
  },
  {
    label: 'Output',
    title: 'Create copy for different selling channels',
    description:
      'The app can return short bullets, polished paragraphs, or full ecommerce descriptions ready to edit and publish.',
  },
  {
    label: 'Use case',
    title: 'Support product pages, ads, and catalogs',
    description:
      'Use ProductDescriptionAi to draft descriptions for product listings, social ads, online stores, and catalog pages.',
  },
  {
    label: 'Benefit',
    title: 'Save time while keeping the brand voice',
    description:
      'It helps you write faster without losing clarity, making it easier to keep every product description consistent.',
  },
]

export function HomePage() {
  return (
    <main className="page-shell">
      <Navbar />

      <section className="page-content">
        <Hero />

        <section className="section-block importance-block">
          <div className="section-block__heading">
            <span className="section-block__kicker">Why it matters</span>
            <h2>Good product descriptions help people understand, trust, and buy.</h2>
            <p>
              A strong product description does more than describe an item. It answers
              common questions, highlights the benefits that matter, and gives a buyer
              confidence to click add to cart. ProductDescriptionAi is useful because
              it helps you create that kind of copy quickly, even when you have many
              products to write about or limited time to draft content manually.
            </p>
          </div>

          <div className="importance-grid">
            <article className="importance-card">
              <h3>Clearer buying decisions</h3>
              <p>
                When shoppers understand features, materials, and use cases right away,
                they are less likely to leave the page confused.
              </p>
            </article>
            <article className="importance-card">
              <h3>Stronger store presentation</h3>
              <p>
                Consistent product copy makes a brand look more professional across
                marketplaces, catalogs, and ecommerce pages.
              </p>
            </article>
            <article className="importance-card">
              <h3>Less writing time</h3>
              <p>
                Instead of starting from scratch for every item, the AI gives you a fast
                first draft that you can edit and refine.
              </p>
            </article>
          </div>
        </section>

        <section className="section-block process-block">
          <div className="section-block__heading">
            <span className="section-block__kicker">How it works</span>
            <h2>A simple flow from product details to polished description</h2>
            <p>
              The goal of ProductDescriptionAi is to reduce the work between raw product
              information and content that is ready for customers. That makes the app
              useful for quick drafts, repeated catalog work, and content teams that
              need a consistent output style.
            </p>
          </div>

          <div className="process-grid">
            <div className="process-step">
              <span>01</span>
              <h3>Enter product details</h3>
              <p>
                Add the item name, materials, size, audience, and any selling points you
                want the AI to emphasize.
              </p>
            </div>
            <div className="process-step">
              <span>02</span>
              <h3>Choose the tone</h3>
              <p>
                Pick a voice that matches your brand, from clean and professional to
                energetic and persuasive.
              </p>
            </div>
            <div className="process-step">
              <span>03</span>
              <h3>Review the result</h3>
              <p>
                Use the generated description as a strong starting point and refine it
                before publishing it on your store or listing.
              </p>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-block__heading">
            <span className="section-block__kicker">Core features</span>
            <h2>Built for product description generation</h2>
            <p>
              ProductDescriptionAi is a simple web app for turning product details into
              clean marketing copy. It is meant to show the full flow from input to
              output in a straightforward, easy-to-understand layout, so users can see
              how an AI tool can help shape product messaging from raw details into
              polished text.
            </p>
          </div>

          <div className="card-grid">
            {cards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </section>
      </section>

      <Footer />
    </main>
  )
}