import express, { Application, Request, Response } from 'express';
import { UserRouter } from './app/modules/user/user.router';
import cors from 'cors';

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', UserRouter);

// root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    "success": true,
    "message": "Server is running!"
  });
});

// error routes
app.get('*', (req: Request, res: Response) => {
  res.status(200).json({
    "success": false,
    "message": "Route not found",
    "error": {
      "code": 404,
      "description": `${req.params["0"]} route not found`
    }
  });
});

export default app;
