import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

export function DashboardPage() {
  return (
    <main className="page-shell">
      <Navbar />

      <section className="page-content route-content route-content--centered">
        <span className="section-block__kicker">Dashboard</span>
        <h1>Generator workspace</h1>
        <p>
          This route is ready for the input form, generation history, and saved
          product descriptions.
        </p>
      </section>

      <Footer />
    </main>
  )
}