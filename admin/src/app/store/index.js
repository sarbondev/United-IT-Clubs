import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./Slicer";
import UserSlicer from "./UserSlicer";

export const store = configureStore({
  reducer: {
    mainSlice: MainSlice,
    user: UserSlicer,
  },
});
