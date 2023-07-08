import Header from "@/components/Header";
import Featured from "@/components/Featured";
import Product from "@/models/Product";
import NewProducts from "@/components/NewProducts";
import WishedProduct from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Setting from "@/models/Setting";

export default function HomePage({
  featuredProduct,
  newProducts,
  wishedNewProducts,
}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const featuredProductSetting = await Setting.findOne({
    where: { name: "featuredProductId" },
  });

  if (!featuredProductSetting) {
    console.error("Featured product setting not found");
    return { props: {}}
  }

  const featuredProductTitle = featuredProductSetting.value;
  const featuredProduct = await Product.findOne({ where: { title: featuredProductTitle } });

  if (!featuredProduct) {
    console.error(`No product with id ${featuredProductTitle} found`);
    return { props: {}}
  }

  const newProducts = await Product.findAll({
    order: [["id", "DESC"]],
    limit: 10,
  });

  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  const wishedNewProducts = session?.user
    ? await WishedProduct.findAll({
        where: {
          userEmail: session.user.email,
          productId: newProducts.map((p) => p.id.toString()),
        },
      })
    : [];

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
    },
  };
}
