import { Link } from 'react-router-dom'

function RentalCard({ rental, isSaved, onToggleSaved }) {
  return (
    <article className="rental-card">
      <img src={rental.image} alt={rental.title} />
      <div className="card-body">
        <p className="muted">{rental.neighborhood}</p>
        <h3>{rental.title}</h3>
        <p>
          Rs. {rental.rent.toLocaleString('en-IN')} / month | {rental.bedrooms}{' '}
          bed | {rental.type}
        </p>
        <Link className="button-link" to={`/rentals/${rental.id}`}>
          View details
        </Link>
        <button id='REMOVE'
          className="secondary-button"
          type="button"
          onClick={() => onToggleSaved(rental.id)}
        >
          {isSaved ? 'Remove saved' : 'Save rental'}
        </button>
      </div>
    </article>
  )
}

export default RentalCard
