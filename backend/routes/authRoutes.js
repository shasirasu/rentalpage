import express from 'express'
import { users } from '../data/store.js'
import { getPublicUser } from '../helpers/users.js'

const router = express.Router()

router.post('/login', (request, response) => {
  const { email, password } = request.body

  if (!email || !password) {
    return response.status(400).json({
      message: 'Email and password are required.',
    })
  }

  const user = users.find(
    (item) => item.email === email && item.password === password,
  )

  if (!user) {
    return response.status(401).json({
      message: 'Invalid email or password.',
    })
  }

  response.json({
    message: 'Login successful.',
    user: getPublicUser(user),
  })
})

router.post('/signup', (request, response) => {
  const { name, email, password } = request.body

  if (!name || !email || !password) {
    return response.status(400).json({
      message: 'Name, email, and password are required.',
    })
  }

  if (!email.includes('@')) {
    return response.status(400).json({
      message: 'Please enter a valid email address.',
    })
  }

  if (password.length < 6) {
    return response.status(400).json({
      message: 'Password must be at least 6 characters.',
    })
  }

  const existingUser = users.find((item) => item.email === email)

  if (existingUser) {
    return response.status(409).json({
      message: 'An account with this email already exists.',
    })
  }

  const user = {
    id: Date.now().toString(),
    name,
    email,
    password,
    savedRentalIds: [],
  }

  users.push(user)

  response.status(201).json({
    message: 'Account created.',
    user: getPublicUser(user),
  })
})

export default router
