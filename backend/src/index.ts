import express from 'express'

import pizzaRoutes from './routes/pizzas.routes'
import userRoutes from './routes/users.routes'

const PORT = 3001	

const app = express()

app.use(express.json())

app.use('/api/pizzas', pizzaRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT)
console.log(`Server is running on port ${PORT}`)