import express, { Application, Request, Response } from 'express'
import { UserRouter } from './app/modules/user/user.router';



const app: Application = express();


// application routes
app.use('/api', UserRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running')
})

export default app;
