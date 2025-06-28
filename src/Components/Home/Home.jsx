// REACT-REDUX TOOLKIT
import { useDispatch, useSelector } from "react-redux";
// CSS
import styles from "./Home.module.css";


// GETTING ALL ACTION AND STATE FROM PRODUCT REDUCER.
import { 

    fetchStart, getItems, productSelector, setFilteredProducts, 
    setPricefilter, setSearchQuery, setSelectedCategories 
    
} from "../../Redux/Reducers/productReducer";

// GETTING ACTION AND SELECTOR FROM AUTH REDUCER.
import { authSelector, deserializeUser } from "../../Redux/Reducers/authReducer";

// GETTING ACTION AND SELECTOR FROM CART REDUCER.
import { addToCart, cartSelector } from "../../Redux/Reducers/cartReducer";

// GETTING HOOKS
import { useEffect } from "react";

// LOADER
import Loader from "../Loader/Loader";

// GETTING REACT-ROUTER COMPONENTS.
import { NavLink } from "react-router-dom";


const Home = () => {

    // Initialise dispatch to use in action.
    const dispatch = useDispatch();

    // Getting all state from selector.
    const { products,isLoading,filteredProducts,pricefilter,selectedCategories } = useSelector(productSelector);

    // Setting for user.
    const { currentUser } = useSelector(authSelector);
    const User = deserializeUser(currentUser)

    // Getting state from selector.
    const { carts } = useSelector(cartSelector);

    // Using fakestore API to render fake items in page.
    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchStart());
            await dispatch(getItems());
            dispatch(setFilteredProducts());
        }
        fetchData();
    },[dispatch]);

    // Setting Loader
    if (isLoading) {
        return (
            <Loader />
        )
    }

    // Function for view items according to price.
    const handlePriceFilter = (e) => {
        const priceValue = Number(e.target.value);
        dispatch(setPricefilter(priceValue));
        dispatch(setFilteredProducts()); 
    }

    // Function for view items according to category of items.
    const handleCategoryFilter = (e) => {
        const category = e.target.value;
        const updatedCategories = selectedCategories.includes(category) 
            ? selectedCategories.filter((c) => c !== category) 
            : [...selectedCategories,category];
        dispatch(setSelectedCategories(updatedCategories));
        dispatch(setFilteredProducts());
    }

    // Set selected category.
    const isCategorySelected = (category) => {
        return selectedCategories.includes(category);
    };

    // Function for view items according to search query.
    const handleSearchQuery = (e) => {
        dispatch(setSearchQuery(e.target.value));
        dispatch(setFilteredProducts());
    }

    return (
        <>
            <div className={styles.container}>

                <aside className={styles.filterContainer}>

                    <h2> Filter </h2>

                    <form>

                        <label htmlFor="price" className={styles.price1}>
                            Price: {pricefilter}
                        </label>

                        <input type="range" name="price" min="1" max="1000" step="20" 
                            value={pricefilter} className={styles.price1} 
                            onChange={handlePriceFilter} 
                        />

                        <h2> Category </h2>

                        {/* Men */}
                        <div className={styles.category}>

                            <input type="checkbox" id="mensFashion" value="Men's Clothing" 
                                onChange={handleCategoryFilter} checked={isCategorySelected("Men's Clothing")} 
                            />

                            <label htmlFor="mensFashion"> Men's Clothing </label>

                        </div>

                        {/* Women */}
                        <div className={styles.category}>

                            <input type="checkbox" id="womensFashion" value="Women's Clothing" 
                                onChange={handleCategoryFilter} checked={isCategorySelected("Women's Clothing")} 
                            />
                            
                            <label htmlFor="womensFashion"> Women's Clothing </label>

                        </div>

                        {/* Jewellery */}
                        <div className={styles.category}>

                            <input type="checkbox" id="jewellery" value="jewellery" 
                                onChange={handleCategoryFilter} checked={isCategorySelected("jewellery")} 
                            />
                            
                            <label htmlFor="jewellery"> jewellery </label>

                        </div>

                        {/* Electronic */}
                        <div className={styles.category}>

                            <input type="checkbox" id="electronics" value="Electronics" 
                                onChange={handleCategoryFilter} checked={isCategorySelected("Electronics")} 
                            />
                            
                            <label htmlFor="electronics"> Electronics </label>

                        </div>

                    </form>

                </aside>

                {/* Search Form */}
                <form className={styles.searchContainer}>

                    <input type="search" placeholder="search your item here..." onChange={handleSearchQuery} />

                </form>

                <div className={styles.productContainerGrid}>

                    {filteredProducts.map((item) => (

                        <div className={styles.productContainer} key={item.id}>

                            <div className={styles.productImageContainer}>
                                <img src={item.image} alt="bag" />
                            </div>

                            <div className={styles.productDetailContainer}>

                                <div className={styles.name}>
                                    <p> {item.title}</p>
                                </div>

                                <div className={styles.price}>
                                    <p>
                                        &#x20B9; {item.price}
                                    </p>
                                </div>

                                {User ? 
                                    <button onClick={() => dispatch(addToCart({products,carts,id:item.id,user:currentUser}))} 
                                        className={styles.btn}>   
                                            Add To Cart
                                    </button>
                                    :
                                    <NavLink to="/login" className={styles.btn}> Add To Cart </NavLink>
                                }

                            </div>
                            
                        </div>
                        
                    ))}
                </div>
            </div>
        </>
    )

    
};

export default Home;