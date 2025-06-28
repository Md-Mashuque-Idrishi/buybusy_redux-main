
// GETTING REDUX COMPONENTS TO DO ALL ACTIONS/SELECTOR.
import { useDispatch, useSelector } from "react-redux"

// GETTING ACTION AND SELECTOR FROM AUTH REDUCER.
import { authSelector, setCurrentUser } from "../Reducers/authReducer"

// GETTING REACT-COMPONENTS/HOOKS.
import { createContext, useEffect } from "react";

// GETTING ACTION FROM FIREBASE/AUTH.
import { onAuthStateChanged } from "firebase/auth";

// GETTING FIREBASE COMPONENTS.
import { auth } from "../../firebaseInit";



// Making of auth context.
export const AuthContext = createContext();

export const AuthContestProvider = ({children}) => {

    // setting for user.
    const { currentUser } = useSelector(authSelector)
    const dispatch = useDispatch();

    // Authentication.
    useEffect(() => {

        const unsub = onAuthStateChanged(auth,(user) => {
            dispatch(setCurrentUser(user));
        })
        return () => {
            unsub()
        }
    },[dispatch]);

  return (
    <AuthContext.Provider value={{currentUser}}> 

      {children}

    </AuthContext.Provider>
  )
};


