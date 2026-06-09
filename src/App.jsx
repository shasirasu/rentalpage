import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AuthModal from './components/AuthModal'
import BrowsePage from './pages/BrowsePage'
import SavedPage from './pages/SavedPage'
import RentalDetailPage from './pages/RentalDetailPage'
import AboutPage from './pages/AboutPage'
import AuthPage from './pages/AuthPage'
import { apiUrl } from './api'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('rentalScoutUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [savedIds, setSavedIds] = useState(currentUser?.savedRentalIds || [])
  const [rentals, setRentals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [pendingSaveId, setPendingSaveId] = useState('')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  useEffect(() => {
    async function loadRentals() {
      try {
        const response = await fetch(apiUrl('/rentals'))

        if (!response.ok) {
          throw new Error('Could not load rentals.')
        }

        const data = await response.json()
        setRentals(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadRentals()
  }, [])

  async function saveRentalForUser(user, rentalId, isRemoving) {
    const url = isRemoving
      ? apiUrl(`/users/${user.id}/saved-rentals/${rentalId}`)
      : apiUrl(`/users/${user.id}/saved-rentals`)

    const response = await fetch(url, {
      method: isRemoving ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: isRemoving ? undefined : JSON.stringify({ rentalId }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    setSavedIds(data.user.savedRentalIds)
    setCurrentUser(data.user)
    localStorage.setItem('rentalScoutUser', JSON.stringify(data.user))
  }

  async function toggleSaved(rentalId) {
    if (!currentUser) {
      setPendingSaveId(rentalId)
      setIsAuthModalOpen(true)
      return
    }

    const isSaved = savedIds.includes(rentalId)

    try {
      await saveRentalForUser(currentUser, rentalId, isSaved)
    } catch (err) {
      window.alert(err.message)
    }
  }

  function handleLogin(user) {
    setCurrentUser(user)
    setSavedIds(user.savedRentalIds || [])
    localStorage.setItem('rentalScoutUser', JSON.stringify(user))
  }

  async function handleModalAuth(user) {
    handleLogin(user)

    if (pendingSaveId) {
      await saveRentalForUser(user, pendingSaveId, false)
    }

    setPendingSaveId('')
    setIsAuthModalOpen(false)
  }

  function handleLogout() {
    setCurrentUser(null)
    setSavedIds([])
    localStorage.removeItem('rentalScoutUser')
  }

  return (
    <Layout
      savedCount={savedIds.length}
      currentUser={currentUser}
      onLogout={handleLogout}
    >
      <Routes>
        <Route
          path="/"
          element={
            <BrowsePage
              rentals={rentals}
              isLoading={isLoading}
              error={error}
              savedIds={savedIds}
              onToggleSaved={toggleSaved}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/saved"
          element={
            <SavedPage
              rentals={rentals}
              isLoading={isLoading}
              error={error}
              savedIds={savedIds}
              onToggleSaved={toggleSaved}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/rentals/:rentalId"
          element={
            <RentalDetailPage
              savedIds={savedIds}
              onToggleSaved={toggleSaved}
              currentUser={currentUser}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<AuthPage onAuth={handleLogin} />} />
        <Route path="/signup" element={<AuthPage onAuth={handleLogin} />} />
      </Routes>
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onAuth={handleModalAuth}
        />
      )}
    </Layout>
  )
}

export default App
