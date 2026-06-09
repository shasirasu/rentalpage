import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiUrl } from '../api'

function AuthPage({ onAuth }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mode, setMode] = useState(
    location.pathname === '/signup' ? 'signup' : 'login',
  )
  const [formData, setFormData] = useState({
    name: '',
    email: mode === 'login' ? 'student@example.com' : '',
    password: mode === 'login' ? 'password123' : '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isSignup = mode === 'signup'

  function switchMode(nextMode) {
    setMode(nextMode)
    setError('')
    setFormData({
      name: '',
      email: nextMode === 'login' ? 'student@example.com' : '',
      password: nextMode === 'login' ? 'password123' : '',
    })
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch(apiUrl(`/${isSignup ? 'signup' : 'login'}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      onAuth(data.user)
      navigate('/saved')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={`auth-page ${isSignup ? 'auth-signup' : 'auth-login'}`}>
      <div className="auth-visual">
        <p className="eyebrow">{isSignup ? 'Start fresh' : 'Private access'}</p>
        <h2>
          {isSignup
            ? 'Create one account for saved rentals'
            : 'Login and continue your rental shortlist'}
        </h2>
        <p>
          {isSignup
            ? 'Signup creates a user in the backend memory for this practice step.'
            : 'Use the demo account or switch to signup if you want a new user.'}
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-tabs" aria-label="Auth mode">
          <button
            className={mode === 'login' ? 'active' : ''}
            type="button"
            onClick={() => switchMode('login')}
          >
            Login
          </button>
          <button
            className={mode === 'signup' ? 'active' : ''}
            type="button"
            onClick={() => switchMode('signup')}
          >
            Sign up
          </button>
        </div>

        <div className="section-heading">
          <p className="eyebrow">{isSignup ? 'Sign up' : 'Login'}</p>
          <h2>{isSignup ? 'Create your account' : 'Welcome back'}</h2>
        </div>

        {isSignup && (
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={isSignup ? 'Minimum 6 characters' : 'Password'}
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button className="button-link" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? isSignup
              ? 'Creating account...'
              : 'Logging in...'
            : isSignup
              ? 'Create account'
              : 'Login'}
        </button>
      </form>
    </section>
  )
}

export default AuthPage
