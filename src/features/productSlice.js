import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    return await res.json();
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
