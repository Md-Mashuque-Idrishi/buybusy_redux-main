import { createSlice } from "@reduxjs/toolkit";

// Serialize string to JSON.
const serializeUser = (user) => {
    return JSON.stringify(user);
}

// Deserialize json to firebase user.
// export const deserializeUser = (json) => {
//     return json.parse(json);
// }

export const deserializeUser = (json) => {
    try {
        return JSON.parse(json); 
    } catch (error) {
        console.error("Failed to deserialize user:", error);
        return null; // Return null if parsing fails
    }
}

// Reducer.
const authSlice = createSlice({
    name:"auth",
    initialState: {currentUser:null},
    reducers: {
        setCurrentUser : (state,action) => {
            state.currentUser = serializeUser(action.payload);
        }
    }
});

// export reducer.
export const authReducer = authSlice.reducer;

// export action.
export const { setCurrentUser } = authSlice.actions;

// export selector.
export const authSelector = (state) => state.authReducer; 