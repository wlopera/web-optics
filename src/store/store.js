import { configureStore } from "@reduxjs/toolkit";
import salesReducer from "./salesSlice";
import catalogReducer from "./catalogSlide";

export const store = configureStore({
  reducer: {
    sales: salesReducer,
    catalog: catalogReducer,
  },
});
