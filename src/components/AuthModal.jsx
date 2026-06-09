import { useState } from 'react'
import { apiUrl } from '../api'

function AuthModal({ onClose, onAuth }) {
  const [mode, setMode] = useState('login')
  const [formData, setFormData] = useState({
    name: '',
    email: 'student@example.com',
    password: 'password123',
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

      await onAuth(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-modal-backdrop">
      <section className="auth-modal" role="dialog" aria-modal="true">
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close login popup"
        >
          X
        </button>

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

        <form className="auth-form modal-auth-form" onSubmit={handleSubmit}>
          <div className="section-heading">
            <p className="eyebrow">Save rental</p>
            <h2>{isSignup ? 'Create account first' : 'Login to save'}</h2>
            <p className="muted">
              After this step, the rental will be saved to your account.
            </p>
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
              ? 'Please wait...'
              : isSignup
                ? 'Create and save'
                : 'Login and save'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default AuthModal
