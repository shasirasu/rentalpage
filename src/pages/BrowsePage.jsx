import RentalCard from '../components/RentalCard'

function BrowsePage({ rentals, isLoading, error, savedIds, onToggleSaved }) {
  if (isLoading) {
    return (
      <section className="page-section state-page">
        <p className="eyebrow">Loading</p>
        <h2>Loading rentals...</h2>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page-section state-page">
        <p className="eyebrow">Error state</p>
        <h2>Could not load rentals</h2>
        <p className="muted">{error}</p>
      </section>
    )
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Browse</p>
        <h2>Available rentals</h2>
        <p className="muted">
          Compare local listings, then open a detail page to send an inquiry.
        </p>
      </div>

      <div className="rental-grid">
        {rentals.map((rental) => (
          <RentalCard
            key={rental.id}
            rental={rental}
            isSaved={savedIds.includes(rental.id)}
            onToggleSaved={onToggleSaved}
          />
        ))}
      </div>
    </section>
  )
}

export default BrowsePage
