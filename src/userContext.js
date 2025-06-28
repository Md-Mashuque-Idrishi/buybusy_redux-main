
// Import hook and context
import { createContext, useContext } from "react";


// Create context.
const userContext = createContext();

// Use custom hook.
export const useUserContext = () => {
    const value = useContext(userContext);
    return value;
}

// Use custom context.
export const UserContextProvider = ({children}) => {
    const contextValue = {
        user : null
    }
    return (
        <userContext.Provider value={{contextValue}}>
            {children}
        </userContext.Provider>
    )
}