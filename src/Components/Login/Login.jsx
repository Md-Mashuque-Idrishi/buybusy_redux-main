
// GETTING ROUTE COMONENT
import { NavLink, useNavigate } from "react-router-dom";

// EXPORT CSS
import styles from "./Login.module.css";

// FIREBASE/AUTH
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

// firebaseInit COMPONENT
import { auth, db } from "../../firebaseInit";

// authReducer COMPONENT
import { setCurrentUser } from "../../Redux/Reducers/authReducer";

// CART REDUCER:-
import { setCart } from "../../Redux/Reducers/cartReducer";

// OREDER REDUCER:-
import { setOrders } from "../../Redux/Reducers/orderReducer";

// GETTIN TOAST:-NOTIFICATION
import { toast } from "react-toastify";

// GETTING ERROE ACTION FROM productReducer COMPONENT
import { fetchError } from "../../Redux/Reducers/productReducer";

// REACT-REDUX COMPONENT:-
import { useDispatch } from "react-redux";






const Login = () => {

    // Initialise navigate to use in action.
    const navigate = useNavigate();

    //initialise dispatch to use in actions
    const dispatch = useDispatch();
    
    // Handle submit login with email and password.
    const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
        // 1. Sign in user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        dispatch(setCurrentUser(userCredential.user));

        // 2. Fetch Firestore user data
        const users = collection(db, "users");
        const querySnapshot = await getDocs(users);
        const userId = userCredential.user.uid;

        // 3. Find current user doc
        const currentUserDoc = querySnapshot.docs.find((doc) => doc.id === userId);

        if (currentUserDoc) {
            const userData = currentUserDoc.data();
            dispatch(setCart(userData.carts || []));
            dispatch(setOrders(userData.orders || []));
        }
            // Navigate to homePage.
            navigate("/");
            toast.success("Logged In Successfully");

        } catch (error) {
            // Error 
            dispatch(fetchError(true));
            toast.error("Please enter valid Email/Password");
            
        }
    }

    return (
        <>
            <div className={styles.container}>

                <h2> Login </h2>

                <form onSubmit={handleSubmit} className={styles.form}>

                    <div className={styles.inputContainer}>

                        <label htmlFor="email"> Email </label>
                        <input type="email" placeholder="Enter your email..." id="email" />

                    </div>

                    <div className={styles.inputContainer}>

                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter your password..." id="password" />

                    </div>

                    <button type="submit" className={styles.button}> Login </button>

                    <br />

                    <span className={styles.text}>
                        New User ? <NavLink to="/signup" className={styles.link}> Sign Up
                        </NavLink>
                    </span>                   

                </form>
            </div>
        </>
    )
}

export default Login;