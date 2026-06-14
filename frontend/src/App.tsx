import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { AboutPage } from './pages/AboutPage'
import { DashboardPage } from './pages/DashboardPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <main className="page-shell route-not-found">
              <Navbar />
              <section className="page-content route-content route-content--centered">
                <span className="section-block__kicker">404</span>
                <h1>Page not found</h1>
                <p>The page you requested does not exist.</p>
              </section>
              <Footer />
            </main>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
