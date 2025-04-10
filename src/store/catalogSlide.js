// store/catalogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCatalogProducts } from "../service/CatalogServices";

// Acción async para cargar los productos del catálogo
export const fetchCatalogProducts = createAsyncThunk(
  "catalog/fetchCatalogProducts",
  async () => {
    const response = await getCatalogProducts();
    return response;
  }
);

const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    products: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCatalogProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchCatalogProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default catalogSlice.reducer;
