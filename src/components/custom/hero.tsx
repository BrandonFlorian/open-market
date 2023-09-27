import React, { type FC } from "react";
import { Text } from "@radix-ui/themes";
import { Button } from "../ui/button";
import { IMAGE_BUCKET } from "@/types/constants";
type Props = {};

export const Hero: FC<Props> = (props: Props) => {
  return (
    <div
      className="relative flex flex-col justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${IMAGE_BUCKET}/header-bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <div>
          <Text className="text-5xl mb-4">Open Market</Text>
        </div>

        <Text className="text-3xl mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </Text>
      </div>
      <div className="relative z-10 flex flex-row justify-center space-x-4">
        <Button>Get Started</Button>
        <Button>Learn More</Button>
      </div>
    </div>
  );
};

export default Hero;
