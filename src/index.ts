import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes';

dotenv.config();
interface CustomError extends Error {
  status?: number;
}

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", recipeRoutes);

// Example Route
app.get('/', (req: Request, res: Response) => {
  res.send('Meal Prep API is running...');
});

// MongoDB Connection
const mongoUri: string = process.env.MONGO_URI || 'mongodb://localhost:27017/mealPrepAssistant';
mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: CustomError, req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
  });

const PORT: number = parseInt(process.env.PORT || '4000' , 10);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});