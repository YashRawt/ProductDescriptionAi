import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Login() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <section className="page-shell">
          <div className="page-panel">
            <h1>Login</h1>
            <p>
              Add your sign-in form here so users can access saved product
              description workflows.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Login