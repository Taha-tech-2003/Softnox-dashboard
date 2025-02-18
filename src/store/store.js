import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/ProductSlice";
import customerReducer from "./slices/CustomerSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        customers: customerReducer
    },
});

export default store;