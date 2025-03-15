import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import quoteReducer from "./quoteSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        quotes: quoteReducer,
    },
});
