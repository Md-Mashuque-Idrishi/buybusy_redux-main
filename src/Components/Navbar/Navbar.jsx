// Export Image:-logo
import logoImg from "./Icons/logo.png";

// export icon
import homeImg from "./Icons/home.png";
import cartImg from "./Icons/cart.png";
import myorderImg from "./Icons/myorder.png"
import logoutImg from "./Icons/logout.png";
import signinImg from "./Icons/signin.png";


// getting react-redux components.
import { useDispatch, useSelector } from "react-redux";

//styles in css
import styles from "./Navbar.module.css";

// action and selector from authReducer.
import { authSelector, deserializeUser, setCurrentUser } from "../../Redux/Reducers/authReducer";

// firebase component use.
import { auth } from "../../firebaseInit";

// getting action from firebase/auth
import { signOut } from "firebase/auth";

// error action from productReducer.
import { fetchError } from "../../Redux/Reducers/productReducer";

// navlink (route the page).
import { NavLink } from "react-router-dom";


const Navbar = () => {

  // Setting for user.
  const { currentUser } = useSelector(authSelector);
  const User = deserializeUser(currentUser);

  // Initial dispatch to use in actions.
  const dispatch = useDispatch();

  // Handle logout function.
  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(setCurrentUser(null));

    } catch {
      dispatch(fetchError(true));
    }
  }
  return (
    <>
      <nav className={styles.nav}>

        <NavLink to="/" className={styles.logo}>
            <img src={logoImg} alt="logo" />
            <h4> BuyBusy </h4>
        </NavLink>

        <div className={styles.buttons}>
          {User ? (
            <>
                <NavLink to="/" className={styles.btn}>
                    <span> <img src={homeImg} alt="home" className={styles.img} /> </span>
                    <span className={styles.text}> Home </span>
                </NavLink>

                <NavLink to="/orders" className={styles.btn}>
                    <span> <img src={myorderImg} alt="myorder" className={styles.img} /> </span>
                    <span className={styles.text}> My Orders </span>
                </NavLink>

                <NavLink to="/cart" className={styles.btn}>
                    <span> <img src={cartImg} alt="cart" className={styles.img} /> </span>
                    <span className={styles.text}> Cart </span>
                </NavLink>

                <NavLink onClick={logout} to="/" className={styles.btn}>
                    <span> <img src={logoutImg} alt="logout" className={styles.img} /> </span>
                    <span className={styles.text}> Logout </span>
                </NavLink>
            </>
          ):(
            <>
                <NavLink to="/" className={styles.btn}>
                    <span> <img src={homeImg} alt="home" className={styles.img} /> </span>
                    <span className={styles.text}> Home </span>
                </NavLink>

                <NavLink to="/login" className={styles.btn}>
                    <span> <img src={signinImg} alt="login" className={styles.img} /> </span>
                    <span className={styles.text}> Login </span>
                </NavLink>
            </>

          )}

        </div>

      </nav>

    </>
  )
};

export default Navbar
