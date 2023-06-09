// ** react imports
import React, { useEffect, useState } from "react";

// ** libraries imports
import Backdrop from "@mui/material/Backdrop";
import { Box, Fade, ImageList, Modal, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// ** local imports
import { selectCartItems } from "@/app/features/cartSlice";

interface IVIewItem {
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

export default function CartItem({ open, setOpen }: IVIewItem) {
  // ** state
  const [groupItemInCart, setGroupItemInCart] = useState([]);

  // ** redux methods
  const dispatch = useDispatch();

  // ** cart selectors
  const cartItems = useSelector(selectCartItems);

  // ** close modal
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // ** grouping of same id items
    const groupItem = cartItems.reduce((results: any, item: any) => {
      (results[item.id] = results[item.id] || []).push(item);

      return results;
    }, {});

    setGroupItemInCart(groupItem);
  }, [cartItems]);

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
        <Box sx={style}>
          <Typography
            color="black"
            id="transition-modal-title"
            variant="h4"
            component="h2"
            align="center"
          >
            Order List
          </Typography>
          <div className="text-black overflow-y-scroll h-80">
            <Stack>
              {Object.entries(groupItemInCart).map(([key, item]: any) => (
                <div className="flex items-center justify-between py-2 px-8 bg-gray-300 m-1">
                  <p>{item.length}x</p>
                  <p>{item[0].title}</p>
                  <p>{item[0].brand}</p>
                  <p>{item[0].price}</p>
                </div>
              ))}
            </Stack>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
