import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiUrl } from '../api'

function RentalDetailPage({ savedIds, onToggleSaved, currentUser }) {
  const { rentalId } = useParams()
  const isSaved = savedIds.includes(rentalId)
  const [rental, setRental] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    moveDate: '',
    message: '',
  })
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function loadRental() {
      try {
        const response = await fetch(apiUrl(`/rentals/${rentalId}`))

        if (!response.ok) {
          throw new Error('Rental not found.')
        }

        const data = await response.json()
        setRental(data)
      } catch (err) {
        setLoadError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadRental()
  }, [rentalId])

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

    if (!formData.name.trim() || !formData.email.trim() || !formData.moveDate) {
      setError('Please fill name, email, and move-in date.')
      setIsSubmitted(false)
      setIsSubmitting(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.')
      setIsSubmitted(false)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(apiUrl('/inquiries'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rentalId: rental.id,
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      setError('')
      setIsSubmitted(true)
    } catch (err) {
      setError(err.message)
      setIsSubmitted(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <section className="page-section state-page">
        <p className="eyebrow">Loading</p>
        <h2>Loading rental...</h2>
      </section>
    )
  }

  if (loadError) {
    return (
      <section className="page-section state-page">
        <p className="eyebrow">Error state</p>
        <h2>Rental not found</h2>
        <p className="muted">{loadError}</p>
        <Link className="button-link" to="/">
          Back to browse
        </Link>
      </section>
    )
  }

  return (
    <section className="detail-layout">
      <img className="detail-image" src={rental.image} alt={rental.title} />

      <div className="detail-panel">
        <p className="eyebrow">{rental.neighborhood}</p>
        <h2>{rental.title}</h2>
        <p className="price">Rs. {rental.rent.toLocaleString('en-IN')} / month</p>
        <p>{rental.description}</p>

        <div className="tag-row">
          {rental.highlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>

        <Link className="button-link" to="/">
          Back to browse
        </Link>
        <button
          className="secondary-button detail-save"
          type="button"
          onClick={() => onToggleSaved(rental.id)}
        >
          {isSaved ? 'Remove from saved' : 'Save this rental'}
        </button>
        {!currentUser && (
          <p className="save-note">Login first to save this rental.</p>
        )}
      </div>

      <div className="map-panel">
        <div className="section-heading">
          <p className="eyebrow">Location</p>
          <h2>Map view</h2>
          <p className="muted">{rental.address}</p>
        </div>
        <iframe
          title={`${rental.title} map`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            rental.mapQuery,
          )}&output=embed`}
          loading="lazy"
        />
      </div>

      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="section-heading">
          <p className="eyebrow">Inquiry</p>
          <h2>Apply for this rental</h2>
        </div>

        <label>
          Your name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>

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
          Move-in date
          <input
            type="date"
            name="moveDate"
            value={formData.moveDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell the owner what you are looking for"
            rows="4"
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        {isSubmitted && (
          <p className="form-success">
            Success. Thanks, {formData.name}. Your inquiry for {rental.title} is
            ready in the frontend app.
          </p>
        )}

        <button className="button-link" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send inquiry'}
        </button>
      </form>
    </section>
  )
}

export default RentalDetailPage
