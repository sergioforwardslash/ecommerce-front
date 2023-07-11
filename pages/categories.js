import Header from "@/components/Header";
import Center from "@/components/Center";
import Category from "@/models/Category";
import Product from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import styled from "styled-components";
import Link from "next/link";
import { RevealWrapper } from "next-reveal";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import WishedProduct from "@/models/WishedProduct";

// Styles
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  text-decoration: none;
`;

// Component
export default function CategoriesPage({
  mainCategories,
  categoriesProducts,
  wishedProducts = [],
}) {
  return (
    <>
      <Header />
      <Center>
        {mainCategories.map((cat) => (
          <CategoryWrapper key={cat.id}>
            <CategoryTitle>
              <h2>{cat.name}</h2>
              <Link href={"/category/" + cat.id}>Show all</Link>
            </CategoryTitle>
            <CategoryGrid>
              {categoriesProducts[cat.id].map((p, index) => (
                <RevealWrapper key={p.id} delay={index * 50}>
                  <ProductBox {...p} wished={wishedProducts.includes(p.id)} />
                </RevealWrapper>
              ))}
              <RevealWrapper delay={categoriesProducts[cat.id].length * 50}>
                <ShowAllSquare href={"/category/" + cat.id}>
                  Show all &rarr;
                </ShowAllSquare>
              </RevealWrapper>
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
    </>
  );
}

// Server-side data fetching
export async function getServerSideProps(ctx) {
  // Fetch all categories
  const categories = await Category.findAll();

  // Filter out only main categories (without a parent)
  const mainCategories = categories.filter((c) => !c.parent);

  const categoriesProducts = {}; // Dictionary mapping category ID to its products
  const allFetchedProductsId = []; // List of all fetched product IDs

  // For each main category
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat.id.toString();

    // Find all children categories of the current main category
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c.id.toString());

    // Combine IDs of the main and its children categories
    const categoriesIds = [mainCatId, ...childCatIds];

    // Fetch products of these categories (limited to 3, sorted by ID in descending order)
    const products = await Product.findAll({
      where: { categoryId: categoriesIds },
      limit: 3,
      order: [["id", "DESC"]],
    });

    // Update the dictionary and the list of all fetched product IDs
    categoriesProducts[mainCat.id] = products;
    allFetchedProductsId.push(...products.map((p) => p.id.toString()));
  }

  // Fetch the user session
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  // Fetch wished products of the current user (if logged in)
  const wishedProducts = session?.user
    ? await WishedProduct.findAll({
        where: {
          userEmail: session?.user.email,
          productId: allFetchedProductsId,
        },
      })
    : [];

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map((i) => i.productId.toString()),
    },
  };
}
