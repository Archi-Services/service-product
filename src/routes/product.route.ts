import { Router, Request, Response } from "express";
import { getProducts } from "../controllers/product.controller";
import Product from "../models/product.model";
import { redisClient } from "../redis";

const router = Router();

// Route : Liste complète des produits
router.get("/", getProducts);

// Route : Recherche de produits
router.get("/search", async (req: Request, res: Response) => {
  const query = (req.query.q as string)?.toLowerCase();

  if (!query) {
    return res.status(400).json({ error: "Le paramètre 'q' est requis." });
  }

  try {
    // Tente d'abord Redis
    const cached = await redisClient.get("products:all");
    let products;

    if (cached) {
      products = JSON.parse(cached);
    } else {
      products = await Product.find();
      await redisClient.set("products:all", JSON.stringify(products), {
        EX: 3600, // cache pendant 1h
      });
    }

    // Filtrage des produits
    const filtered = products.filter((p: any) =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur lors de la recherche." });
  }
});

console.log("✅ Product route initialized");

export default router;
