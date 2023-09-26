import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import productsReducer from "./features/productSlice";
import categoriesReducer from "./features/categorySlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
  },
});
