"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardFooter,
  CardContent,
  CardDescription,
  CardTitle,
} from "../ui/card";
import type { products } from "@prisma/client";
import { Label } from "../ui/label";
import Image from "next/image";
import { IMAGE_BUCKET } from "@/types/constants";
import { formatPrice, lineClamp } from "@/lib/utils";

type Props = {
  product: products;
};

const cardClass: string =
  "w-[320px] h-[400px] rounded-lg overflow-hidden shadow-lg group";
const footerClass: string = "flex justify-between items-center";
const imageHoverClass: string =
  "group-hover:shadow-inner group-hover:scale-110 transition-all duration-150 ease-in-out  rounded-t-lg object-cover";
const cardHoverClass: string =
  " hover:scale-105 transition-all duration-150 ease-in-out glow-on-hover hover:shadow-xl";
const bottomSectionClass: string = "flex flex-col justify-between h-[40%] p-4";
const topSectionClass: string = "relative h-[60%] w-full";
const labelClass: string = "text-base font-medium";
const titleClass: string = "text-lg font-semibold";
const descriptionClass: string = "text-sm text-gray-500";
export const ProductCard = (props: Props) => {
  const { product } = props;

  return (
    <Card className={`${cardClass} ${cardHoverClass}`}>
      <div className={topSectionClass}>
        {product.image_url && (
          <Image
            src={`${IMAGE_BUCKET}/${product.image_url}`}
            alt={product.name}
            fill={true}
            className={`${imageHoverClass}`}
          />
        )}
      </div>
      <div className={bottomSectionClass}>
        <CardContent>
          <CardTitle className={titleClass}>{product.name}</CardTitle>
          <CardDescription style={lineClamp(2)} className={descriptionClass}>
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className={footerClass}>
          <Label htmlFor="size" className={labelClass}>
            {formatPrice(Number(product.price))} USD
          </Label>
          <Button variant={"outline"}>View</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductCard;
