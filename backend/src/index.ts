import express from 'express'
import 'tsconfig-paths/register';

import pizzaRoutes from '@/api/pizzas/pizzas.routes'
import userRoutes from '@/api/users/users.routes'
import authRoutes from '@/api/auth/auth.routes'

const PORT = 3001	

const app = express()

app.use(express.json())

app.use('/api/pizzas', pizzaRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT)
console.log(`Server is running on port ${PORT}`)