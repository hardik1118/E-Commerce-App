import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const item = state.value.find(
        ({ product: prod }) => prod.id === product.id
      );
      if (item) {
        item.quantity += quantity;
      } else {
        state.value.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const { product } = action.payload;
      const index = state.value.findIndex(
        ({ product: prod }) => prod.id === product.id
      );
      if (index > -1) {
        const item = state.value[index];
        if (item.quantity === 1) {
          state.value.splice(index, 1);
        } else {
          item.quantity -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
