import { configureStore } from "@reduxjs/toolkit";

// Getting all Reducer.
import { authReducer } from "./Reducers/authReducer";
import { productReducer } from "./Reducers/productReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { orderReducer } from "./Reducers/orderReducer";


export const store = configureStore({
    reducer:{
        authReducer,
        productReducer,
        cartReducer,
        orderReducer
    }
})
