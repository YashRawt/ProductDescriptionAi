import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

export function AboutPage() {
  return (
    <main className="page-shell">
      <Navbar />

      <section className="page-content about-page">
        <section className="about-hero">
          <div className="about-hero__content">
            <span className="section-block__kicker">About ProductDescriptionAi</span>
            <h1>Built to help products sound clearer, stronger, and more convincing.</h1>
            <p>
              ProductDescriptionAi is a product description generator designed to turn
              basic item details into clean, ready-to-use marketing copy. It helps
              online sellers, interns, and small teams create better descriptions faster
              without starting from a blank page every time.
            </p>

            <div className="about-hero__highlights">
              <div>
                <strong>Faster writing</strong>
                <span>Generate descriptions in less time.</span>
              </div>
              <div>
                <strong>Better clarity</strong>
                <span>Explain features and benefits clearly.</span>
              </div>
              <div>
                <strong>Brand consistency</strong>
                <span>Keep every product description aligned.</span>
              </div>
            </div>
          </div>

          <aside className="about-profile" aria-label="Creator profile">
            <span className="about-profile__label">About Me</span>
            <h2>Yash Rawat</h2>
            <p>
              I am developing ProductDescriptionAi to help businesses automatically
              create accurate, attractive, and SEO-optimized product descriptions.
              The goal is to reduce manual effort and improve the efficiency of online
              product listings.
            </p>

            <ul className="about-profile__list">
              <li>
                <strong>Phone Number:</strong> 1234567890
              </li>
              <li>
                <strong>Github:</strong> <a href="https://github.com/yashrawt" target="_blank" rel="noopener noreferrer">Yash Rawat</a>
              </li>
              <li>
                <strong>Email:</strong> yashrawat@example.com
              </li>
              <li>
                <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/yash-rawt" target="_blank" rel="noopener noreferrer">Yash Rawat</a>
              </li>
            </ul>
          </aside>
        </section>

        <section className="section-block about-story">
          <div className="section-block__heading">
            <span className="section-block__kicker">Product story</span>
            <h2>Why this app matters</h2>
            <p>
              Many product fail because the description is too short, too generic, or too
              hard to read. This app is meant to solve that problem by helping users
              produce stronger descriptions with a simple, guided flow.
            </p>
          </div>

          <div className="about-story__grid">
            <article className="about-card">
              <h3>For small stores</h3>
              <p>
                It gives small businesses a quick way to make products look more
                professional without needing a dedicated copywriter.
              </p>
            </article>
            <article className="about-card">
              <h3>For busy teams</h3>
              <p>
                It helps teams move faster when there are many items to describe and
                limited time to write each page from scratch.
              </p>
            </article>
            <article className="about-card">
              <h3>Tone</h3>
              <p>
                It supports multiple tones so product descriptions stay aligned with the
                brand voice and feel more consistent.
              </p>
            </article>
          </div>
        </section>

        <section className="section-block about-purpose">
          <div className="section-block__heading">
            <span className="section-block__kicker">Mission</span>
            <h2>Make product descriptions easier to create and easier to read.</h2>
          </div>

          <div className="about-purpose__box">
            <p>
              The mission behind ProductDescriptionAi is simple: help people explain
              products more effectively. The app focuses on turning details into useful
              copy so products can be presented with more confidence and less effort.
            </p>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  )
}