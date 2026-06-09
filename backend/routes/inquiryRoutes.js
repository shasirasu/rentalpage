import express from 'express'
import { inquiries, rentals } from '../data/store.js'

const router = express.Router()

router.get('/inquiries', (request, response) => {
  response.json(inquiries)
})

router.post('/inquiries', (request, response) => {
  const { rentalId, name, email, moveDate, message } = request.body

  if (!rentalId || !name || !email || !moveDate) {
    return response.status(400).json({
      message: 'Rental, name, email, and move-in date are required.',
    })
  }

  if (!email.includes('@')) {
    return response.status(400).json({
      message: 'Please enter a valid email address.',
    })
  }

  const rental = rentals.find((item) => item.id === rentalId)

  if (!rental) {
    return response.status(404).json({
      message: 'Rental not found.',
    })
  }

  const inquiry = {
    id: Date.now().toString(),
    rentalId,
    rentalTitle: rental.title,
    name,
    email,
    moveDate,
    message,
  }

  inquiries.push(inquiry)

  response.status(201).json({
    message: 'Inquiry received.',
    inquiry,
  })
})

export default router
