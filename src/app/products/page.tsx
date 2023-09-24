import ProductCard from "@/components/custom/ProductCard";
import { PRODUCTS_ENDPOINT } from "@/types/constants";
import { products } from "@prisma/client";

const getProducts = async (): Promise<products[]> => {
  const res = await fetch(PRODUCTS_ENDPOINT);
  const data: products[] = await res.json();

  return data;
};

export default async function Products() {
  const products: products[] = await getProducts();
  console.log("products: ", products);
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
