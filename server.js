import express from 'express'
import cors from 'cors'
import authRoutes from './backend/routes/authRoutes.js'
import healthRoutes from './backend/routes/healthRoutes.js'
import inquiryRoutes from './backend/routes/inquiryRoutes.js'
import rentalRoutes from './backend/routes/rentalRoutes.js'
import savedRentalRoutes from './backend/routes/savedRentalRoutes.js'

const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.json({
    status: 'ok',
    message: 'home page',
  })
})

app.use('/api', healthRoutes)
app.use('/api', rentalRoutes)
app.use('/api', inquiryRoutes)
app.use('/api', authRoutes)
app.use('/api', savedRentalRoutes)
 
app.listen(PORT, () => {
  console.log(`Rental Scout API running at http://localhost:${PORT}`)
})
