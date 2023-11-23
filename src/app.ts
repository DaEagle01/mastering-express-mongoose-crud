import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(express.json())

app.use(cors())

const userRoutes = express.Router()

app.use('/api/users', userRoutes)

app.get('/api/users', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Here we master express and mongodb CRUD operations.',
    data: [
      { id: 1, name: 'Master' },
      { id: 2, name: 'Master 2' },
    ],
  })
})

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Here we master express and mongodb CRUD operations.',
  })
})

export default app
