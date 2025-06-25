import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { connectToMongo } from './mongo';
import productRoutes from "./routes/product.route";
import testRoute from './routes/test.route'


const app = express();


const PORT = process.env.PORT || 4000;
app.use(cors());

const start = async () => {
  await connectToMongo(); // Connect to MongoDB
  app.use('/api/products', productRoutes);
  app.use(express.json()); // Middleware to parse JSON
  app.use("/api", productRoutes); // Route configuration
  app.use('/api', testRoute)

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

start();
export { app };