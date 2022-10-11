import { configureStore } from "@reduxjs/toolkit";
import controlSlice from "./control/controlSlice";

export const store = configureStore({
  reducer: {
    control: controlSlice,
  },
});
