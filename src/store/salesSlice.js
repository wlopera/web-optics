import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderAll } from "../service/OrderService";

// thunk para cargar todas las órdenes (ventas)
export const fetchSales = createAsyncThunk("sales/fetchAll", async () => {
  const response = await getOrderAll();
  return response;
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    addSales: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addSales } = salesSlice.actions;
export default salesSlice.reducer;
