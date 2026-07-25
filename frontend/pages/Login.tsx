import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Button, Input, Toast } from '../components/ui'
import { api, getApiErrorMessage } from '../src/api'
import { getAuthRedirectPath, setStoredToken } from '../src/auth'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState<'success' | 'info' | 'warning' | 'error'>('success')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setToastVariant('error')
      setToastMessage('Email and password are required.')
      setToastOpen(true)
      return
    }

    setIsSubmitting(true)
    try {
      const response = await api.login({ email, password })
      setStoredToken(response.access_token)
      setToastVariant('success')
      setToastMessage('Login successful. Redirecting...')
      setToastOpen(true)
      navigate(getAuthRedirectPath(), { replace: true })
    } catch (error: any) {
      setToastVariant('error')
      setToastMessage(getApiErrorMessage(error, 'Login failed.'))
      setToastOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.assign(api.getGoogleLoginUrl())
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <section className="section-shell auth-shell">
          <div className="auth-card">
            <div className="auth-copy">
              <p className="eyebrow">Welcome back</p>
              <h1>Login to manage your saved product descriptions.</h1>
              <p>
                Sign in with email and password, or use Google to jump back into your workspace.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
                autoComplete="current-password"
                required
              />

              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Signing in' : 'Login'}
              </Button>

              <Button type="button" variant="secondary" fullWidth onClick={handleGoogleLogin}>
                Continue with Google
              </Button>

              <p className="auth-switch">
                Need an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </section>
      </main>

      <Toast
        open={toastOpen}
        title="Product Description Ai"
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setToastOpen(false)}
      />
    </div>
  )
}

export default Login