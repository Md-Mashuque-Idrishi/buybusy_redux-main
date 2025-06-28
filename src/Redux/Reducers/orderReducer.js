
// Redux tool kit.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// component from firebase/firestore/lite
import { collection, getDocs } from "firebase/firestore/lite";
import { doc, updateDoc } from "firebase/firestore";

// FIREBASE FILE
import { db } from "../../firebaseInit";

// toast:- notification.
import { toast } from "react-toastify";

// cartReducer
import { setCart } from "./cartReducer";

// initialState
const initialState = {
    orders : []
}

// purchase.
export const purchase = createAsyncThunk(
    "orders/purchase",
    async ({ carts,orders },thunkApi) => {

        // Setting date for order.
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const date = currentDate.getDate();

        const orderDate = `${date.toString()}/${month.toString()}/${year.toString()}`;

        // Order in object.
        const newOrder = {date : orderDate, order : carts };

        // Set order in order array.
        thunkApi.dispatch(checkOut(newOrder));
        toast.success("Item Purchaseed");

        // Set update order to database also.
        const updatedOrders = [...orders, newOrder];
        const users = collection(db, "users");
        const querySnapshot = await getDocs(users);

        querySnapshot.forEach(async (user) => {
            const userId = user.id;
            const useRef = doc(db, "users" , userId);
            await updateDoc(useRef, {
                orders : updatedOrders,
                carts : []
            });
        })
        // set cart empty after order purchased
        thunkApi.dispatch(setCart([]));

    } 
)

// Reducer
const orderSlice = createSlice({
    name : "orders",
    initialState,
    reducers : {

        setOrders : (state,action) => {
            state.orders = action.payload
        },
        checkOut : (state,action) => {
            state.orders.push(action.payload);
        }

    }
});

// Export reducer.
export const orderReducer = orderSlice.reducer;

// Export  action.
export const { checkOut,setOrders } = orderSlice.actions;

// Export  selector.
export const orderSelector = (state) => state.orderReducer;