import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Button, Input, Toast } from '../components/ui'
import { api, getApiErrorMessage } from '../src/api'

function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState<'success' | 'info' | 'warning' | 'error'>('success')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim()) {
      setToastVariant('error')
      setToastMessage('Email is required.')
      setToastOpen(true)
      return
    }

    if (password.length < 8) {
      setToastVariant('error')
      setToastMessage('Password must be at least 8 characters long.')
      setToastOpen(true)
      return
    }

    if (password !== confirmPassword) {
      setToastVariant('error')
      setToastMessage('Passwords do not match.')
      setToastOpen(true)
      return
    }

    setIsSubmitting(true)
    try {
      const response = await api.register({ email, password })
      setToastVariant('success')
      setToastMessage(response.message || 'Account created successfully.')
      setToastOpen(true)
      setTimeout(() => navigate('/login'), 700)
    } catch (error: any) {
      setToastVariant('error')
      setToastMessage(getApiErrorMessage(error, 'Registration failed.'))
      setToastOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <section className="section-shell auth-shell">
          <div className="auth-card">
            <div className="auth-copy">
              <p className="eyebrow">Create account</p>
              <h1>Register to use saved descriptions and protected dashboards.</h1>
              <p>
                Create your workspace account, then sign in to manage generated copy, saved drafts, and protected routes.
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
                placeholder="At least 8 characters"
                autoComplete="new-password"
                required
              />
              <Input
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Repeat your password"
                autoComplete="new-password"
                required
              />

              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Creating account' : 'Register'}
              </Button>

              <p className="auth-switch">
                Already have an account? <Link to="/login">Login</Link>
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

export default Register