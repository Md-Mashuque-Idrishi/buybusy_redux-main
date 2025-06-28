// ReduxToolkit.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// toastify:- Notification
import { toast } from "react-toastify";


// Initial State
const initialState = {
    products : [],
    isLoading : false,
    error : false,
    filteredProducts : [],
    searchQuery : "",
    pricefilter : 1000,
    selectedCategories : []
};

// export products using asyncThunk API.
export const getItems = createAsyncThunk(
    "products/getItems",
    async(_,thunkAPI) => {
        try {

            const response = await fetch(
                "https://fakestoreapi.com/products"
            );
            if(!response.ok) {
                throw new Error("Failed to fetch products.");
            }
            const data = await response.json();
            thunkAPI.dispatch(fetchSuccess(data));

        } catch (error) {

            thunkAPI.dispatch(fetchError());
            toast.error("Product fetch error . please check your API");

        }
    }
)

// ProductReducer
const productSlice = createSlice({
    name : "products",
    initialState,
    reducers : {
        fetchStart : (state,action) => {
            state.isLoading = true;
        },
        fetchSuccess : (state,action) => {
            state.products = action.payload;
            state.isLoading = false;
        },
        fetchError : (state,action) => {
            state.error = true;
            state.isLoading = false;
        },
        setProducts : (state,action) => {
            state.products = action.payload;
        },
        setSearchQuery : (state,action) => {
            state.searchQuery = action.payload;
        },
        setPricefilter : (state,action) => {
            state.pricefilter = action.payload;
        },
        setSelectedCategories : (state,action) => {
            state.selectedCategories = action.payload;
        },
        setFilteredProducts : (state,action) => {
            state.filteredProducts = state.products.filter((product) => {
                // Filter product.
                const matchSearch = product.title.toLowerCase().includes(state.searchQuery.toLowerCase());
                const matchPrice = product.price <= state.pricefilter;

                const matchCategory = state.selectedCategories.length === 0 || state.selectedCategories.some((category) => product.category.toLowerCase()=== category.toLowerCase());
                return matchCategory && matchSearch && matchPrice;
            })
        }
    }

});

// export reducer.
export const productReducer = productSlice.reducer;

// export actions.
export const {
    fetchStart,
    fetchSuccess,
    fetchError,
    setSearchQuery,
    setPricefilter,
    setSelectedCategories,
    setFilteredProducts

} = productSlice.actions;

// export selector.
export const productSelector = (state) => state.productReducer;
