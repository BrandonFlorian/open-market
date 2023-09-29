"use client";

import React from "react";
import { Text } from "@radix-ui/themes";
import type { products } from "@prisma/client";
import NextImage from "next/image";
import { IMAGE_BUCKET } from "@/types/constants";
import { formatPrice, lineClamp } from "@/lib/utils";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

type Props = {
  product: products;
};

const cardClass: string = "w-[320px] h-[100%] shadow-lg group";
const footerClass: string = "flex justify-between items-center";
const imageHoverClass: string =
  "group-hover:shadow-inner group-hover:scale-110 transition-all duration-150 ease-in-out  rounded-t-lg object-cover";
const cardHoverClass: string =
  " hover:scale-105 transition-all duration-150 ease-in-out glow-on-hover hover:shadow-xl";
const bottomSectionClass: string = "flex flex-col justify-between h-[40%] p-4";
const topSectionClass: string = "relative h-[60%] w-full";
const labelClass: string = "text-base font-small";
const titleClass: string = "text-lg font-semibold";
const descriptionClass: string = "text-sm text-gray-500";
export const ProductCard = (props: Props) => {
  const { product } = props;

  return (
    <Card
      isFooterBlurred
      className={`${cardClass} ${cardHoverClass}`}
      isPressable
    >
      <CardHeader className="absolute z-10 ">
        <Text className={titleClass}>{product.name}</Text>
      </CardHeader>
      {product.image_url && (
        <Image
          as={NextImage}
          src={`${IMAGE_BUCKET}/${product.image_url}`}
          alt={product.name}
          width={320}
          height={400}
          className={`${imageHoverClass}`}
        />
      )}
      <CardFooter className="absolute bottom-0 z-10 flex items-center justify-between w-full p-2 bg-black/60 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex items-center gap-2">
          <Text className={labelClass}>{product.name}</Text>
        </div>

        <Button radius="full" size="sm" color="success">
          <Text className={labelClass}>View</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
