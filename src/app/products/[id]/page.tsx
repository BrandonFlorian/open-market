import { PRODUCTS_ENDPOINT } from "@/types/constants";
import { products } from "@prisma/client";

const getProduct = async (id: string): Promise<products> => {
  const res = await fetch(`${PRODUCTS_ENDPOINT}/?id=${id}`, {
    cache: "no-store",
  });
  const data: products = await res.json();

  return data;
};

export default async function Products({ params }: { params: { id: string } }) {
  const product: products = await getProduct(params.id);
  console.log("product: ", product);
  return (
    <div>
      <h1>Product</h1>
    </div>
  );
}
