// Redux Tool kit.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { useSelector } from "react-redux";

// Toastify:-notification
import { toast } from "react-toastify";

// action and selector from authReducer component.
import { authSelector, deserializeUser } from "./authReducer";

// component from firebase/firestore.
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

// export firebaseInit.
import { db } from "../../firebaseInit";


// InitialState.
const initialState = {
    carts : []
}

// Add to cart.
export const addToCart = createAsyncThunk(
    "carts/addToCart",
    async({products,carts,id,user},thunkAPI) => {
        const newItem = products.find((item) => item.id === id);
        const alreadyInCart = carts.find((item) => item.id === id);
        if (!alreadyInCart) {

            thunkAPI.dispatch(newAddToCart(newItem));
            toast.success(`1x item added`)

        }else {

            thunkAPI.dispatch(increaseItem(id));
            toast.success(`${alreadyInCart.count + 1}x item added`);
        }
        await updateCartInDatabase(thunkAPI.getState().cartReducer.carts,user);
    }
);

// Increase item count to cart.

export const increaseItemToCart = createAsyncThunk(
    "carts/increaseItem",
    async ({id,user},thunkAPI) => {

        thunkAPI.dispatch(increaseItem(id));
        console.log(user);
        await updateCartInDatabase(thunkAPI.getState().cartReducer.carts,user);

    }
);

// decrease item count to cart.
export const decreaseItemToCart = createAsyncThunk(
    "carts/decreaseItem",
    async ({id,user},thunkAPI) => {

        thunkAPI.dispatch(decreaseItem(id));
        await updateCartInDatabase(thunkAPI.getState().cartReducer.carts,user);

    }
);

// Delete item from cart.
export const deleteItemFromCart = createAsyncThunk(
    "orders/deleteItem",
    async ({id,user},thunkAPI) => {

        thunkAPI.dispatch(deleteItem(id));
        await updateCartInDatabase(thunkAPI.getState().cartReducer.carts,user);

    }
);

// update item to database also.
export const updateCartInDatabaseThunk = createAsyncThunk(
    "carts/updateCartInDatabase",
    async (_,thunkAPI) => {

        const { currentUser } = useSelector(authSelector);
        const updatedCarts = thunkAPI.getState().cartReducer.carts;
        await updateCartInDatabase(updatedCarts,currentUser);

    }
);

// Setting for database to update function.
async function updateCartInDatabase(updatedCarts,currentUser) {
    const User = deserializeUser(currentUser);
    console.log(User.user.uid);
    const users = collection(db,"users");
    const querySnapshot = await getDocs(users);

    querySnapshot.forEach(async (users) => {
        const userId = User.user.uid;
        const userRef = doc(db,"users",userId);

        await updateDoc(userRef, {
            carts : updatedCarts,
        });
    });

};

// Reducer.
const cartSlice = createSlice({
    name : "carts",
    initialState,
    reducers : {
        setCart : (state,action) => {
            state.carts = action.payload;
        },
        newAddToCart : (state,action) => {
            const item = action.payload
            const newItem = {...item, count: 1 };
            state.carts.push(newItem);
        },
        increaseItem : (state,action) => {

            const id = action.payload;
            const IncreaseCountInCart = state.carts.find((item) => item.id === id);

            if(IncreaseCountInCart) {
                IncreaseCountInCart.count += 1;
            }
        },

        decreaseItem : (state,action) => {

            const id = action.payload
            const DeccreaseCountInCart = state.carts.find((item) => item.id === id);

            if (DeccreaseCountInCart) {

                DeccreaseCountInCart.count -= 1;

                if (DeccreaseCountInCart.count === 0) {

                    state.carts.splice(DeccreaseCountInCart);

                }
            }

        },

        deleteItem : (state,action) => {
            const id = action.payload;
            const items = state.cart.filter((i) => i.id !== id);
            state.carts = items;
        }
    }
});


// Export reducer.
export const cartReducer = cartSlice.reducer;

// Export action.
export const { newAddToCart,increaseItem,decreaseItem,deleteItem,setCart } = cartSlice.actions;

// Export selector.
export const cartSelector = (state) => state.cartReducer;

