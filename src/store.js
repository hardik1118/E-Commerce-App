import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import productsReducer from "./features/productSlice";
import categoriesReducer from "./features/categorySlice";
import checkoutReducer from "./features/checkoutSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
    checkout: checkoutReducer,
  },
});
