import express from 'express'
import { rentals, users } from '../data/store.js'
import { getPublicUser } from '../helpers/users.js'

const router = express.Router()

router.get('/users/:userId/saved-rentals', (request, response) => {
  const user = users.find((item) => item.id === request.params.userId)

  if (!user) {
    return response.status(404).json({
      message: 'User not found.',
    })
  }

  const savedRentals = rentals.filter((rental) =>
    user.savedRentalIds.includes(rental.id),
  )

  response.json({
    savedRentalIds: user.savedRentalIds,
    rentals: savedRentals,
  })
})

router.post('/users/:userId/saved-rentals', (request, response) => {
  const { rentalId } = request.body
  const user = users.find((item) => item.id === request.params.userId)
  const rental = rentals.find((item) => item.id === rentalId)

  if (!user) {
    return response.status(404).json({
      message: 'User not found.',
    })
  }

  if (!rental) {
    return response.status(404).json({
      message: 'Rental not found.',
    })
  }

  if (!user.savedRentalIds.includes(rentalId)) {
    user.savedRentalIds.push(rentalId)
  }

  response.json({
    message: 'Rental saved.',
    user: getPublicUser(user),
  })
})

router.delete('/users/:userId/saved-rentals/:rentalId', (request, response) => {
  const user = users.find((item) => item.id === request.params.userId)

  if (!user) {
    return response.status(404).json({
      message: 'User not found.',
    })
  }

  user.savedRentalIds = user.savedRentalIds.filter(
    (id) => id !== request.params.rentalId,
  )

  response.json({
    message: 'Rental removed from saved.',
    user: getPublicUser(user),
  })
})

export default router
