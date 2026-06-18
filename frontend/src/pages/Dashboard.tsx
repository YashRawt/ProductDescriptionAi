import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Dashboard() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <section className="page-shell">
          <div className="page-panel">
            <h1>Dashboard</h1>
            <p>
              This area can hold analytics, saved prompts, and product copy
              performance data.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard