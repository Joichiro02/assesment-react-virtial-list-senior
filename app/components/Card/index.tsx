// ** react and next imports
import React from "react";
import Image from "next/image";

// ** libraries imports
import { Card, Rating, Stack } from "@mui/material";

// ** local imports
import computeDiscount from "@/app/helpers/computeDiscount";

export default function index({ columnIndex, data, rowIndex, style }: any) {
  const item = data[rowIndex][columnIndex];
  if (!item?.title) return null;
  return (
    <Stack style={style}>
      <Card className="flex flex-col p-1 m-2 h-72 hover:scale-105 hover:cursor-pointer">
        <div className="relative flex h-44 items-center justify-center bg-gray-300">
          <Image
            src={item?.thumbnail}
            alt={item?.title}
            width={200}
            height={150}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
            loading="lazy"
          />
          <span className="absolute top-2 right-0 bg-orange-300 px-2">
            {item?.discountPercentage}%
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col m-1">
            <p className="font-bold text-sm capitalize">{item?.title}</p>
            <p className="space-x-2">
              <span className="line-through text-sm">${item?.price}</span>
              <span className="text-orange-500 text-base">
                ${computeDiscount(item?.price, item?.discountPercentage)}
              </span>
            </p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Rating
              name="read-only"
              value={item?.rating}
              readOnly
              size="small"
            />
            <span>{item?.rating}</span>
          </div>
        </div>
      </Card>
    </Stack>
  );
}
