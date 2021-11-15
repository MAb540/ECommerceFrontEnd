import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../redux/actions/cartActions";
import CheckoutSteps from "./CheckoutSteps";

function ShippingAddressScreen(props) {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  if(!userInfo){
      props.history.push('/signin');
  }
 
  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;
//   const {fullName,address,postalCode,city,country} = shippingAddress;

  const [fullName, setFullName] = React.useState(shippingAddress.fullName);
  const [address, setAddress] = React.useState(shippingAddress.address);
  const [postalCode, setPostalCode] = React.useState(shippingAddress.postalCode);
  const [city, setCity] = React.useState(shippingAddress.city);
  const [country, setCountry] = React.useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
        saveShippingAddress({ fullName, address, postalCode, city, country })
    );
    props.history.push('/payment');
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>

      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">PostalCode</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="Country">Country</label>
          <input
            type="text"
            id="Country"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <label />
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddressScreen;
