"use client";
// ** react imports
import React, { useState } from "react";

// ** libraries imports
import { FixedSizeGrid as Grid } from "react-window";
import { useQuery } from "react-query";

// ** local imports
import Card from "../components/Card/CardItem";
import ProductServices from "../services/api/ProductServices";

export default function List() {
  // ** states
  const [products, setProducts] = useState<IProducts[]>([]);

  // ** api
  const { getProducts } = ProductServices();

  // ** fetching the products
  const { isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
    onSuccess: (data: any) => {
      const arr = data?.data?.products;
      const newArr = [];
      while (arr.length) {
        newArr.push(arr.splice(0, 6));
      }
      setProducts(newArr);
    },
  });

  if (isLoading) return null;

  return (
    <Grid
      useIsScrolling
      columnCount={6}
      columnWidth={(window.innerWidth - 20) / 6}
      height={window.innerHeight - 70}
      rowCount={products.length}
      rowHeight={window.innerHeight / 2.3}
      width={window.innerWidth}
      itemData={products}
    >
      {Card}
    </Grid>
  );
}
