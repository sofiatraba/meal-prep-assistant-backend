import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

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

const PORT: number = parseInt(process.env.PORT || '4000' , 10);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});