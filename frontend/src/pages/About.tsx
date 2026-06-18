import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function About() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <section className="page-shell">
          <div className="page-panel">
            <h1>About</h1>
            <p>
              This page can describe the mission, workflow, and benefits of the
              Product Description Ai experience.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About