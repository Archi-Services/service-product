import Product from "../models/product.model";
import { redisClient } from "../redis";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const cacheKey = "products:all";
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      console.log("🧠 Products from Redis");
      return res.json(JSON.parse(cached));
    }

    const products = await Product.find();
    await redisClient.set("products:all", JSON.stringify(products), {
      EX: 600
    })
    await redisClient.set(cacheKey, JSON.stringify(products), { EX: 60 * 10 }); // expire in 10 min

    console.log("🧠 Products from MongoDB");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
