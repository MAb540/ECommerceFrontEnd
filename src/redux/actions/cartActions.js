import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "./cartConstant";

import axios from "axios";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${productId}`);
  const product = {
    name: data.product.name,
    price: data.product.price,
    countInStock: data.product.countInStock,
    image: data.product.image,
    product: data.product._id,
    qty,
  };

  dispatch({
    type: CART_ADD_ITEM,
    payload: product,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};

//  _id: '1',
//             name: 'Nike Slim Shirt',
//             category: 'Shirts',
//             image: '/images/p1.jpg',
//             price: 120,
//             countInStock: 10,
//             brand: 'Nike',
//             rating: 3.5,
//             numReviews: 10,
//             description: 'high quality product'
