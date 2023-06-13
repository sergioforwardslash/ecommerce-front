import Header from "@/components/Header";
import Featured from "@/components/Featured";
import Product from "@/models/Product";
import NewProducts from "@/components/NewProducts";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "640de2b12aa291ebdf213d48";
  const featuredProduct = await Product.findOne({
    where: { id: featuredProductId },
  });
  const newProducts = await Product.findAll({
    order: [["id", "DESC"]],
    limit: 10,
  });
  const serializedProducts = newProducts.map((product) => ({
    ...product.toJSON(),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }))
  return {
    props: {
      featuredProduct: featuredProduct ? featuredProduct.toJSON() : null,
      newProducts: serializedProducts,
    },
  };
}
