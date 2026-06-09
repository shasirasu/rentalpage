import express from 'express'

const router = express.Router()

router.get('/health', (request, response) => {
  response.json({
    status: 'ok',
    message: 'Rental Scout API is running',
  })
})

export default router
