import express, { Application, Request, Response } from 'express';
import { UserRouter } from './app/modules/user/user.router';
import cors from 'cors';

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', UserRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

export default app;
