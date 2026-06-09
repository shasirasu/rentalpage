import { Link } from 'react-router-dom'
import RentalCard from '../components/RentalCard'

function SavedPage({
  rentals,
  isLoading,
  error,
  savedIds,
  onToggleSaved,
  currentUser,
}) {
  const savedRentals = rentals.filter((rental) => savedIds.includes(rental.id))

  if (!currentUser) {
    return (
      <section className="page-section state-page">
        <p className="eyebrow">Login needed</p>
        <h2>Please login to see saved rentals</h2>
        <p className="muted">
          Saved rentals are private, so this page checks the current user first.
        </p>
        <Link className="button-link" to="/login">
          Login
        </Link>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className="page-section state-page">
        <p className="eyebrow">Loading</p>
        <h2>Loading saved rentals...</h2>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page-section state-page">
        <p className="eyebrow">Error state</p>
        <h2>Could not load saved rentals</h2>
        <p className="muted">{error}</p>
      </section>
    )
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Saved</p>
        <h2>Your saved rentals</h2>
      </div>

      {savedRentals.length === 0 && (
        <div className="empty-state">
          <h3>No saved rentals yet</h3>
          <p>
            This is the empty state. Later, this page can show rentals saved by
            the user.
          </p>
          <Link className="button-link" to="/">
            Browse rentals
          </Link>
        </div>
      )}

      {savedRentals.length > 0 && (
        <div className="rental-grid">
          {savedRentals.map((rental) => (
            <RentalCard
              key={rental.id}
              rental={rental}
              isSaved={savedIds.includes(rental.id)}
              onToggleSaved={onToggleSaved}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default SavedPage
