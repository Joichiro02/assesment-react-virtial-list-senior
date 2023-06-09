import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import computeDiscount from "../helpers/computeDiscount";

export interface CartState {
  items: IProducts[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProducts>) => {
      state.items = [...state.items, action.payload];
    },

    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      console.log(action.payload.id);

      const index = state.items.findIndex(
        //@ts-ignore
        (item) => item.id === action.payload?.id
      );

      // ** create new copy of cart
      const newCart = [...state.items];

      if (index >= 0) {
        newCart.splice(index, 1);
      }

      state.items = newCart;
    },
  },
});

export const selectCartItems = (state: any) => state.cart.items;
export const selectCartItemsWithId = (state: any, id: number) =>
  state.cart.items.filter((item: any) => item.id === id);

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
