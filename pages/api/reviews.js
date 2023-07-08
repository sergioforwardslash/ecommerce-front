import Review from "@/models/Review";
import { Op } from "sequelize";

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { title, description, stars, product } = req.body;
    const review = await Review.create({
      title,
      description,
      stars,
      product,
    });
    res.json(review);
  }

  if (req.method === "GET") {
    const { product } = req.query;
    const reviews = await Review.findAll({
      where: { product },
      order: [["createdAt", "DESC"]],
    });
    res.json(reviews);
  }
}
