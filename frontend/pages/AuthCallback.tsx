import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Loader } from '../components/ui'
import { getAuthRedirectPath, setStoredToken } from '../src/auth'

function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('Completing sign in...')

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      setMessage('Missing authentication token.')
      return
    }

    setStoredToken(token)
    navigate(getAuthRedirectPath(), { replace: true })
  }, [navigate, searchParams])

  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <section className="section-shell auth-shell">
          <div className="auth-card auth-card--centered">
            <Loader size={28} label={message} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default AuthCallback