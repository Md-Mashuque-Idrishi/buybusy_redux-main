

// ROUTES.
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';

// COSTOM CONTEXT.
import { UserContextProvider } from './userContext';


// PAGES.
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import Order from './Components/Order/Order';

// PROVIDER FROM AUTH CONTEXT PROVIDER.
import { AuthContestProvider } from './Redux/Provider/authContestProvider';

// PROVIDER FROM REDUX.
import { Provider } from 'react-redux';

// STORE.
import { store } from './Redux/Store';


function App() {
  
  // ROUTES.
  const router = createBrowserRouter([
    { 
      path : "/",
      element : ( 
        <UserContextProvider>
          <Navbar />
          <Home />
        </UserContextProvider>
      )
    },

    { 
      path : "/login",
      element : ( 
        <UserContextProvider>
          <Navbar />
          <Login />
        </UserContextProvider>
      )
    },

    { 
      path : "/signup",
      element : ( 
        <UserContextProvider>
          <Navbar />
          <SignUp />
        </UserContextProvider>
      )
    },

    { 
      path : "/cart",
      element : (
        <AuthContestProvider>
          <UserContextProvider>
            <Navbar />
            <Cart />
          </UserContextProvider>
        </AuthContestProvider>
      )
    },

    { 
      path : "/orders",
      element : (
        <AuthContestProvider>

          <UserContextProvider>
            <Navbar />
            <Order />
          </UserContextProvider>

        </AuthContestProvider>
      )
    },


  ])
  return (
    <Provider store={store}>

      <RouterProvider router={router} />

    </Provider>
  );
}

export default App;
