import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(express.json())

app.use(cors())

const userRoutes = express.Router()

app.use('/api/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Here we master express and mongodb CRUD operations.',
  })
})

export default app
