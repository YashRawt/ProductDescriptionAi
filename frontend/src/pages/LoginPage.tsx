import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

export function LoginPage() {
  return (
    <main className="page-shell">
      <Navbar />

      <section className="page-content route-content route-content--centered">
        <span className="section-block__kicker">Login</span>
        <h1>Account access</h1>
        <p>
          This placeholder page can later hold sign-in and sign-up flows for saved
          descriptions and team access.
        </p>
      </section>

      <Footer />
    </main>
  )
}