"use client";
import React, { type FC } from "react";
import { Text } from "@radix-ui/themes";
import { IMAGE_BUCKET } from "@/types/constants";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";

type Props = {};

export const Hero: FC<Props> = (props: Props) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${IMAGE_BUCKET}/header-bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <motion.div
          variants={staggerContainer(2, 4)}
          initial="hidden"
          whileInView={"show"}
        >
          <motion.div variants={fadeIn("right", "tween", 0, 1)}>
            <div>
              <Text className="mb-4 text-5xl">Open Market</Text>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        variants={fadeIn("up", "tween", 0, 1)}
        initial="hidden"
        whileInView={"show"}
      >
        <Text className="mb-8 text-3xl">
          Deploy a fully functional accessible marketplace with ease
        </Text>

        <div className="relative z-10 flex flex-row justify-center space-x-4">
          <Button>Get Started</Button>
          <Button>Learn More</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
