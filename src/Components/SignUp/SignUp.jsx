// DISPATCH FROM REDUX TO ACTIONS
import { useDispatch } from "react-redux";

// EXPORT CSS
import styles from "./SignUp.module.css";

// NAVLINK TO ROUTE THE PAGE.
import { NavLink, useNavigate } from "react-router-dom";
import { setCart } from "../../Redux/Reducers/cartReducer";
import { setOrders } from "../../Redux/Reducers/orderReducer";

//GETTING :- AUTH COMPONENT.
import { createUserWithEmailAndPassword } from "firebase/auth";

// FIREBASE COMPONENT
import { auth, db } from "../../firebaseInit";


// GETTING ACTION FROM AUTH REDUCER.
import { setCurrentUser } from "../../Redux/Reducers/authReducer";

// TOAST:-NOTIFICATION
import { toast } from "react-toastify";

//ERROR ACTION FROM PRODUCT REDUCER.
import { fetchError } from "../../Redux/Reducers/productReducer";

import { doc,setDoc } from "firebase/firestore";


const SignUp = () => {
    //initialise dispatch to use in actions
    const dispatch = useDispatch();

    //initialise navigate to use in navigations
    const navigate = useNavigate();

    // signup settings function
    const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Save to Firestore (DO NOT store password)
        await setDoc(doc(db, "users", userCredential.user.uid), {
            displayName,
            email,
            carts: [],
            orders: []
        });

        // Redux updates
        dispatch(setCurrentUser(userCredential.user));
        dispatch(setCart([]));
        dispatch(setOrders([]));

        navigate("/");
        toast.success("User Created Successfully");
    } catch (error) {
        console.error("Signup error:", error.code, error.message);
        dispatch(fetchError(true));
        toast.error("Signup Failed: " + error.message);
    }
};

    
    return (
        <div className={styles.container}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputContainer}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name here..."
                        id="name"
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email here..."
                        id="email"
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password here..."
                        id="password"
                    />
                </div>
                <button type="submit" className={styles.button}>Sign Up</button>
                <br />
                <span className={styles.text}>Already User? <NavLink to='/login' className={styles.link}>Login</NavLink></span>
            </form>
        </div>
    )
}

export default SignUp;