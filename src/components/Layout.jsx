import { NavLink } from 'react-router-dom'

function Layout({ children, savedCount, currentUser, onLogout }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Rental Scout</p>
          <h1>Find a short list of rental homes</h1>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/">Browse</NavLink>
          <NavLink to="/saved">Saved ({savedCount})</NavLink>
          <NavLink to="/about">About</NavLink>
          {currentUser ? (
            <button className="nav-button" type="button" onClick={onLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </header>

      <main>{children}</main>
    </div>
  )
}

export default Layout
