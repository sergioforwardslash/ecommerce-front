import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import WishedProduct from "@/models/WishedProduct";
import Product from "@/models/Product";

export default async function handle(req, res) {
  const { user } = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    const { product } = req.body;
    const wishedProduct = await WishedProduct.findOne({
      where: { userEmail: user.email, productId: product },
    });
    if (wishedProduct) {
      await WishedProduct.destroy({ where: { id: wishedProduct.id } });
      res.json({ wishedProduct });
    } else {
      await WishedProduct.create({ userEmail: user.email, productId: product });
      res.json("created");
    }
  }

  if (req.method === "GET") {
    const wishedProducts = await WishedProduct.findAll({
      where: { userEmail: user.email },
    });
    const wishedProductsDetailed = await Promise.all(
      wishedProducts.map(async (wp) => ({
        ...wp.toJSON(),
        product: await Product.findOne({ where: { id: wp.productId } }),
      }))
    );
    res.json(wishedProductsDetailed);
  }
}
