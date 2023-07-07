import Review from "@/models/Review";
import { Op } from "sequelize";

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { title, description, stars, product } = req.body;
    const review = await Review.create({
      title,
      description,
      stars,
      productId: product,
    });
    res.json(review);
  }

  if (req.method === "GET") {
    const { product } = req.query;
    const reviews = await Review.findAll({
      where: { productId: product },
      order: [["createdAt", "DESC"]],
    });
    res.json(reviews);
  }
}
