import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./Component/HomeScreen";
import CartScreen from "./Component/ProductComponents/CartScreen";
import ProductScreen from "./Component/ProductComponents/ProductScreen";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./Component/UserComponents/SigninScreen";

import { signout } from "./redux/actions/userActions";
import RegisterScreen from "./Component/UserComponents/RegisterScreen";
import ShippingAddressScreen from "./Component/ShippingComponents/ShippingAddressScreen";
import PaymentMethodScreen from "./Component/ShippingComponents/PaymentMethodScreen";
import PlaceOrderScreen from "./Component/ShippingComponents/PlaceOrderScreen";
import OrderScreen from "./Component/ShippingComponents/OrderScreen copy";
import OrderHistoryScreen from "./Component/ShippingComponents/OrderHistoryScreen";
import ProfileScreen from "./Component/UserComponents/ProfileScreen";
import PrivateRoute from "./Component/PrivateRoute";
//import T1 from "./Component/Test/t1";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazona
            </Link>
          </div>
          <div>
            <Link to="/cart/">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orderhistory">OrderHistory</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="#" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="/admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} />
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;
