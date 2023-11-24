import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './modules/user/user.route'

const app: Application = express()

app.use(express.json())

app.use(cors())

app.use('/api/users', UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome here.',
  })
})

export default app
