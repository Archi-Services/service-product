import { app } from "./app"; // Vérifiez que app.ts exporte correctement Express
import { connectToMongo } from "./mongo"; // Vérifiez que mongo.ts exporte connectToMongo
import { redisClient } from "./redis"; // Vérifiez que redis.ts exporte redisClient

const PORT = process.env.PORT || 4000;

const start = async () => {
  await connectToMongo();
  await redisClient.connect();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

start();
