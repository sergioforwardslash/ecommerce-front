import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Product from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  const products = await Product.findAll({ order: [["id", "DESC"]] });
  return {
    props: {
      products: products.map((product) => {
        const productJson = product.toJSON();
        productJson.createdAt = productJson.createdAt.toISOString();
        productJson.updatedAt = productJson.updatedAt.toISOString();
        return productJson;
      }),
    },
  };
}
