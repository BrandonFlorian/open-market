"use client";
import React from "react";
import { Button } from "../ui/button";
import { products } from "@prisma/client";

type Props = {
  product: products;
};

export const ProductCard = (props: Props) => {
  const { product } = props;
  return (
    <div>
      <h1>{product.name}</h1>
      <Button>Test Button</Button>
    </div>
  );
};
export default ProductCard;
