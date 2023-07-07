import Product from "@/models/Product";
import { Op } from "sequelize";

export default async function handle(req, res) {
  const { categories, sort, phrase, ...filters } = req.query;
  let [sortField, sortOrder] = (sort || "id-desc").split("-");

  const productsQuery = {};
  if (categories) {
    productsQuery.category = { [Op.in]: categories.split(",") };
  }
  if (phrase) {
    productsQuery[Op.or] = [
      { title: { [Op.like]: `%${phrase}%` } },
      { description: { [Op.like]: `%${phrase}%` } },
    ];
  }
  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      productsQuery[`properties.${filterName}`] = filters[filterName];
    });
  }
  console.log(productsQuery);

  const products = await Product.findAll({
    where: productsQuery,
    order: [[sortField, sortOrder]],
  });

  res.json(products);
}
