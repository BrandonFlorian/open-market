import ProductCard from "@/components/custom/ProductCard";
import { PRODUCTS_ENDPOINT } from "@/types/constants";
import { products as ProductType } from "@prisma/client";
import { Grid } from "@radix-ui/themes";
const getProducts = async (): Promise<ProductType[]> => {
  try {
    const res = await fetch(PRODUCTS_ENDPOINT);
    const data: ProductType[] = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const gridClass: string =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";
const centeredGrid: string = "flex justify-center";
const h1Class: string = "text-4xl font-semibold mb-6";

export default async function Products() {
  const products: ProductType[] = await getProducts();

  return (
    <div className="flex flex-col items-center ">
      <h1 className={h1Class}>Products</h1>
      <Grid
        columns={{
          initial: "1",
          xs: "1",
          sm: "1",
          md: "2",
          lg: "3",
          xl: "3",
        }}
        gap="6"
        width="auto"
        justify={"center"}
        align={"center"}
      >
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Grid>
      <div className={`${gridClass} ${centeredGrid}`}></div>
    </div>
  );
}
