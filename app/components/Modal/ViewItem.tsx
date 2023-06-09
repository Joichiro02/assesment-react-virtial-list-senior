// ** react imports
import React, { useState } from "react";

// ** libraries imports
import Backdrop from "@mui/material/Backdrop";
import { Box, Fade, ImageList, Modal, Stack, Typography } from "@mui/material";
import Image from "next/image";
import ImageListItem from "@mui/material/ImageListItem";
import computeDiscount from "@/app/helpers/computeDiscount";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectCartItemsWithId,
} from "@/app/features/cartSlice";

interface IVIewItem {
  data: IProducts;
  open: boolean;
  setOpen: (param: boolean) => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

export default function ViewItem({ data, open, setOpen }: IVIewItem) {
  // ** redux methods
  const dispatch = useDispatch();

  // ** cart selecter
  const items = useSelector((state) => selectCartItemsWithId(state, data.id));

  // ** state
  const [image, setImage] = useState<string>(data.thumbnail);

  // ** close modal
  const handleClose = () => {
    setOpen(false);
  };

  // ** select the image in grid
  const selectImage = (img: string) => {
    setImage(img);
  };

  // ** add item to cart
  const addItemToCart = () => {
    dispatch(addToCart(data));
  };

  // ** remove item to cart
  const removeItemToCart = () => {
    console.log(data.id);

    dispatch(removeFromCart({ id: data.id }));
  };

  // console.log("@@@", items);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style} position="relative">
          <Typography
            color="black"
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            {data.title}
          </Typography>
          <Stack display="flex" flexDirection="row" className="h-64 space-x-2">
            <Image
              src={image}
              alt={data?.title}
              width={300}
              height={150}
              style={{
                objectFit: "contain",
              }}
              loading="lazy"
            />
            <ImageList
              sx={{ width: "50%", height: "auto" }}
              cols={3}
              rowHeight={120}
            >
              {data.images.map((item) => (
                <ImageListItem key={item}>
                  <img
                    className="hover:cursor-pointer"
                    onClick={() => selectImage(item)}
                    style={{ objectFit: "contain", height: 120 }}
                    src={item}
                    srcSet={item}
                    alt={item}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Stack>
          <Typography
            color="black"
            id="transition-modal-description"
            sx={{ mt: 2 }}
          >
            {data.description}
          </Typography>
          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <p className="space-x-2">
              <span className="line-through text-sm text-gray-500">
                ${data.price}
              </span>
              <span className="text-orange-500 text-base">
                ${computeDiscount(data.price, data.discountPercentage)}
              </span>
            </p>
            <span className="text-black text-base">Stocks: {data.stock}</span>
          </Stack>
          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <p className="space-x-2">
              <span className="text-black text-base capitalize">
                Brand: {data.brand}
              </span>
            </p>
            <span className="text-black text-base capitalize">
              Category: {data.category}
            </span>
          </Stack>
          <div className="absolute top-4 right-4 space-x-3">
            <button
              onClick={removeItemToCart}
              className={` ${
                !items.length ? "bg-gray-600" : "bg-blue-600"
              } p-2 rounded-md ${!items.length ? null : "hover:bg-blue-400"}`}
              disabled={!items.length}
            >
              Remove to Cart
            </button>
            <button
              onClick={addItemToCart}
              className=" bg-blue-600 p-2 rounded-md hover:bg-blue-400"
            >
              Add to Cart
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
