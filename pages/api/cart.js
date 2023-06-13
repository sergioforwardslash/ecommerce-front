import Product from "@models/Product";

export default async function handle(req, res) {
  const ids = req.body.ids;
  const products = await Product.findAll({
    where: {
      id: ids,
    },
  });
  res.json(products.map((product) => product.toJSON()));
}
