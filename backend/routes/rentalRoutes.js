import express from 'express'
import { rentals } from '../data/store.js'

const router = express.Router()

router.get('/rentals', (request, response) => {
  response.json(rentals)
})

router.get('/rentals/:id', (request, response) => {
  const rental = rentals.find((item) => item.id === request.params.id)

  if (!rental) {
    return response.status(404).json({
      message: 'Rental not found.',
    })
  }

  response.json(rental)
})

export default router
