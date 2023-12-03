import authSlice from "../modules/authSlice";
import letter from "../modules/letterSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { letterReducer: letter, authSlice: authSlice },
});

export default store;
